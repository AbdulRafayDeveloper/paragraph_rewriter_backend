import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

// const verifyTransporter = async () => {
//   try {
//     await new Promise((resolve, reject) => {
//       transporter.verify((error, success) => {
//         if (error) {
//           console.error('Error verifying transporter:', error);
//           reject(error);
//         } else {
//           console.log('Transporter is ready:', success);
//           resolve(success);
//         }
//       });
//     });
//   } catch (error) {
//     throw new Error('Transporter verification failed.');
//   }
// };

const sendEmail = async (to, subject, html) => {
  if (!to) {
    throw new Error('No recipients defined.');
  }

  // await verifyTransporter();

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    html,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          reject(error);
        } else {
          console.log('Email sent:', info.response);
          resolve(info.response);
        }
      });
    });
  } catch (error) {
    throw new Error('Failed to send email.');
  }
};

export default sendEmail;
