import { z } from 'zod';

export const reservationSchema = z.object({
  name: z.string().min(1, '예약자명을 입력해주세요.'),
  phone: z.string().min(10, '전화번호를 올바르게 입력해주세요.'),
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  smokingPreference: z.enum(['상관없음', '흡연', '비흡연']),
});
