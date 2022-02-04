import { CpuGeneratedSchema, GpuGeneratedSchema } from './generated';

export const CpuSchema = CpuGeneratedSchema.omit({
  updatedAt: true,
  createdAt: true,
});
export const GpuSchema = GpuGeneratedSchema.omit({
  updatedAt: true,
  createdAt: true,
});
