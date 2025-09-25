'use client';

import BrandSurveyCard from '@/components/BrandSurveyCard';
import { Button } from '@/components/Button';
import { useMe } from '@/hooks/useMe';
import { useSurveyProducts } from '@/hooks/useSurveyProducts';
import { SurveyProduct } from '@/schemas/survey';

export default function InboxPage() {
  const { data: userInfo, isLoading: isMeLoading, error: meError } = useMe();
  const { userType, surveyDone } = userInfo?.data || {};
  const { data, isLoading, error } = useSurveyProducts({
    type: userType,
  });

  // surveyDone 타입 가드 및 boolean 변환 - undefined/null 안전 처리
  const isSurveyCompleted = (() => {
    if (surveyDone === null || surveyDone === undefined) return false;
    return surveyDone === true;
  })();

  // 전체 설문 제출 핸들러
  const handleSubmitAllSurveys = () => {
    // TODO: 전체 설문 제출 로직 구현
    console.log('전체 설문 제출');
  };

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
        {/* 전체 설문 제출 버튼 스켈레톤 */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-900">설문함</h1>
          <div className="animate-pulse rounded-lg bg-gray-200 px-6 py-3">
            <div className="h-4 w-24 rounded bg-gray-300"></div>
          </div>
        </div>

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
      {/* 전체 설문 제출 버튼 - 데이터가 정상적으로 로드된 경우에만 표시 */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-900">설문함</h1>
        <Button
          text="전체 설문 제출"
          onClick={handleSubmitAllSurveys}
          disabled={!isSurveyCompleted}
          className={
            isSurveyCompleted
              ? 'bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
              : 'pointer-events-none bg-gray-200 px-6 py-3 text-sm font-medium text-gray-400'
          }
          type="button"
        />
      </div>

      {/* 그리드 뷰 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {data.data.map((item: SurveyProduct) => (
          <BrandSurveyCard key={item.responseId} item={item} />
        ))}
      </div>
    </div>
  );
}
