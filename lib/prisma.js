import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient().$extends(withAccelerate());
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient().$extends(withAccelerate());
  }
  prisma = global.prisma;
}

export default prisma;
