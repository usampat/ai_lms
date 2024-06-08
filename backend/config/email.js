const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_EMAIL,
      pass: process.env.ETHEREAL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: "Developer",
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log("Message Send: ", info.messageId);
  console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
});

module.exports = sendEmail;
