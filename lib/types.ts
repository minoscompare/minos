import { CpuBrand as PrismaCpuBrand, LaunchQuarter } from '@prisma/client';

export namespace Minos {
  export type CpuBrand = PrismaCpuBrand;

  export interface CpuSpecsCategory {
    categoryName: string;
    items: { name: string; value: string | null }[];
  }

  export interface Cpu {
    id: number;
    brand: CpuBrand;
    name: string;
    fullName: string;
    family: string;
    specs: CpuSpecsCategory[];
    createdAt: string;
    updatedAt: string;
  }

  export interface CpuTypesenseDoc {
    id: number;
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
}
