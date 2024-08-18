import { z } from 'zod';

import { LoginSchema } from './schema';

export type LoginFormData = z.infer<typeof LoginSchema>;
export type LoginErrors = Partial<Record<keyof LoginFormData, string>>;
