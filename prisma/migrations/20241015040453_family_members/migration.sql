/*
  Warnings:

  - You are about to drop the column `familymemberss` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "familymemberss",
ADD COLUMN     "familymembers" TEXT[];
