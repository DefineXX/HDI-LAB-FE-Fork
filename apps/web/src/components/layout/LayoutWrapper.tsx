'use client';

import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import Header from './Header';

// Header를 숨겨야 하는 라우트들
const HIDE_HEADER_ROUTES = ['/auth'];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 현재 경로가 Header를 숨겨야 하는 라우트인지 확인
  const shouldHideHeader = HIDE_HEADER_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideHeader && <Header />}
      <main className={clsx(shouldHideHeader ? 'p-0' : 'pt-19 pb-4')}>
        {children}
      </main>
    </>
  );
}
