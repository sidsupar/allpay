-- CreateEnum
CREATE TYPE "onRampStatus" AS ENUM ('processing', 'sent', 'failed');

-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "balances" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balances" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "onRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "completionTime" TIMESTAMP(3) NOT NULL,
    "provider" TEXT,
    "userFrom" INTEGER NOT NULL,
    "userTo" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_token_key" ON "Transaction"("token");

-- AddForeignKey
ALTER TABLE "Balances" ADD CONSTRAINT "Balances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userFrom_fkey" FOREIGN KEY ("userFrom") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userTo_fkey" FOREIGN KEY ("userTo") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
