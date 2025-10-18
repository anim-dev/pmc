/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "organizationid" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "designation" TEXT,
    "phone" TEXT,
    "passwordhash" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "displayname" TEXT,
    "title" TEXT,
    "password" TEXT,
    "isactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
