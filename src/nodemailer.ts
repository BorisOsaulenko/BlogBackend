import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "bs.osaulenko@gmail.com",
    pass: "lhmu crjy uytv mwqk",
  },
  secure: true,
});

export const sendActivationEmail = (email: string, link: string) => {
  const activationEmail = {
    from: "bs.osaulenko@gmail.com",
    to: email,
    subject: "Activate your account in messenger",
    text: "Sending you an activation link",
    html: `<b>Hey there! </b><br> This is your activation link: ${link}<br/>`,
  };

  transporter.sendMail(activationEmail, (err, info) => {
    if (err) return console.log(err);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};
