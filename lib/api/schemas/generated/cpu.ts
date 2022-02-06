import * as z from "zod"
import { CpuBrand, LaunchQuarter } from "@prisma/client"

export const CpuGeneratedSchema = z.object({
  id: z.number().int(),
  brand: z.nativeEnum(CpuBrand),
  name: z.string(),
  family: z.string(),
  launchQuarter: z.nativeEnum(LaunchQuarter).nullish(),
  launchYear: z.number().int().nullish(),
  cores: z.number().int(),
  threads: z.number().int(),
  frequency: z.number(),
  cache: z.number().int().nullish(),
  tdp: z.number().int().nullish(),
  lithography: z.number().int().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
