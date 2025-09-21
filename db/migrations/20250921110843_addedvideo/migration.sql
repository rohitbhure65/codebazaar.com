-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "fileUrl" DROP NOT NULL;
