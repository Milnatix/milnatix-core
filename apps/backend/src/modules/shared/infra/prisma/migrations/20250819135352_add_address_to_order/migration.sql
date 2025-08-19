/*
  Warnings:

  - Added the required column `deliveryCity` to the `ChefPartner_Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryNeighborhood` to the `ChefPartner_Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryState` to the `ChefPartner_Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryStreet` to the `ChefPartner_Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ChefPartner_Orders" ADD COLUMN     "deliveryCity" TEXT NOT NULL,
ADD COLUMN     "deliveryComplement" TEXT,
ADD COLUMN     "deliveryNeighborhood" TEXT NOT NULL,
ADD COLUMN     "deliveryNumber" TEXT NOT NULL DEFAULT 'S/N',
ADD COLUMN     "deliveryState" TEXT NOT NULL,
ADD COLUMN     "deliveryStreet" TEXT NOT NULL,
ADD COLUMN     "deliveryZipCode" TEXT,
ADD COLUMN     "shippingAmount" DECIMAL(10,2);
