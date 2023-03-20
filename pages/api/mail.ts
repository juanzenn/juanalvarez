import { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import zod from "zod";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return handlePOST(res, req.body);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

async function handlePOST(res: NextApiResponse, payload: string) {
  try {
    const bodySchema = zod.object({
      name: zod.string().trim().min(1),
      email: zod.string().email(),
      subject: zod.string().trim().min(1),
      message: zod.string().trim().min(1),
    });
    const body = bodySchema.parse(JSON.parse(payload));
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

    const message: Mail.Options = {
      from: `"Contacto - Juan Alvarez" <info@juanalvarez.dev>`,
      replyTo: `${body.name} ${body.email}`,
      subject: body.subject,
      text: `${body.message}`,
      to: "info@juanalvarez.dev",
      bcc: "juanandres140299@gmail.com",
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(message, function (error, success) {
        if (error) reject(error);
        else resolve(success);
      });
    });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: "Bad request", error });
    }

    return res.status(500).json({ message: "Internal server error" });
  }

  return res.status(200).json({ message: "OK" });
}
