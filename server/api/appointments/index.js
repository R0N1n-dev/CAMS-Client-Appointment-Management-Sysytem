import prisma from "~~/lib/prisma.js";
export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const appointments = await prisma.appointment.findMany({
      cacheStrategy: {
        ttl: 60,
      },
    });
    return appointments;
  }
});
