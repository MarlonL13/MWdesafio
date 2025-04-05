-- CreateTable
CREATE TABLE "downHistory" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "hostName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "downHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "immediatefailureNotification" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "downHistoryId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "immediatefailureNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "immediatefailureNotification_itemId_key" ON "immediatefailureNotification"("itemId");

-- AddForeignKey
ALTER TABLE "immediatefailureNotification" ADD CONSTRAINT "immediatefailureNotification_downHistoryId_fkey" FOREIGN KEY ("downHistoryId") REFERENCES "downHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
