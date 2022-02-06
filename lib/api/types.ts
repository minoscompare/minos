import { CpuBrand as PrismaCpuBrand } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export type AppApiRequest = NextApiRequest;
export type AppApiResponse<T = any> = NextApiResponse<T>;

export namespace Minos {
  export type CpuBrand = PrismaCpuBrand;

  export interface CpuSpecsCategory {
    categoryName: string;
    items: { name: string; value: string | null }[];
  }

  export interface Cpu {
    id: number;
    brand: CpuBrand;
    model: string;
    fullName: string;
    family: string;
    specs: CpuSpecsCategory[];
    createdAt: string;
    updatedAt: string;
  }
}
