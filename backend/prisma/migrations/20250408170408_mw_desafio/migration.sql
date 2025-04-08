/*
  Warnings:

  - You are about to drop the column `itemId` on the `immediatefailureNotification` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "immediatefailureNotification_itemId_key";

-- AlterTable
ALTER TABLE "immediatefailureNotification" DROP COLUMN "itemId";
