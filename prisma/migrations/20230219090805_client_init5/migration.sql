/*
  Warnings:

  - You are about to drop the column `resolution` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "resolution",
ADD COLUMN     "advice" TEXT[],
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
