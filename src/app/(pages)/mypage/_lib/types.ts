import { z } from 'zod';

import { UpdateUserSchema } from './schema';

export type UpdateUserFormData = z.infer<typeof UpdateUserSchema>;
export type UpdateUserErrors = Partial<Record<keyof UpdateUserFormData, string>>;
export type UpdateUserBody = Omit<UpdateUserFormData, 'rePassword'>;
