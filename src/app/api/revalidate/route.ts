import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    secret?: string;
  } | null;

  if (
    process.env.PRISMIC_WEBHOOK_SECRET &&
    body?.secret !== process.env.PRISMIC_WEBHOOK_SECRET
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("prismic", { expire: 0 });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
