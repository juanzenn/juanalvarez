import { NextApiRequest, NextApiResponse } from "next";
import zod from "zod";
import prisma from "~/prisma/client";

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

    const emailToSend = await prisma.email.create({
      data: {
        email: body.email,
        name: body.name,
        subject: body.subject,
        message: body.message,
      },
    });

    return res.status(200).json({ message: "OK", emailToSend });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: "Bad request", error });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}
