import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = async (token, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const clientURL =
      process.env.NODE_ENV === "production"
        ? "https://mern-ecommerce-pooja.vercel.app"
        : "http://localhost:5173";

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Verify your email:
${clientURL}/verify/${token}`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("Email Sent Successfully");
    console.log(info);
  } catch (error) {
    console.log("MAIL ERROR:", error);
  }
};
