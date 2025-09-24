import Image from 'next/image';

import { HongikUnivLogo } from '@hdi/ui';
import Link from 'next/link';

export default function Header() {
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
    </header>
  );
}
