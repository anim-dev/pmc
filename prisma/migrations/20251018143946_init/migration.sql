/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "OrganizationId" INTEGER NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT,
    "Designation" TEXT,
    "Phone" TEXT,
    "PasswordHash" TEXT,
    "FirstName" TEXT,
    "LastName" TEXT,
    "DisplayName" TEXT,
    "Title" TEXT,
    "Password" TEXT,
    "IsActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);
