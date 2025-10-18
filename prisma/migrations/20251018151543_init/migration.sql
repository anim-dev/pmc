-- CreateTable
CREATE TABLE "authtokens" (
    "id" BIGSERIAL NOT NULL,
    "accesstoken" TEXT,
    "citizenid" BIGINT,
    "userid" INTEGER,
    "created" TIMESTAMP(3) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "citizenloginotpid" BIGINT,

    CONSTRAINT "authtokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citizenloginotps" (
    "id" BIGSERIAL NOT NULL,
    "otp" TEXT,
    "created" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "citizenid" BIGINT,

    CONSTRAINT "citizenloginotps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citizens" (
    "id" BIGSERIAL NOT NULL,
    "organizationid" INTEGER NOT NULL,
    "name" TEXT,
    "gender" TEXT,
    "phone" TEXT,
    "isbhararipathakuser" BOOLEAN NOT NULL,

    CONSTRAINT "citizens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaintevidences" (
    "id" BIGSERIAL NOT NULL,
    "complaintid" BIGINT,
    "type" INTEGER NOT NULL,
    "filepath" TEXT,

    CONSTRAINT "complaintevidences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaintfeedbacks" (
    "id" BIGSERIAL NOT NULL,
    "complaintid" BIGINT,
    "rating" INTEGER NOT NULL,
    "text" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "complaintfeedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaintstatuslogevidences" (
    "id" BIGSERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "filepath" TEXT,
    "complaintstatuslogid" BIGINT,

    CONSTRAINT "complaintstatuslogevidences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaintstatuslogs" (
    "id" BIGSERIAL NOT NULL,
    "status" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "complaintid" BIGINT,
    "updatedbyid" INTEGER,
    "foruserid" INTEGER,
    "remarks" TEXT,
    "logmessage" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,

    CONSTRAINT "complaintstatuslogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaints" (
    "id" BIGSERIAL NOT NULL,
    "complaintid" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "address" TEXT,
    "description" TEXT,
    "potholecount" INTEGER NOT NULL,
    "pothholetypeid" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "citizenid" BIGINT,
    "organizationid" INTEGER,
    "prabhagid" INTEGER,
    "isflaggedfornodal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "hostname" TEXT,
    "apihostname" TEXT,
    "isdeleted" BOOLEAN NOT NULL,
    "logo" TEXT,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "potholetypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "organizationid" INTEGER,
    "isactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "potholetypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prabhaggeocoordinates" (
    "id" SERIAL NOT NULL,
    "prabhagid" INTEGER,
    "kml" TEXT,
    "organizationid" INTEGER,

    CONSTRAINT "prabhaggeocoordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prabhags" (
    "id" SERIAL NOT NULL,
    "niceid" INTEGER NOT NULL,
    "objectid" INTEGER NOT NULL,
    "name" TEXT,
    "wardid" INTEGER,
    "subid" TEXT,
    "isactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "prabhags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "organizationid" INTEGER,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smslogs" (
    "id" BIGSERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "templateid" TEXT,
    "body" TEXT,
    "phone" TEXT,
    "citizenid" BIGINT,
    "userid" INTEGER,
    "reason" TEXT,
    "issent" BOOLEAN NOT NULL,
    "isdelivered" TEXT,
    "gatewayrecordid" TEXT,
    "complaintid" BIGINT,

    CONSTRAINT "smslogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userprabhags" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "prabhagid" INTEGER,

    CONSTRAINT "userprabhags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userroles" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "roleid" INTEGER,

    CONSTRAINT "userroles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userwards" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "wardid" INTEGER,

    CONSTRAINT "userwards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userzones" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "zoneid" INTEGER,

    CONSTRAINT "userzones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wards" (
    "id" SERIAL NOT NULL,
    "niceid" INTEGER NOT NULL,
    "name" TEXT,
    "zoneid" INTEGER,
    "isactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "wards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workqualitystandards" (
    "id" BIGSERIAL NOT NULL,
    "usedstandard1" BOOLEAN NOT NULL,
    "usedstandard2" BOOLEAN NOT NULL,
    "usedstandard3" BOOLEAN NOT NULL,
    "usedstandard4" BOOLEAN NOT NULL,
    "complaintstatuslogid" BIGINT,

    CONSTRAINT "workqualitystandards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zones" (
    "id" SERIAL NOT NULL,
    "niceid" TEXT,
    "name" TEXT,
    "organizationid" INTEGER NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "zones_pkey" PRIMARY KEY ("id")
);
