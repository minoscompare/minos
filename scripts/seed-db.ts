import { Cpu, PrismaClient } from '@prisma/client';
import intel from './data/intel-cpus.json';
import amd from './data/amd-cpus.json';

const prisma = new PrismaClient();

/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
async function main() {
  await prisma.cpu.deleteMany();
  await prisma.cpu.createMany({
    data: intel as Cpu[],
  });
  await prisma.cpu.createMany({
    data: amd as Cpu[],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
