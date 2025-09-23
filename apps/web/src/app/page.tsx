import { HongikUnivLogo } from '@hdi/ui';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="mb-8 text-3xl font-bold">HDI-LAB 웹사이트</h1>

      {/* UI 패키지에서 가져온 에셋 사용 예제 */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">홍익대학교 로고</h2>
        <Image
          src={HongikUnivLogo}
          alt="홍익대학교 로고"
          width={200}
          height={80}
          className="object-contain"
        />
        <p className="text-center text-gray-600">
          이 이미지는{' '}
          <code className="rounded bg-gray-100 px-2 py-1">@hdi/ui</code>{' '}
          패키지에서 공유 에셋으로 관리되고 있습니다.
        </p>
      </div>
    </div>
  );
}
