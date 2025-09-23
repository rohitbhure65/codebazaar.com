/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `walletBalance` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "gender",
DROP COLUMN "phone",
DROP COLUMN "walletBalance";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "age" INTEGER,
    "city" TEXT,
    "state" TEXT,
    "phone" TEXT,
    "gender" "Gender",
    "country" TEXT,
    "postalCode" TEXT,
    "profilePic" TEXT,
    "walletBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userProfileId" INTEGER,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_phone_key" ON "UserProfile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userProfileId_key" ON "UserProfile"("userProfileId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
