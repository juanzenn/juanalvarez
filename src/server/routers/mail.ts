import zod from "zod";
import { procedure, router } from "../trpc";

export const mailRouter = router({
  send: procedure
    .input(
      zod.object({
        name: zod.string().trim().min(1),
        email: zod.string().email(),
        subject: zod.string().trim().min(1),
        message: zod.string().trim().min(1),
      })
    )
    .mutation(async ({ input: data, ctx }) => {
      try {
        const emailToSend = await ctx.prisma.email.create({
          data,
        });

        return { message: "OK", emailToSend };
      } catch (error) {
        return { message: "Internal server error" };
      }
    }),
});
