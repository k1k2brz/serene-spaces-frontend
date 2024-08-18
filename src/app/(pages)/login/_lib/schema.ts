import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력하세요.' }),
  password: z.string().min(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' }),
});
