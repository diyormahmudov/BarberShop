-- Enable UUID generation (gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "Form" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barberName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "service" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
