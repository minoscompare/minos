import { CpuBrand, LaunchQuarter } from '@prisma/client';
import { prismaCpuToAppCpu } from './server/data-access/cpu';

export { CpuBrand };

export type Cpu = ReturnType<typeof prismaCpuToAppCpu>;

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
