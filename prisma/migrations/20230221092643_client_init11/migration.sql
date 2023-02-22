/*
  Warnings:

  - You are about to drop the column `sex` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "sex",
ADD COLUMN     "history" TEXT[];
