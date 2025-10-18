-- CreateTable
CREATE TABLE "Ward" (
    "Id" SERIAL NOT NULL,
    "NiceId" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "ZoneId" INTEGER NOT NULL,
    "IsActive" TEXT NOT NULL DEFAULT 'f',

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("Id")
);
