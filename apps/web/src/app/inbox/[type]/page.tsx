'use client';

import { Button } from '@/components/Button';
import SurveyCard from '@/components/SurveyCard';
import { useMe } from '@/hooks/useMe';
import { useSurveyProducts } from '@/hooks/useSurveyProducts';
import { SurveyProduct } from '@/schemas/survey';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InboxPage() {
  const router = useRouter();
  const { data: userInfo, isLoading: isMeLoading, error: meError } = useMe();
  const { userType, surveyDone } = userInfo?.data || {};
  const { data, isLoading, error, refetch } = useSurveyProducts({
    type: userType,
  });

  // 페이지 포커스 시 데이터 refetch
  useEffect(() => {
    const handleFocus = () => {
      if (userType) {
        refetch();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch, userType]);

  // 모든 설문이 완료 상태인지 확인하는 로직
  const areAllSurveysCompleted = (() => {
    if (!data?.data || !Array.isArray(data.data)) return false;
    const surveys = data.data as SurveyProduct[];
    return (
      surveys.length > 0 &&
      surveys.every((survey) => survey.responseStatus === 'DONE')
    );
  })();

  // 전체 설문 제출 버튼 활성화 조건 (모든 설문 완료 + 아직 제출 안됨)
  const isSubmitAllButtonEnabled = areAllSurveysCompleted && !surveyDone;

  // 전체 설문 제출 핸들러
  const handleSubmitAllSurveys = () => {
    if (isSubmitAllButtonEnabled) {
      // TODO: API 호출로 전체 설문 제출 및 surveyDone 상태 업데이트
      // await submitAllSurveysAPI();
      // 백엔드에서 surveyDone을 true로 변경하고 프론트엔드 상태 동기화
      console.log('전체 설문 제출');

      // 가중치 평가 페이지로 이동
      router.push(`/weight-evaluation/${userType?.toLowerCase()}`);
    }
  };

  // 가중치 평가 수정 핸들러
  const handleEditWeightEvaluation = () => {
    router.push(`/weight-evaluation/${userType?.toLowerCase()}`);
  };

  // 사용자 정보 로딩 중
  if (isMeLoading) {
    return (
      <div className="space-y-6 p-8">
        {/* 페이지 헤더와 설문 진행 상황 섹션을 같은 줄에 배치 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

          {/* 설문 진행 상황 및 전체 제출 섹션 - 사용자 정보 로딩 중 */}
          <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-400">사용자 정보 로딩 중...</div>
            <div className="animate-pulse rounded-lg bg-gray-200 px-6 py-3">
              <div className="h-4 w-24 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>

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
      <div className="space-y-6 p-8">
        {/* 페이지 헤더와 설문 진행 상황 섹션을 같은 줄에 배치 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

          {/* 설문 진행 상황 및 전체 제출 섹션 - 사용자 정보 로딩 실패 */}
          <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              사용자 정보를 불러올 수 없습니다
            </div>
            <div className="text-sm text-red-500">오류 발생</div>
          </div>
        </div>

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
      <div className="space-y-6 p-8">
        {/* 페이지 헤더와 설문 진행 상황 섹션을 같은 줄에 배치 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

          {/* 설문 진행 상황 및 전체 제출 섹션 - 로딩 중 */}
          <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              {/* 설문 개수 표시 스켈레톤 */}
              <div className="flex items-center gap-2 text-sm">
                <div className="animate-pulse">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                </div>
                <span className="text-gray-400">•</span>
                <div className="animate-pulse">
                  <div className="h-4 w-16 rounded bg-gray-200"></div>
                </div>
              </div>
              {/* 진행률 표시 스켈레톤 */}
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 animate-pulse rounded-full bg-gray-200"></div>
                <div className="animate-pulse">
                  <div className="h-3 w-6 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
            {/* 전체 설문 제출 버튼 스켈레톤 */}
            <div className="animate-pulse rounded-lg bg-gray-200 px-6 py-3">
              <div className="h-4 w-24 rounded bg-gray-300"></div>
            </div>
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
      <div className="space-y-6 p-8">
        {/* 페이지 헤더와 설문 진행 상황 섹션을 같은 줄에 배치 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

          {/* 설문 진행 상황 및 전체 제출 섹션 - 에러 상태 */}
          <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              설문 정보를 불러올 수 없습니다
            </div>
            <div className="text-sm text-red-500">오류 발생</div>
          </div>
        </div>

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
  if (!data?.data || (data.data as SurveyProduct[]).length === 0) {
    return (
      <div className="space-y-6 p-8">
        {/* 페이지 헤더와 설문 진행 상황 섹션을 같은 줄에 배치 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

          {/* 설문 진행 상황 및 전체 제출 섹션 - 데이터가 없는 경우 */}
          <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>완료된 설문: 0개</span>
                <span>•</span>
                <span>전체 설문: 0개</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-gray-200">
                  <div className="h-full w-0 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-500">0%</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              설문이 할당되지 않았습니다
            </div>
          </div>
        </div>

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

  // 설문 개수 계산
  const surveys = data.data as SurveyProduct[];
  const completedSurveysCount = surveys.filter(
    (survey) => survey.responseStatus === 'DONE'
  ).length;
  const totalSurveysCount = surveys.length;

  return (
    <div className="space-y-6 p-8">
      {/* 페이지 헤더와 설문 진행 상황 섹션을 같은 줄에 배치 */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

        {/* 설문 진행 상황 및 전체 제출 섹션 */}
        <div className="flex flex-col gap-4 rounded-lg bg-gray-50 px-6 py-4 md:flex-row md:items-center md:justify-between">
          {/* 설문 개수 표시 */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-600">완료된 설문:</span>
                <span className="font-medium text-green-600">
                  {completedSurveysCount}개
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">전체 설문:</span>
                <span className="font-medium text-gray-900">
                  {totalSurveysCount}개
                </span>
              </div>
            </div>
            {/* 진행률 표시 */}
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-300"
                  style={{
                    width: `${totalSurveysCount > 0 ? (completedSurveysCount / totalSurveysCount) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">
                {totalSurveysCount > 0
                  ? Math.round(
                      (completedSurveysCount / totalSurveysCount) * 100
                    )
                  : 0}
                %
              </span>
            </div>
          </div>

          {/* 조건부 버튼 렌더링 */}
          {surveyDone ? (
            // 최종 제출 완료 상태
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-green-700">
                  최종 제출 완료
                </span>
              </div>
              <Button
                text="가중치 평가 수정"
                onClick={handleEditWeightEvaluation}
                className="bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
                type="button"
              />
            </div>
          ) : (
            // 최종 제출 미완료 상태
            <Button
              text="전체 평가 제출"
              onClick={handleSubmitAllSurveys}
              disabled={!isSubmitAllButtonEnabled}
              className={
                isSubmitAllButtonEnabled
                  ? 'bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
                  : 'pointer-events-none bg-gray-200 px-6 py-3 text-sm font-medium text-gray-400'
              }
              type="button"
            />
          )}
        </div>
      </div>

      {/* 그리드 뷰 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {(data.data as SurveyProduct[]).map(
          (item: SurveyProduct, index: number) => (
            <SurveyCard key={item.responseId} item={item} index={index} />
          )
        )}
      </div>
    </div>
  );
}
