/*
  Warnings:

  - You are about to drop the column `familymemebrs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "familymemebrs",
ADD COLUMN     "familymemberss" TEXT[];
