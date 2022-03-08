import { CpuComparison, MinosCpu } from '@minos/lib/types';
import { Cpu as PrismaCpu, Prisma, PrismaClient } from '@prisma/client';
import createHttpError from 'http-errors';
import {
  argMaxWithNull,
  argMinWithNull,
} from '@minos/lib/api/utils/arg-minmax';

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
  };
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

export async function compareCpus(
  prisma: PrismaClient,
  cpuIds: number[]
): Promise<CpuComparison> {
  const cpus = await getManyCpusUnformatted(prisma, {
    where: { id: { in: cpuIds } },
  });

  // Cpu mismatch: did not find all cpus in cpuIds
  if (cpus.length !== cpuIds.length) {
    throw new createHttpError.NotFound();
  }

  // Return null if there is nothing to compare
  if (cpus.length <= 1) {
    return {
      bestIndices: {
        cores: [],
        threads: [],
        frequency: [],
        cacheL1: [],
        cacheL2: [],
        cacheL3: [],
        tdp: [],
        launchDate: [],
        lithography: [],
      },
    };
  }

  return {
    bestIndices: {
      cores: argMaxWithNull(cpus.map((cpu) => cpu.cores)),
      threads: argMaxWithNull(cpus.map((cpu) => cpu.threads)),
      frequency: argMaxWithNull(cpus.map((cpu) => cpu.frequency)),
      cacheL1: argMaxWithNull(cpus.map((cpu) => cpu.cacheL1)),
      cacheL2: argMaxWithNull(cpus.map((cpu) => cpu.cacheL2)),
      cacheL3: argMaxWithNull(cpus.map((cpu) => cpu.cacheL3)),
      tdp: argMaxWithNull(cpus.map((cpu) => cpu.tdp)),
      launchDate: argMaxWithNull(
        // Finds index of cpu with most recent date (also takes launchQuarter into account)
        cpus.map((cpu) => {
          if (cpu.launchYear) {
            let dateNum = cpu.launchYear * 10;
            if (cpu.launchQuarter) {
              dateNum += { Q1: 0, Q2: 1, Q3: 2, Q4: 3 }[cpu.launchQuarter];
            }
            return dateNum;
          }
          return null;
        })
      ),
      lithography: argMinWithNull(cpus.map((cpu) => cpu.lithography)),
    },
  };
}
