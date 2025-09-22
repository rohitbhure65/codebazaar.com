-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectImage" DROP NOT NULL,
ALTER COLUMN "projectImage" SET DEFAULT '',
ALTER COLUMN "requirements" DROP NOT NULL;
