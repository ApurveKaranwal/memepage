// app.js
const express = require('express');
const otpQueue = require('./queue/otpQueue');
const redis = require('./redis');
const crypto = require('crypto');

const app = express();
app.use(express.json());


// SEND OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999);

  // store OTP in Redis (90 sec)
  await redis.set(`otp:${email}`, otp, 'EX', 90);

  // add job to queue
  await otpQueue.add('send-otp', { email, otp });

  res.json({ message: 'OTP sent' });
});


// VERIFY OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp) {
    return res.json({ message: 'OTP expired' });
  }

  if (storedOtp !== otp) {
    return res.json({ message: 'Invalid OTP' });
  }

  await redis.del(`otp:${email}`);

  res.json({ message: 'Login successful' });
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});