import { z } from 'zod';

import { productAddSchema } from './schema';

export type ProductAddFormData = z.infer<typeof productAddSchema>;
export type ProductAddErrors = Partial<Record<keyof ProductAddFormData, string>>;
