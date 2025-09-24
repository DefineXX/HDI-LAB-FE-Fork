import type { BrandSurveyItem } from '@/types/inbox';

const pick = <T>(arr: readonly T[], i: number): T => arr[i % arr.length]!;

export const DUMMY_BRAND_SURVEYS: BrandSurveyItem[] = Array.from(
  { length: 30 },
  (_, idx) => {
    const names = [
      '디올',
      '탬버린즈',
      '이브생로랑',
      '조말론 런던',
      '프라다 뷰티',
      '헤라',
      '샤넬',
      '논픽션',
      '이솝',
      '록시땅',
      '맥',
      '산타마리아노벨라',
      '르라보',
      '에스티로더',
      '사봉',
      '딥디크',
      '모로칸오일',
      '키엘',
      '다니엘트루스',
      '바이레도',
      '설화수',
      '버버리',
      '나스',
      '지방시',
      '아베다',
      '불리',
      '메종마르지엘라',
      '랑콤',
      '바비브라운',
      '바이오텀',
    ];
    const statuses = ['pending', 'in-progress', 'completed', 'modify'] as const;
    return {
      id: idx + 1,
      brandName: pick(names, idx),
      logoText: pick(names, idx),
      status: pick(statuses, idx),
    };
  }
);
