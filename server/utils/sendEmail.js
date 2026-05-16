const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Using Ethereal Email for testing purposes (it intercepts emails so we don't spam real inboxes)
  // In production, you would use SendGrid, Mailgun, or standard SMTP credentials
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "reggie.kautzer60@ethereal.email", // Example ethereal account
      pass: "8eA5xZbV4R2xYb3XkM",
    },
  });

  const message = {
    from: "noreply@travelplans.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
