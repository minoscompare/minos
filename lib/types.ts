import { CpuBrand as PrismaCpuBrand } from '@prisma/client';

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
}
