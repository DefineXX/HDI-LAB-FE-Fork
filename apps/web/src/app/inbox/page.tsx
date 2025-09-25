'use client';

import BrandSurveyCard from '@/components/BrandSurveyCard';
import { useMe } from '@/hooks/useMe';
import { useSurveyProducts } from '@/hooks/useSurveyProducts';

export default function InboxPage() {
  const { isLoading: isMeLoading, error: meError } = useMe();
  const { data, isLoading, error } = useSurveyProducts();

  // 사용자 정보 로딩 중
  if (isMeLoading) {
    return (
      <div className="space-y-6 px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">설문함</h1>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <p className="text-gray-500">사용자 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 사용자 정보 로딩 실패
  if (meError) {
    return (
      <div className="space-y-6 px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">설문함</h1>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-red-500">
              사용자 정보를 불러올 수 없습니다.
            </p>
            <p className="text-sm text-gray-500">잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  // 설문 데이터 로딩 중
  if (isLoading) {
    return (
      <div className="space-y-6 px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">설문함</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="mb-3 h-4 w-8 rounded bg-gray-200"></div>
              <div className="mb-3 h-20 w-full rounded bg-gray-200"></div>
              <div className="mb-3 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-8 w-full rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 설문 데이터 로딩 실패
  if (error) {
    return (
      <div className="space-y-6 px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">설문함</h1>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-red-500">
              데이터를 불러오는 중 오류가 발생했습니다.
            </p>
            <p className="text-sm text-gray-500">잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  // 설문 데이터가 없는 경우
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="space-y-6 px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900">설문함</h1>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-gray-500">할당된 설문이 없습니다.</p>
            <p className="text-sm text-gray-400">
              새로운 설문이 할당되면 여기에 표시됩니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

      {/* 그리드 뷰 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {data.data.map((item) => (
          <BrandSurveyCard key={item.responseId} item={item} />
        ))}
      </div>
    </div>
  );
}
