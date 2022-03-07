import { MinosCpu } from '@minos/lib/types';
import {
  Cpu as PrismaCpu,
  CpuBrand,
  Prisma,
  PrismaClient,
} from '@prisma/client';

export function prismaCpuToMinosCpu(cpu: PrismaCpu): MinosCpu {
  return {
    id: cpu.id,
    brand: cpu.brand,
    model: cpu.name,
    fullName: `${cpu.brand} ${cpu.name}`,
    family: cpu.family,
    specs: {
      cores: cpu.cores.toString(),
      threads: cpu.threads.toString(),
      frequency: `${cpu.frequency * 10e-2} GHz`,
      cacheL1: cpu.cacheL1 ? `${cpu.cacheL1} MB` : null,
      cacheL2: cpu.cacheL2 ? `${cpu.cacheL2} MB` : null,
      cacheL3: cpu.cacheL3 ? `${cpu.cacheL3} MB` : null,
      tdp: cpu.tdp ? `${cpu.tdp} W` : null,
      lithography: cpu.lithography ? `${cpu.lithography} nm` : null,
      launchDate:
        cpu.launchQuarter && cpu.launchYear
          ? `${cpu.launchQuarter} ${cpu.launchYear}`
          : cpu.launchYear
          ? cpu.launchYear.toString()
          : null,
      launchQuarter: cpu.launchQuarter ? cpu.launchQuarter.toString() : null,
      launchYear: cpu.launchYear ? cpu.launchYear.toString() : null,
    },
    createdAt: cpu.createdAt.toISOString(),
    updatedAt: cpu.createdAt.toISOString(),
  };
}

export async function createCpu(
  prisma: PrismaClient,
  data: Prisma.CpuCreateInput
) {
  const cpu = await prisma.cpu.create({ data });
  return prismaCpuToMinosCpu(cpu);
}

export async function getCpuByIdUnformatted(prisma: PrismaClient, id: number) {
  const cpu = await prisma.cpu.findUnique({ where: { id } });
  return cpu;
}

export async function getCpuById(prisma: PrismaClient, id: number) {
  const cpu = await getCpuByIdUnformatted(prisma, id);

  if (!cpu) return null;

  return prismaCpuToMinosCpu(cpu);
}

export async function getManyCpusUnformatted(
  prisma: PrismaClient,
  args: Prisma.CpuFindManyArgs
) {
  const cpus = await prisma.cpu.findMany(args);
  return cpus;
}

export async function getManyCpus(
  prisma: PrismaClient,
  args: Prisma.CpuFindManyArgs
) {
  const cpus = await getManyCpusUnformatted(prisma, args);
  return cpus.map(prismaCpuToMinosCpu);
}

export async function updateCpuById(
  prisma: PrismaClient,
  id: number,
  data: Prisma.CpuUpdateInput
) {
  const cpu = await prisma.cpu.update({ where: { id }, data });
  return prismaCpuToMinosCpu(cpu);
}

export async function updateCpu(
  prisma: PrismaClient,
  args: Prisma.CpuUpdateArgs
) {
  const cpu = await prisma.cpu.update(args);
  return prismaCpuToMinosCpu(cpu);
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
