import { CpuBrand as PrismaCpuBrand, LaunchQuarter } from '@prisma/client';

export type CpuBrand = PrismaCpuBrand;

export interface MinosCpu {
  id: number;
  brand: CpuBrand;
  model: string;
  fullName: string;
  family: string;
  specs: {
    cores: string | null;
    threads: string | null;
    frequency: string | null;
    cacheL1: string | null;
    cacheL2: string | null;
    cacheL3: string | null;
    tdp: string | null;
    launchDate: string | null;
    launchYear: string | null;
    launchQuarter: string | null;
    lithography: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Cpu comparison object
 */
export interface CpuComparison {
  /**
   * Indexes of cpus with best values for a given spec key.
   * Values are null if no cpus have better specs.
   */
  bestIndex: {
    cores: number | null;
    threads: number | null;
    frequency: number | null;
    cacheL1: number | null;
    cacheL2: number | null;
    cacheL3: number | null;
    tdp: number | null;
    launchDate: number | null;
    lithography: number | null;
  };
}

export interface CpuTypesenseDoc {
  id: string;
  brand: CpuBrand;
  name: string;
  fullName: string;
  family: string;
  launchQuarter: LaunchQuarter | null;
  launchYear: number | null;
  cores: number | null;
  threads: number | null;
  frequency: number | null;
  cacheL1: number | null;
  cacheL2: number | null;
  cacheL3: number | null;
  tdp: number | null;
  lithography: number | null;
}
