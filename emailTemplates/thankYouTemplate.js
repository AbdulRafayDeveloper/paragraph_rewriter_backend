const generateThankYouTemplate = (name) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        .email-body {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
        }
        .email-footer {
          font-size: 14px;
          text-align: center;
          color: #999;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">Thank You for Contacting Us</div>
        <div class="email-body">
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.</p>
          <p>We appreciate your patience.</p>
          <p>Best Regards,</p>
          <p>The Support Team</p>
        </div>
        <div class="email-footer">
          <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

export default generateThankYouTemplate;
