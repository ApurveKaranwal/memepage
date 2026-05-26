const express = require('express');
const otpQueue = require('../queue/otpQueue');
const { prisma } = require("../config/db") 
const Redis = require("ioredis");
const crypto = require('crypto');

const redis = new Redis()
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
  const rawData = await redis.get(`signup:${email}`);

  if (!rawData) {
    return res.status(400).json({
      msg: "Signup session Expired"
    });
  }
  const data = JSON.parse(rawData);

  if (!storedOtp) {
    return res.status(400).json({
      msg: "OTP Expired"
    });
  }
  

  if (storedOtp !== String(otp)) {
    return res.status(400).json({
      msg: "Invalid OTP"
    });
  }
  
    try {
      await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password
        }
      });
    }
    
    catch (err) {
      console.error("Could not load data into PostgreSQL", err);
      return res.status(500).json({
        msg: "PostgreSQL Error"
      });
    }
  
  await redis.del(`otp:${email}`);
  await redis.del(`signup:${email}`);

  res.json({
    msg: "Signup Successful"
  });
});

module.exports = router;