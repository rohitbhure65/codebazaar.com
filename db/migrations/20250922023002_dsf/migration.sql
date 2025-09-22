/*
  Warnings:

  - Made the column `fileUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `demoUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metaDescription` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metaKeywords` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metaTitle` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repositoryUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `robots` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `videoUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "fileUrl" SET NOT NULL,
ALTER COLUMN "fileUrl" DROP DEFAULT,
ALTER COLUMN "demoUrl" SET NOT NULL,
ALTER COLUMN "demoUrl" DROP DEFAULT,
ALTER COLUMN "metaDescription" SET NOT NULL,
ALTER COLUMN "metaDescription" DROP DEFAULT,
ALTER COLUMN "metaKeywords" SET NOT NULL,
ALTER COLUMN "metaKeywords" DROP DEFAULT,
ALTER COLUMN "metaTitle" SET NOT NULL,
ALTER COLUMN "metaTitle" DROP DEFAULT,
ALTER COLUMN "repositoryUrl" SET NOT NULL,
ALTER COLUMN "repositoryUrl" DROP DEFAULT,
ALTER COLUMN "robots" SET NOT NULL,
ALTER COLUMN "features" DROP DEFAULT,
ALTER COLUMN "requirements" DROP DEFAULT,
ALTER COLUMN "videoUrl" SET NOT NULL,
ALTER COLUMN "videoUrl" DROP DEFAULT;
