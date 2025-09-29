'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  SURVEY_STATUS_BUTTON_STYLES,
  SURVEY_STATUS_LABELS,
} from '@/constants/survey';
import type { SurveyProduct } from '@/schemas/survey';

export default function SurveyCard({ item }: { item: SurveyProduct }) {
  const { name, image, responseId, responseStatus } = item;
  const { type } = useParams();

  const numberLabel = responseId.toString().padStart(2, '0');
  const status = responseStatus;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-300 ease-out hover:shadow-md">
      {/* 번호 */}
      <span className="mb-3 block text-xs font-medium text-gray-500">
        {numberLabel}
      </span>

      {/* 이미지 영역 - 4:3 비율로 변경 */}
      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100vw"
          className="object-contain"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            // 이미지 로드 실패 시 기본 텍스트 표시
            const img = e.currentTarget;
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="text-xs font-bold text-gray-500 flex h-full w-full items-center justify-center">${item.name}</div>`;
            }
          }}
        />
      </div>

      {/* 브랜드명 */}
      <span className="mb-3 block text-sm font-medium text-gray-900">
        {name}
      </span>

      {/* 버튼 */}
      <Link
        href={`/survey/${type}/${responseId}`}
        className={`block w-full rounded px-3 py-2 text-center text-xs transition-colors ${SURVEY_STATUS_BUTTON_STYLES[status]}`}
      >
        {SURVEY_STATUS_LABELS[status]}
      </Link>
    </div>
  );
}
