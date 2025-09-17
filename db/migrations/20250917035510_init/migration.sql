/*
  Warnings:

  - You are about to alter the column `rating` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "canonicalUrl" TEXT,
ADD COLUMN     "demoUrl" TEXT,
ADD COLUMN     "downloads" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaKeywords" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "ogDescription" TEXT,
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "ogTitle" TEXT,
ADD COLUMN     "repositoryUrl" TEXT,
ADD COLUMN     "robots" TEXT DEFAULT 'index, follow',
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "twitterDescription" TEXT,
ADD COLUMN     "twitterImage" TEXT,
ADD COLUMN     "twitterTitle" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'public';

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "averageRating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "ratingcount" INTEGER DEFAULT 0,
ALTER COLUMN "rating" SET DEFAULT 5,
ALTER COLUMN "rating" SET DATA TYPE SMALLINT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
