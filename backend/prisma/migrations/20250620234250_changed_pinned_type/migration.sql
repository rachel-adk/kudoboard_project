/*
  Warnings:

  - The `pinned` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "pinned",
ADD COLUMN     "pinned" TIMESTAMP(3);
