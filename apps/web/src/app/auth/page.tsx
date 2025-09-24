'use client';

import Image from 'next/image';

import { HongikUnivLogo } from '@hdi/ui';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function AuthPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src={HongikUnivLogo}
        alt="홍익대학교 로고"
        width={200}
        className="h-auto object-contain"
        priority
      />
      <form className="w-90 flex flex-col gap-6" onSubmit={handleSubmit}>
        <section className="flex w-full flex-col gap-4">
          <Input
            type="email"
            placeholder="이메일 주소를 입력해주세요."
            className="w-full"
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="w-full"
          />
        </section>
        <Button
          text="로그인"
          onClick={() => {}}
          className="w-full bg-blue-700 text-white"
          type="submit"
        />
      </form>
    </div>
  );
}
