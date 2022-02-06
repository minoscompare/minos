import {
  Cpu as PrismaCpu,
  CpuBrand,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { Minos } from '../types';

export function prismaCpuToAppCpu(cpu: PrismaCpu): Minos.Cpu {
  const essentials: Minos.CpuSpecsCategory = {
    categoryName: 'Essentials',
    items: [
      { name: '# of Cores', value: cpu.cores.toString() },
      { name: '# of Threads', value: cpu.threads.toString() },
      { name: 'Base Frequency', value: `${cpu.frequency} GHz` },
      { name: 'L1 Cache', value: cpu.cacheL1 ? `${cpu.cacheL1} MB` : null },
      { name: 'L2 Cache', value: cpu.cacheL2 ? `${cpu.cacheL2} MB` : null },
      { name: 'L3 Cache', value: cpu.cacheL2 ? `${cpu.cacheL2} MB` : null },
      { name: 'TDP', value: cpu.tdp ? `${cpu.tdp} W` : null },
    ],
  };

  const extras: Minos.CpuSpecsCategory = {
    categoryName: 'Extras',
    items: [],
  };

  if (cpu.launchQuarter && cpu.launchYear) {
    extras.items.push({
      name: 'Launch Date',
      value: `${cpu.launchQuarter} ${cpu.launchYear}`,
    });
  } else if (cpu.launchYear) {
    extras.items.push({
      name: 'Launch Date',
      value: cpu.launchYear.toString(),
    });
  } else {
    extras.items.push({
      name: 'Launch Date',
      value: null,
    });
  }

  extras.items.push({
    name: 'Lithography',
    value: cpu.lithography ? `${cpu.lithography} nm` : null,
  });

  return {
    id: cpu.id,
    brand: cpu.brand,
    model: cpu.name,
    fullName: `${cpu.brand} ${cpu.name}`,
    family: cpu.family,
    specs: [essentials, extras],
    createdAt: cpu.createdAt.toISOString(),
    updatedAt: cpu.updatedAt.toISOString(),
  };
}

export async function createCpu(
  prisma: PrismaClient,
  data: Prisma.CpuCreateInput
) {
  const cpu = await prisma.cpu.create({ data });
  return prismaCpuToAppCpu(cpu);
}

export async function getCpuById(prisma: PrismaClient, id: number) {
  const cpu = await prisma.cpu.findUnique({ where: { id } });

  if (!cpu) {
    return null;
  }

  return prismaCpuToAppCpu(cpu);
}

export async function getManyCpus(
  prisma: PrismaClient,
  args: Prisma.CpuFindManyArgs
) {
  const cpus = await prisma.cpu.findMany(args);
  return cpus.map(prismaCpuToAppCpu);
}

export async function updateCpuById(
  prisma: PrismaClient,
  id: number,
  data: Prisma.CpuUpdateInput
) {
  const cpu = await prisma.cpu.update({ where: { id }, data });
  return prismaCpuToAppCpu(cpu);
}

export async function updateCpu(
  prisma: PrismaClient,
  args: Prisma.CpuUpdateArgs
) {
  const cpu = await prisma.cpu.update(args);
  return prismaCpuToAppCpu(cpu);
}

export async function deleteCpuById(prisma: PrismaClient, id: number) {
  await prisma.cpu.delete({ where: { id } });
}

export async function deleteCpu(
  prisma: PrismaClient,
  args: Prisma.CpuDeleteArgs
) {
  await prisma.cpu.delete(args);
}
