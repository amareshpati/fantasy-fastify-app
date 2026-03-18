/*
  Warnings:

  - You are about to drop the `ApiLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApiLog";

-- CreateTable
CREATE TABLE "ApiLogger" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'info',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiLogger_pkey" PRIMARY KEY ("id")
);
