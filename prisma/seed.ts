import { Cpu, PrismaClient } from '@prisma/client';
import data from './intel-cpus.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.cpu.deleteMany();
  await prisma.cpu.createMany({
    data: data as Cpu[],
  });
}

main();
