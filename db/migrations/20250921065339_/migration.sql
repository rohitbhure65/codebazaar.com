/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `ratingcount` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "averageRating",
DROP COLUMN "ratingcount";
