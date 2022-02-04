import * as z from "zod"
import { CpuBrand, LaunchQuarter } from "@prisma/client"

export const CpuGeneratedSchema = z.object({
  id: z.string(),
  brand: z.nativeEnum(CpuBrand),
  name: z.string(),
  launchQuarter: z.nativeEnum(LaunchQuarter),
  launchYear: z.number().int(),
  cores: z.number().int(),
  threads: z.number().int(),
  frequency: z.number(),
  cache: z.number().int(),
  tdp: z.number().int(),
  lithography: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
