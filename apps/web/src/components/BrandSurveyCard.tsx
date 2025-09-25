import Image from 'next/image';
import Link from 'next/link';

import {
  SURVEY_STATUS_BUTTON_STYLES,
  SURVEY_STATUS_LABELS,
} from '@/constants/survey';
import type { SurveyProduct } from '@/schemas/survey';

export default function BrandSurveyCard({ item }: { item: SurveyProduct }) {
  const numberLabel = item.responseId.toString().padStart(2, '0');
  const status = item.responseStatus;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-300 ease-out hover:shadow-md">
      {/* 번호 */}
      <span className="mb-3 block text-xs font-medium text-gray-500">
        {numberLabel}
      </span>

      {/* 이미지 영역 */}
      <div className="mb-3 flex h-20 w-full items-center justify-center overflow-hidden rounded bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="object-contain"
          onError={(e) => {
            // 이미지 로드 실패 시 기본 텍스트 표시
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="text-xs font-bold text-gray-500">${item.name}</div>`;
            }
          }}
        />
      </div>

      {/* 브랜드명 */}
      <span className="mb-3 block text-sm font-medium text-gray-900">
        {item.name}
      </span>

      {/* 버튼 */}
      <Link
        href={`/survey/${item.responseId}`}
        className={`block w-full rounded px-3 py-2 text-center text-xs transition-colors ${SURVEY_STATUS_BUTTON_STYLES[status]}`}
      >
        {SURVEY_STATUS_LABELS[status]}
      </Link>
    </div>
  );
}
