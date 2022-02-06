import { Cpu as PrismaCpu, CpuBrand, PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import { Minos } from '../types';

export function prismaCpuToAppCpu(cpu: PrismaCpu): Minos.Cpu {
  const essentials: Minos.CpuSpecsCategory = {
    categoryName: 'Essentials',
    items: [
      { name: '# of Cores', value: cpu.cores.toString() },
      { name: '# of Threads', value: cpu.threads.toString() },
      { name: 'Base Frequency', value: `${cpu.frequency} GHz` },
    ],
  };

  if (cpu.cache) {
    essentials.items.push({ name: 'Cache', value: `${cpu.cache} MB` });
  }

  if (cpu.tdp) {
    essentials.items.push({ name: 'TDP', value: `${cpu.tdp} W` });
  }

  const extras: Minos.CpuSpecsCategory = {
    categoryName: 'Extras',
    items: [],
  };

  if (cpu.launchQuarter && cpu.launchYear) {
    extras.items.push({
      name: 'Launch Date',
      value: `${cpu.launchQuarter} ${cpu.launchYear}`,
    });
  }

  if (cpu.lithography) {
    extras.items.push({ name: 'Lithography', value: `${cpu.lithography} nm` });
  }

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

export async function getCpuById(prisma: PrismaClient, id: number) {
  const cpu = await prisma.cpu.findUnique({ where: { id } });

  if (!cpu) {
    throw new createHttpError.NotFound('CPU Not found');
  }

  return prismaCpuToAppCpu(cpu);
}
