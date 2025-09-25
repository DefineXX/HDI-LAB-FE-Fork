import '@hdi/ui/styles.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import LayoutWrapper from '@/components/layout/LayoutWrapper';
import QueryProvider from '@/components/providers/QueryProvider';
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
        <QueryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
