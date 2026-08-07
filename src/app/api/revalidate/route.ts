import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as {
    secret?: string;
  } | null;

  if (body?.secret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("prismic", { expire: 0 });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
