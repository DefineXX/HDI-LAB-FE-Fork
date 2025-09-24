import Link from 'next/link';

import {
  SURVEY_STATUS_BUTTON_STYLES,
  SURVEY_STATUS_LABELS,
} from '@/constants/survey';
import type { BrandSurveyItem } from '@/types/inbox';

export default function BrandSurveyCard({ item }: { item: BrandSurveyItem }) {
  const numberLabel = item.id.toString().padStart(2, '0');

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-300 ease-out hover:shadow-md">
      {/* 번호 */}
      <span className="mb-3 block text-xs font-medium text-gray-500">
        {numberLabel}
      </span>

      {/* 로고 영역 (임시 텍스트 로고) */}
      <div className="mb-3 flex h-20 w-full items-center justify-center rounded bg-black">
        <div className="text-xs font-bold text-white">{item.logoText}</div>
      </div>

      {/* 브랜드명 */}
      <span className="mb-3 block text-sm font-medium text-gray-900">
        {item.brandName}
      </span>

      {/* 버튼 */}
      <Link
        href={`/survey/${item.id}`}
        className={`block w-full rounded px-3 py-2 text-center text-xs transition-colors ${SURVEY_STATUS_BUTTON_STYLES[item.status]}`}
      >
        {SURVEY_STATUS_LABELS[item.status]}
      </Link>
    </div>
  );
}
