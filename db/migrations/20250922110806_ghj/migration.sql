/*
  Warnings:

  - The `visibility` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupportTicket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'NOTAPPROVED');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- DropForeignKey
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTag" DROP CONSTRAINT "ProjectTag_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userId_fkey";

-- DropForeignKey
ALTER TABLE "SupportTicket" DROP CONSTRAINT "SupportTicket_projectId_fkey";

-- DropForeignKey
ALTER TABLE "SupportTicket" DROP CONSTRAINT "SupportTicket_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "visibility",
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'public';

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "ProjectTag";

-- DropTable
DROP TABLE "Purchase";

-- DropTable
DROP TABLE "SupportTicket";

-- DropTable
DROP TABLE "Transaction";
