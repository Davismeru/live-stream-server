const nodemailer = require("nodemailer");
const emailsModel = require("../models/emails_model");
const emailsController = async (req, res) => {
  const { email } = req.body;

  // Configure the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Function to send an email
  const sendEmail = async (to, subject, text) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    res.json({ error: "Invalid email format." });
  } else {
    const confirmEmail = await emailsModel.findOne({ email: email });
    if (confirmEmail) {
      res.json({ error: "Email already registered" });
    } else {
      await emailsModel.create({ email });

      //   send an email to the user after adding the email to the db
      sendEmail(
        email,
        "Subscription to ballhub newsletter",
        "Welcome to ballHub, you gonna love this"
      )
        .then(() => {
          res.send("you have subscribed");
        })
        .catch((err) => {
          res.send("error sending email");
        });
    }
  }
};

module.exports = {
  emailsController,
};
