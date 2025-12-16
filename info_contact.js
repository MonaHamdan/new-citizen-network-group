const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EMAIL SETTINGS
const transporter = nodemailer.createTransport({
service: "gmail", // or "outlook", "yahoo", "hotmail"
auth: {
user: "monasd817@gmail.com",
pass: "ecmp rgkn tuqh zswz"   // NOT your normal password
}
});

// ROUTE → SEND EMAIL
app.post("/send", async (req, res) => {
const { from_name, reply_to, message } = req.body;

const mailOptions = {
from: reply_to,
to: "monasd817@gmail.com",
subject: "New Citizen Network Group",
html: `
    <h3>New Contact Message</h3>
    <p><strong>Name:</strong> ${from_name}</p>
    <p><strong>Email:</strong> ${reply_to}</p>
    <p><strong>Message:</strong><br>${message}</p>
`
};

try {
await transporter.sendMail(mailOptions);
res.json({ success: true });
} catch (err) {
res.json({ success: false, error: err });
}
});

// START SERVER
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
