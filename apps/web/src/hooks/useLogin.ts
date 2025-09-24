import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { LoginRequest, LoginResponse } from '@/schemas/auth';
import { login } from '@/services/auth';
import { setCookie } from '@/utils/cookies';

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      // 서버에서 쿠키로 토큰을 설정하므로 클라이언트에서는 사용자 정보만 저장
      // 토큰은 서버에서 HttpOnly 쿠키로 설정되어 자동으로 전송됨
      setCookie('user', JSON.stringify(data.data), 7); // 7일간 유지

      // 성공 후 inbox로 리다이렉트
      router.push('/inbox');
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};
