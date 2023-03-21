import { initTRPC } from "@trpc/server";
import prisma from "~/prisma/client";

export const createContext = async () => {
  return {
    prisma,
  };
};

const t = initTRPC.context<typeof createContext>().create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
