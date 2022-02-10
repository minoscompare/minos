import { z } from 'zod';
import { CpuBrand, LaunchQuarter } from '@prisma/client';

export const CpuSchema = z.object({
  brand: z.nativeEnum(CpuBrand),
  name: z.string(),
  family: z.string(),
  launchQuarter: z.nativeEnum(LaunchQuarter).nullish(),
  launchYear: z.number().int().nullish(),
  cores: z.number().int(),
  threads: z.number().int(),
  frequency: z.number().int(),
  cacheL1: z.number().int().nullish(),
  cacheL2: z.number().int().nullish(),
  cacheL3: z.number().int().nullish(),
  tdp: z.number().int().nullish(),
  lithography: z.number().int().nullish(),
});
