import { z } from 'zod';

import { userRole } from '@/app/_configs';

const UserRoleEnum = z.enum(Object.values(userRole) as [string, ...string[]]);

export const UpdateUserSchema = z
  .object({
    email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
    password: z.string().min(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' }),
    rePassword: z.string(),
    companyName: z.string().optional(),
    role: UserRoleEnum,
  })
  .refine((data) => data.password === data.rePassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['rePassword'],
  });
