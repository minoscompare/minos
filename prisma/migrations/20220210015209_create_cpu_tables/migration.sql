/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CpuBrand" AS ENUM ('Intel', 'AMD');

-- CreateEnum
CREATE TYPE "LaunchQuarter" AS ENUM ('Q1', 'Q2', 'Q3', 'Q4');

-- CreateEnum
CREATE TYPE "GpuBrand" AS ENUM ('Intel', 'AMD', 'NVIDIA');

-- CreateEnum
CREATE TYPE "GpuReseller" AS ENUM ('GIGABYTE', 'EVGA', 'ASUS_ROG');

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Cpu" (
    "id" SERIAL NOT NULL,
    "brand" "CpuBrand" NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "launchQuarter" "LaunchQuarter",
    "launchYear" INTEGER,
    "cores" INTEGER NOT NULL,
    "threads" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "cacheL1" INTEGER,
    "cacheL2" INTEGER,
    "cacheL3" INTEGER,
    "tdp" INTEGER,
    "lithography" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" SERIAL NOT NULL,
    "brand" "GpuBrand" NOT NULL,
    "name" TEXT NOT NULL,
    "reseller" "GpuReseller" NOT NULL,
    "launchQuarter" "LaunchQuarter" NOT NULL,
    "launchYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cpu_brand_name_key" ON "Cpu"("brand", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Gpu_brand_name_reseller_key" ON "Gpu"("brand", "name", "reseller");
