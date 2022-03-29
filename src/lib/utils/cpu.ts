import { CpuTypesenseDoc, MinosCpu } from '@minos/lib/types';

export function typesenseCpuToMinosCpu(cpu: CpuTypesenseDoc): MinosCpu {
  return {
    id: parseInt(cpu.id, 10),
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
