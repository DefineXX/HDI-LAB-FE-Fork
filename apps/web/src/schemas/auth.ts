import { z } from 'zod';

// 사용자 정보 스키마
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
});

// 로그인 요청 스키마
export const LoginRequestSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

// 로그인 응답 스키마
export const LoginResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: UserSchema,
});

// 로그아웃 응답 스키마
export const LogoutResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
});

// 타입 추출
export type User = z.infer<typeof UserSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;
