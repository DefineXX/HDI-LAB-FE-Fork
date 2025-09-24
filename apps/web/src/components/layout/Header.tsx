'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { HongikUnivLogo } from '@hdi/ui';
import Link from 'next/link';

import { Button } from '@/components/Button';
import { useLogout } from '@/hooks/useLogout';
import { User } from '@/schemas/auth';
import { getUserFromCookie, isAuthenticated } from '@/utils/cookies';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const logoutMutation = useLogout();

  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticated = isAuthenticated();
      const userData = getUserFromCookie();
      setIsLoggedIn(authenticated);
      setUser(userData);
    };

    checkAuthStatus();

    // 쿠키 변경 감지를 위한 이벤트 리스너
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="h-19 fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-xl">
      <Link href="/inbox">
        <Image
          src={HongikUnivLogo}
          alt="홍익대학교 로고"
          width={120}
          className="h-auto object-contain"
          priority
        />
      </Link>

      {isLoggedIn && user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            안녕하세요, <span className="font-bold">{user.name}</span>님
          </span>
          <Button
            text={logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
            onClick={handleLogout}
            className="bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700 disabled:bg-gray-400"
            disabled={logoutMutation.isPending}
          />
        </div>
      )}
    </header>
  );
}
