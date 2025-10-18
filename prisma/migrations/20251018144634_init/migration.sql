/*
  Warnings:

  - You are about to drop the column `displayName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `user` table. All the data in the column will be lost.
  - Added the required column `organizationid` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "displayName",
DROP COLUMN "firstName",
DROP COLUMN "isActive",
DROP COLUMN "organizationId",
DROP COLUMN "passwordHash",
ADD COLUMN     "displayname" TEXT,
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "isactive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "organizationid" INTEGER NOT NULL,
ADD COLUMN     "passwordhash" TEXT;
