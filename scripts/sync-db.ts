import 'dotenv/config';
import { Cpu, PrismaClient } from '@prisma/client';
import got from 'got-cjs';

const prisma = new PrismaClient();

async function main() {
  const cpus: Cpu[] = await got
    .get(
      'https://raw.githubusercontent.com/minoscompare/component-data/main/generated/cpus.json'
    )
    .json();
  await prisma.cpu.deleteMany();
  await prisma.cpu.createMany({ data: cpus });
  console.log(`Added ${cpus.length} cpus`);
}

main().catch((err) => console.error(err));
