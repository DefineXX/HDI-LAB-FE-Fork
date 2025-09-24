import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { LogoutResponse } from '@/schemas/auth';
import { logout } from '@/services/auth';
import { deleteCookie } from '@/utils/cookies';

export const useLogout = () => {
  const router = useRouter();

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      console.log('로그아웃 성공');
      // 클라이언트 쿠키 삭제
      deleteCookie('user');
      // 로그인 페이지로 리다이렉트
      router.push('/auth');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      // 에러가 발생해도 클라이언트 쿠키는 삭제
      deleteCookie('user');
      router.push('/auth');
    },
  });
};
