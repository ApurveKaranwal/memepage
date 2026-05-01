const { Worker } = require('bullmq');
const sendEmail = require('../services/emailService')
const worker = new Worker(
  'otp-queue',
  async job => {
    try {
      
      if (job.name === 'send-otp') {
        const { email, otp } = job.data;
      
        console.log(`Sending OTP ${otp} to ${email}`);
      
        await sendEmail(email, otp);
      
        console.log("Email sent successfully");
      }
    }
    catch (err) {
      console.error("Worker error:", err);
      throw err;
    }
  },
  {
    connection: {
      host: '127.0.0.1',
      port: 6379
    }
  }
);

console.log("Worker started...");