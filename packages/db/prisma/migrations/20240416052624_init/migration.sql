/*
  Warnings:

  - You are about to drop the column `userFrom` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userTo` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userFrom_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userTo_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userFrom",
DROP COLUMN "userTo",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
