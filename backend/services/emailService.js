const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'})

console.log("EMAIL:", process.env.EMAIL);
console.log("PASS:", process.env.PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

async function sendEmail(to, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: 'Your OTP',
    text: `Your OTP is ${otp}`
  });
}
module.exports = sendEmail;