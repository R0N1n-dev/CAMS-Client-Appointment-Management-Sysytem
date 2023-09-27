import prisma from "~~/lib/prisma.js";
export default defineEventHandler(async (event) => {
  if ((event.node, req.method === "PUT")) {
    const body = await readBody(event);
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: event.context.params.id,
      },
      data: {
        results: {
          create: {
            feedback: body.feedback,
          },
        },
      },
    });
    console.log(updatedAppointment);
    return { success: true };
  }

  const specificAppointment = await prisma.appointment.findUnique({
    where: {
      id: event.context.params.id,
    },
    /*include: {
      appointments: true,
    },*/
  });
  return specificAppointment;
});
