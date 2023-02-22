import prisma from "~~/lib/prisma.js";
export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const clients = await prisma.client.findMany({
      include: {
        appointments: true,
      },
    });
    //console.log(clients);
    return clients;
  }

  if (event.node.req.method === "POST") {
    const body = await readBody(event);
    const clientData = await prisma.client.create({
      data: {
        clientNum: body.clientNum,
        names: body.names,
        age: body.age,
        contact: body.contact,
        email: body.email,
        profession: body.profession,
        diagnosis: body.diagnosis,
        appointments: {
          create: {
            advice: body.advice,
          },
        },
      },
    });
    console.log("Added new Client", `${clientData.names}`);
    return { success: true };
  }
});
