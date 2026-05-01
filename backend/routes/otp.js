const express = require('express');
const otpQueue = require('../queue/otpQueue');
const Redis = require('ioredis');
const crypto = require('crypto');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379
});

const router = express.Router()

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      msg: "Email required"
    });
  }
  
  const otp = crypto.randomInt(100000, 999999);
  await redis.set(`otp:${email}`, otp, 'EX', 90);
  
  await otpQueue.add(
    'send-otp',
    { email, otp },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  );
  
  res.json({
    msg: "OTP Sent"
  });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      msg: "Email and OTP required"
    });
  }
  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp) {
    return res.status(400).json({
      msg: "OTP Expired"
    });
  }

  if (storedOtp !== String(otp)) {
    return res.json({
      msg: "Invalid OTP"
    });
  }

  await redis.del(`otp:${email}`);

  res.json({
    msg: "Login Successful"
  });
});

module.exports = router;