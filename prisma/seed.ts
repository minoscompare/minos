import { CpuBrand, LaunchQuarter, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.cpu.create({
    data: {
      brand: CpuBrand.INTEL,
      name: 'i7 6700K',
      launchQuarter: LaunchQuarter.Q3,
      launchYear: 2015,
      cache: 8,
      cores: 4,
      threads: 8,
      tdp: 91,
      frequency: 4.0,
      lithography: 14,
    },
  });
}

main();
