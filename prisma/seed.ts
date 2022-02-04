import { CpuBrand, LaunchQuarter, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.cpu.deleteMany();
  await prisma.cpu.createMany({
    data: [
      {
        brand: CpuBrand.INTEL,
        name: 'Core i7 6700K',
        launchQuarter: LaunchQuarter.Q3,
        launchYear: 2015,
        cache: 8,
        cores: 4,
        threads: 8,
        tdp: 91,
        frequency: 4.0,
        lithography: 14,
      },
      {
        brand: CpuBrand.AMD,
        name: 'Ryzen 9 5900X',
        launchQuarter: LaunchQuarter.Q4,
        launchYear: 2020,
        cache: 64,
        cores: 12,
        threads: 24,
        tdp: 105,
        frequency: 3.7,
        lithography: 7,
      },
    ],
  });
}

main();
