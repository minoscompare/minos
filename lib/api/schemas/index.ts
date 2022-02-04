import { z, ZodType } from 'zod';
import { CpuGeneratedSchema, GpuGeneratedSchema } from './generated';

export const CpuSchema = CpuGeneratedSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
export const GpuSchema = GpuGeneratedSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});
export type FromSchema<T extends ZodType<any, any, any>> = z.infer<T>;
