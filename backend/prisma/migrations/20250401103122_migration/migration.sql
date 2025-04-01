-- CreateTable
CREATE TABLE "DownHistory" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "hostName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DownHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "immediatefailureNotification" (
    "id" TEXT NOT NULL,
    "downHistoryId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "immediatefailureNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "immediatefailureNotification" ADD CONSTRAINT "immediatefailureNotification_downHistoryId_fkey" FOREIGN KEY ("downHistoryId") REFERENCES "DownHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
