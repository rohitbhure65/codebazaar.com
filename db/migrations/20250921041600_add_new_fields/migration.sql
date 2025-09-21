/*
  Warnings:

  - You are about to drop the column `canonicalUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `ogDescription` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `ogImage` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `ogTitle` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `twitterDescription` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `twitterImage` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `twitterTitle` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "canonicalUrl",
DROP COLUMN "ogDescription",
DROP COLUMN "ogImage",
DROP COLUMN "ogTitle",
DROP COLUMN "twitterDescription",
DROP COLUMN "twitterImage",
DROP COLUMN "twitterTitle";
