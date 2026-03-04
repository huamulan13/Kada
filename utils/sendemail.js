import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "kmediario13@gmail.com",
        pass: "pagp fkda qfxu nxhj",
      },
    });

    await transporter.sendMail({
      from: "Lenkada App <kmediario13@gmail.com>",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email berhasil dikirim ke:", email);
  } catch (error) {
    console.log("Email gagal dikirim:", error);
  }
};

export default sendEmail;