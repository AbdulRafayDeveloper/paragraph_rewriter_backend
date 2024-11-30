const generateThankYouTemplate = (name) => `
  <!DOCTYPE html>
  <html>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; color: #555;">
      <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Header -->
        <div style="background-color: #333; color: #fff; text-align: center; padding: 15px; font-size: 20px; font-weight: bold;">
          Thank You for Contacting Us
        </div>
        <!-- Body -->
        <div style="padding: 20px; background-color: #e5e0ff; font-size: 16px; line-height: 1.6; border-radius: 0 0 5px 5px;">
          <p style="margin: 0 0 15px;">Hi ${name},</p>
          <p style="margin: 0 0 15px;">Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.</p>
          <p style="margin: 0 0 15px;">We appreciate your patience.</p>
          <p style="margin: 0;">Best Regards,</p>
          <p style="margin: 0;">The Support Team</p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 14px; color: #999;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

export default generateThankYouTemplate;
