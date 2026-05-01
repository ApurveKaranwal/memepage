//producer
const { Queue } = require('bullmq');
const otpQueue = new Queue(
  'otp-queue', {
  connection: {
    host: '127.0.0.1',
    port: 6379
  }
});

module.exports = otpQueue;