-- CreateTable
CREATE TABLE "public"."Financial_Vendors" (
    "id" TEXT NOT NULL,
    "corporateName" TEXT,
    "tradingName" TEXT NOT NULL,
    "federalDocument" VARCHAR(14),
    "email" TEXT,
    "phone" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Financial_Vendors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Financial_Vendors_tradingName_idx" ON "public"."Financial_Vendors"("tradingName");

-- CreateIndex
CREATE INDEX "Financial_Vendors_federalDocument_idx" ON "public"."Financial_Vendors"("federalDocument");
