import { CpuBrand as PrismaCpuBrand, LaunchQuarter } from '@prisma/client';

export type CpuBrand = PrismaCpuBrand;

export interface MinosCpu {
  id: number;
  brand: CpuBrand;
  model: string;
  fullName: string;
  family: string;
  specs: {
    cores: string;
    threads: string;
    frequency: string;
    cacheL1: string | null;
    cacheL2: string | null;
    cacheL3: string | null;
    tdp: string | null;
    launchDate: string | null;
    launchYear: string | null;
    launchQuarter: string | null;
    lithography: string | null;
  };
}

/**
 * Cpu comparison object
 */
export interface CpuComparison {
  /**
   * Indices of cpus with best values for a given spec key.
   * Empty array if all cpus are equal.
   */
  bestIndices: {
    cores: number[];
    threads: number[];
    frequency: number[];
    cacheL1: number[];
    cacheL2: number[];
    cacheL3: number[];
    tdp: number[];
    launchDate: number[];
    lithography: number[];
  };
}

export type CpuTypesenseDoc = {
  id: string;
  brand: CpuBrand;
  name: string;
  fullName: string;
  family: string;
  launchQuarter: LaunchQuarter | null;
  launchYear: number | null;
  cores: number;
  threads: number;
  frequency: number;
  cacheL1: number | null;
  cacheL2: number | null;
  cacheL3: number | null;
  tdp: number | null;
  lithography: number | null;
};
