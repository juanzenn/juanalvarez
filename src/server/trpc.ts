import { initTRPC } from "@trpc/server";
import { db } from "~/lib/db";

const t = initTRPC
  .context<{
    prisma: typeof db;
  }>()
  .create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
