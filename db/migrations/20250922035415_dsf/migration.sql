/*
  Warnings:

  - Made the column `projectImage` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `requirements` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "projectImage" SET NOT NULL,
ALTER COLUMN "requirements" SET NOT NULL;
