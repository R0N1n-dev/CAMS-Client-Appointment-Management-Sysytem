import prisma from "~~/lib/prisma.js";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "DELETE") {
    const clientNumber = event.context.params.num;
    const deletedClient = await prisma.client.delete({
      where: {
        clientNum: clientNumber,
      },
    });
    return { deletedClient };
  }

  if (event.node.req.method === "PUT") {
    const clientNumber = event.context.params.num;
    const body = await readBody(event);
    const updatedClient = await prisma.client.update({
      where: {
        id: clientNumber,
      },
      data: {
        appointments: {
          create: { advice: body.advice },
        },
      },
    });
    console.log(updatedClient);
    return { success: true };
  }

  const clientSpecificNum = event.context.params.num;
  const specificClient = await prisma.client.findUnique({
    where: {
      clientNum: clientSpecificNum,
    },
    include: {
      appointments: true,
    },
  });
  return specificClient;
});
