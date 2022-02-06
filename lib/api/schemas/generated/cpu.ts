import * as z from "zod"
import { CpuBrand, LaunchQuarter } from "@prisma/client"

export const CpuGeneratedSchema = z.object({
  /**
   * CPU unique identifier
   */
  id: z.number().int(),
  /**
   * Brand Name
   */
  brand: z.nativeEnum(CpuBrand),
  /**
   * Model Name
   */
  name: z.string(),
  /**
   * Family Name
   */
  family: z.string(),
  /**
   * Launch Quarter
   */
  launchQuarter: z.nativeEnum(LaunchQuarter).nullish(),
  /**
   * Launch Year
   */
  launchYear: z.number().int().nullish(),
  /**
   * Number of Cores
   */
  cores: z.number().int(),
  /**
   * Number of Threads
   */
  threads: z.number().int(),
  /**
   * Frequency in GHz * 100,
   * floating point number stored as an int with 2 digits after decimal point
   * i.e. 3.61 is stored as 361
   */
  frequency: z.number().int(),
  /**
   * L1 Cache in KB
   */
  cacheL1: z.number().int().nullish(),
  /**
   * L2 Cache in KB
   */
  cacheL2: z.number().int().nullish(),
  /**
   * L3 Cache in KB
   */
  cacheL3: z.number().int().nullish(),
  /**
   * TDP in Watts (W)
   */
  tdp: z.number().int().nullish(),
  /**
   * Lithography in nm
   */
  lithography: z.number().int().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
