import * as z from "zod"
import { GpuBrand, GpuReseller, LaunchQuarter } from "@prisma/client"

export const GpuGeneratedSchema = z.object({
  id: z.number().int(),
  brand: z.nativeEnum(GpuBrand),
  name: z.string(),
  reseller: z.nativeEnum(GpuReseller),
  launchQuarter: z.nativeEnum(LaunchQuarter),
  launchYear: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
