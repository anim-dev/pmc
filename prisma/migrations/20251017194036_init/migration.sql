/*
  Warnings:

  - The `IsActive` column on the `Ward` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ward" DROP COLUMN "IsActive",
ADD COLUMN     "IsActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Zone" (
    "Id" SERIAL NOT NULL,
    "NiceId" TEXT,
    "Name" TEXT NOT NULL,
    "OrganizationId" INTEGER NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "PrabhagGeoCoordinates" (
    "Id" SERIAL NOT NULL,
    "PrabhagId" INTEGER,
    "KML" TEXT,
    "OrganizationId" INTEGER,

    CONSTRAINT "PrabhagGeoCoordinates_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Prabhag" (
    "Id" SERIAL NOT NULL,
    "NiceId" INTEGER NOT NULL,
    "ObjectId" INTEGER NOT NULL,
    "Name" TEXT,
    "WardId" INTEGER,
    "SubId" TEXT,
    "IsActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Prabhag_pkey" PRIMARY KEY ("Id")
);
