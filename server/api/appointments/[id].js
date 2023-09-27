import prisma from "~~/lib/prisma.js";
export default defineEventHandler(async (event) => {
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
