import { Cpu, PrismaClient } from '@prisma/client';
import intel from './intel-cpus.json';
import amd from './amd-cpus.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.cpu.deleteMany();
  await prisma.cpu.createMany({
    data: intel as Cpu[],
  });
  await prisma.cpu.createMany({
    data: amd as Cpu[],
  });
}

main();
