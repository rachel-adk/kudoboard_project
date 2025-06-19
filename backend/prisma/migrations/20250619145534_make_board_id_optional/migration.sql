/*
  Warnings:

  - You are about to drop the column `board_id` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_id_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "board_id",
ADD COLUMN     "boardId" INTEGER,
ALTER COLUMN "upvotes" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
