// // utils/sendEmail.js
// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   // Create a transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   // Define email options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   // Send email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

// utils/sendEmail.js
// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  console.log('Sending email to:', options.email);

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;