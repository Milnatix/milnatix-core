-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('DIGITAL', 'CARD', 'CASH', 'VOUCHER', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Financial_PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."PaymentType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Financial_PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Financial_PaymentMethod_name_key" ON "public"."Financial_PaymentMethod"("name");
