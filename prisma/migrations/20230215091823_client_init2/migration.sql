/*
  Warnings:

  - You are about to drop the column `resolutions` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `resolution` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "resolutions",
ADD COLUMN     "resolution" JSONB NOT NULL;
