/*
  Warnings:

  - The values [public,private] on the enum `Visibility` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Visibility_new" AS ENUM ('PUBLIC', 'PRIVATE');
ALTER TABLE "Project" ALTER COLUMN "visibility" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "visibility" TYPE "Visibility_new" USING ("visibility"::text::"Visibility_new");
ALTER TYPE "Visibility" RENAME TO "Visibility_old";
ALTER TYPE "Visibility_new" RENAME TO "Visibility";
DROP TYPE "Visibility_old";
ALTER TABLE "Project" ALTER COLUMN "visibility" SET DEFAULT 'PUBLIC';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "visibility" SET DEFAULT 'PUBLIC';
