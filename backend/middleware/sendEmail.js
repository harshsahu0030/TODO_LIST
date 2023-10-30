import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  //   const transporter = nodeMailer.createTransport({
  //     host: process.archenv.SMPT_HOST,
  //     port: process.env.SMPT_PORT,
  //     auth: { user: process.env.SMPT_MAIL, password: process.env.SMPT_PASSWORD },
  //     service: process.env.SMPT_SERVICE,
  //   });

  const transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a3198eecce176a",
      pass: "08aa800ca9d168",
    },
  });

  const mailOptions = {
    from: "a3198eecce176a",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
