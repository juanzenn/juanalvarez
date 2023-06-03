import { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { db } from "~/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configOptions = {
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@juanalvarez.dev",
      pass: "qTh28v55y5Lv*ap",
    },
  };
  let transporter = nodemailer.createTransport(configOptions);

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) reject(error);
      else resolve(success);
    });
  });

  const emails = await db.email.findMany({
    where: {
      isPending: true,
    },
  });

  for (const _email of emails) {
    const { id, name, email, subject, message } = _email;
    const messageOptions: Mail.Options = {
      from: `Contacto - ${name} <info@juanalvarez.dev>`,
      replyTo: `${name} ${email}`,
      subject: subject,
      text: `${message}`,
      to: "info@juanalvarez.dev",
      bcc: "juanandres140299@gmail.com",
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(messageOptions, function (error, success) {
        if (error) reject(error);
        else resolve(success);
      });
    });

    await db.email.update({
      where: {
        id,
      },
      data: {
        isPending: false,
      },
    });
  }

  res.status(200).end("Hello Cron!");
}
