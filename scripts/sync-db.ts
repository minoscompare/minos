import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { diffData, fetchCpus } from './helpers/fetch-data';

const prisma = new PrismaClient();

async function main() {
  const incomingCpus = await fetchCpus();
  const currentCpus = await prisma.cpu.findMany({
    select: {
      brand: true,
      cacheL1: true,
      cacheL2: true,
      cacheL3: true,
      cores: true,
      family: true,
      frequency: true,
      id: true,
      launchQuarter: true,
      launchYear: true,
      lithography: true,
      name: true,
      tdp: true,
      threads: true,
    },
  });

  const { dataToUpsert, dataToRemove } = diffData(currentCpus, incomingCpus);

  // One mega query to add/update all changed cpus
  await prisma.$transaction(
    dataToUpsert.map((cpu) =>
      prisma.cpu.upsert({
        where: { id: cpu.id },
        update: cpu,
        create: cpu,
      })
    )
  );

  await prisma.cpu.deleteMany({
    where: { id: { in: dataToRemove.map((cpu) => cpu.id) } },
  });

  console.log(`Added/Updated ${dataToUpsert.length} cpus`);
  console.log(`Removed ${dataToRemove.length} cpus`);
}

main().catch((err) => console.error(err));
