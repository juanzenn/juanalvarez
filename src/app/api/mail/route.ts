import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name: string;
    email: string;
    subject: string;
    message: string;
  };

  const configOptions = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  };
  let transporter = createTransport(configOptions);

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) reject(error);
      else resolve(success);
    });
  });

  const { name, email, subject, message } = body;

  const messageOptions: Mail.Options = {
    from: `info-juanalvarez.dev <info@juanalvarez.dev>`,
    replyTo: `${name} ${email}`,
    subject: `Mensaje de formulario: ${subject}`,
    text: `${message}`,
    to: "juanandres140299@gmail.com",
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(messageOptions, function (error, success) {
      if (error) reject(error);
      else resolve(success);
    });
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
