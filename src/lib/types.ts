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

export interface CpuTypesenseDoc {
  id: string;
  brand: CpuBrand;
  name: string;
  family: string;
  launch_quarter: LaunchQuarter;
  launch_year: number;
  cores: number;
  threads: number;
  cache_l1: number;
  cache_l2: number;
  cache_l3: number;
  tdp: number;
  lithography: number;
}
