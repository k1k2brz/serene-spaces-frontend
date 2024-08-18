import { z } from 'zod';

import { SignupSchema } from './schema';

export type SignupFormData = z.infer<typeof SignupSchema>;
export type SignupErrors = Partial<Record<keyof SignupFormData, string>>;
export type SignupBody = Omit<SignupFormData, 'rePassword'>;
