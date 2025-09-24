import '@hdi/ui/styles.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import LayoutWrapper from '@/components/layout/LayoutWrapper';
import './globals.css';

const pretendard = localFont({
  src: [
    {
      path: './fonts/PretendardVariable.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HDI LAB',
  description: 'HDI LAB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
