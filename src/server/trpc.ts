import { initTRPC } from "@trpc/server";
import prisma from "~/prisma/client";

const t = initTRPC
  .context<{
    prisma: typeof prisma;
  }>()
  .create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
