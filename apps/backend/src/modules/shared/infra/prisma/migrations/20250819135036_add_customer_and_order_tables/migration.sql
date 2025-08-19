/*
  Warnings:

  - You are about to alter the column `federalDocument` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(14)`.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ChefPartnerOrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."AuditLog" DROP CONSTRAINT "AuditLog_performedById_fkey";

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "federalDocument" SET DATA TYPE VARCHAR(14);

-- DropTable
DROP TABLE "public"."AuditLog";

-- DropEnum
DROP TYPE "public"."AuditAction";

-- CreateTable
CREATE TABLE "public"."ChefPartner_Customers" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "federalDocument" VARCHAR(14),
    "companyId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChefPartner_Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChefPartner_CustomerAddresses" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL DEFAULT 'S/N',
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChefPartner_CustomerAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChefPartner_Orders" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."ChefPartnerOrderStatus" NOT NULL,
    "originalAmount" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2),
    "discountPercent" DECIMAL(5,2),
    "finalAmount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChefPartner_Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChefPartner_OrderItems" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2),
    "discountPercent" DECIMAL(5,2),
    "finalPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChefPartner_OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChefPartner_Customers_email_key" ON "public"."ChefPartner_Customers"("email");

-- CreateIndex
CREATE INDEX "ChefPartner_Customers_companyId_idx" ON "public"."ChefPartner_Customers"("companyId");

-- CreateIndex
CREATE INDEX "ChefPartner_Customers_fullName_idx" ON "public"."ChefPartner_Customers"("fullName");

-- CreateIndex
CREATE INDEX "ChefPartner_CustomerAddresses_customerId_idx" ON "public"."ChefPartner_CustomerAddresses"("customerId");

-- CreateIndex
CREATE INDEX "ChefPartner_CustomerAddresses_zipCode_idx" ON "public"."ChefPartner_CustomerAddresses"("zipCode");

-- CreateIndex
CREATE INDEX "ChefPartner_Orders_customerId_idx" ON "public"."ChefPartner_Orders"("customerId");

-- CreateIndex
CREATE INDEX "ChefPartner_Orders_companyId_idx" ON "public"."ChefPartner_Orders"("companyId");

-- CreateIndex
CREATE INDEX "ChefPartner_Orders_scheduledAt_idx" ON "public"."ChefPartner_Orders"("scheduledAt");

-- CreateIndex
CREATE INDEX "ChefPartner_OrderItems_orderId_idx" ON "public"."ChefPartner_OrderItems"("orderId");

-- CreateIndex
CREATE INDEX "ChefPartner_OrderItems_productId_idx" ON "public"."ChefPartner_OrderItems"("productId");

-- CreateIndex
CREATE INDEX "ChefPartner_Products_companyId_idx" ON "public"."ChefPartner_Products"("companyId");

-- CreateIndex
CREATE INDEX "ChefPartner_Products_name_idx" ON "public"."ChefPartner_Products"("name");

-- CreateIndex
CREATE INDEX "Company_corporateName_idx" ON "public"."Company"("corporateName");

-- CreateIndex
CREATE INDEX "Company_tradingName_idx" ON "public"."Company"("tradingName");

-- AddForeignKey
ALTER TABLE "public"."ChefPartner_Customers" ADD CONSTRAINT "ChefPartner_Customers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChefPartner_CustomerAddresses" ADD CONSTRAINT "ChefPartner_CustomerAddresses_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."ChefPartner_Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChefPartner_Orders" ADD CONSTRAINT "ChefPartner_Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."ChefPartner_Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChefPartner_Orders" ADD CONSTRAINT "ChefPartner_Orders_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChefPartner_OrderItems" ADD CONSTRAINT "ChefPartner_OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."ChefPartner_Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChefPartner_OrderItems" ADD CONSTRAINT "ChefPartner_OrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."ChefPartner_Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
