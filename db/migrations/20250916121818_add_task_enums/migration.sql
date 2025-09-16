/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('Bug', 'Enhancement', 'Feature', 'Testing', 'Development', 'Design');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Backlog', 'ToDo', 'InProgress', 'ReadyForReview', 'BackForReview', 'Completed');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "type",
ADD COLUMN     "type" "TaskType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'Backlog';
