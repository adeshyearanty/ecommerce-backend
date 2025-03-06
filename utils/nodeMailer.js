import nodemailer from "nodemailer";
import { BadRequestException } from "./errorCodes.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adeshyearantycodes@gmail.com",
    pass: "vgjwusekfxogvilx", // Replace with the generated App Password
  },
});

export function sendAMail(body, _params, _req, res) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const { email } = body;
  const mailData = {
    from: "adeshyearantycodes@gmail.com",
    to: email,
    subject: "E-commerce Backend, OTP for changing password",
    text: "That was easy!",
    html: `<b>Hey there! </b><br> Here is your ${otp} to change your password<br/>`,
  };
  res.cookie("userOTP", otp, { maxAge: 900000, httpOnly: true });
  transporter.sendMail(mailData, function (err, info) {
    if (err)
      throw new BadRequestException("Please check the recipient's email");
    else return info;
  });
}
