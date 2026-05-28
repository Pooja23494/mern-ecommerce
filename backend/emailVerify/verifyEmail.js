import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // frontend url
    const clientURL =
      process.env.NODE_ENV === "production"
        ? "https://mern-ecommerce-pooja.vercel.app"
        : "http://localhost:5173";

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Hi! There, You have recently visited our website and entered your email.
      Please click the link below to verify your email:
      ${clientURL}/verify/${token} Thanks`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("Email Sent Successfully");
    console.log(info);
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};
