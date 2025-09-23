import { HongikUnivLogo } from '@hdi/ui';
import Image from 'next/image';
import { Input } from '../../components/Input';

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Image
        src={HongikUnivLogo}
        alt="홍익대학교 로고"
        width={200}
        height={80}
        className="object-contain"
      />
      <section className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          // label="이메일 주소"
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          // label="비밀번호"
        />
      </section>
    </div>
  );
}
