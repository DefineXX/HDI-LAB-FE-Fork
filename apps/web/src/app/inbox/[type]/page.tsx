'use client';

import BrandSurveyCard from '@/components/BrandSurveyCard';
import { Button } from '@/components/Button';
import { useMe } from '@/hooks/useMe';
import { useSurveyProducts } from '@/hooks/useSurveyProducts';
import { SurveyProduct } from '@/schemas/survey';
import { useState } from 'react';

export default function InboxPage() {
  const { data: userInfo, isLoading: isMeLoading, error: meError } = useMe();
  const { userType } = userInfo?.data || {};
  const { data, isLoading, error } = useSurveyProducts({
    type: userType,
  });

  // 전체 설문 제출 상태 관리
  const [isAllSurveysSubmitted, setIsAllSurveysSubmitted] = useState(false);

  // surveyDone 타입 가드 및 boolean 변환 - undefined/null 안전 처리
  // TODO: 추후 백엔드 API와 연동 시 사용 예정
  // const isSurveyCompleted = (() => {
  //   if (surveyDone === null || surveyDone === undefined) return false;
  //   return surveyDone === true;
  // })();

  // 모든 설문이 완료 상태인지 확인하는 로직
  const areAllSurveysCompleted = (() => {
    if (!data?.data || !Array.isArray(data.data)) return false;
    const surveys = data.data as SurveyProduct[];
    return (
      surveys.length > 0 &&
      surveys.every((survey) => survey.responseStatus === 'DONE')
    );
  })();

  // 전체 설문 제출 버튼 활성화 조건
  const isSubmitAllButtonEnabled =
    areAllSurveysCompleted && !isAllSurveysSubmitted;

  // 전체 설문 제출 핸들러
  const handleSubmitAllSurveys = () => {
    if (isSubmitAllButtonEnabled) {
      // TODO: API 호출로 전체 설문 제출 및 surveyDone 상태 업데이트
      // await submitAllSurveysAPI();
      // 백엔드에서 surveyDone을 true로 변경하고 프론트엔드 상태 동기화
      console.log('전체 설문 제출');
      setIsAllSurveysSubmitted(true);
    }
  };

  // 전체 설문 제출 상태 토글 핸들러
  const handleToggleSubmitStatus = () => {
    // TODO: API 호출로 surveyDone 상태 토글
    // await toggleSurveyDoneAPI(!isAllSurveysSubmitted);
    // 백엔드에서 surveyDone을 토글하고 프론트엔드 상태 동기화
    setIsAllSurveysSubmitted((prev) => !prev);
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
  if (!data?.data || (data.data as SurveyProduct[]).length === 0) {
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
        {/* 전체 설문 제출 버튼 */}
        <Button
          text={isAllSurveysSubmitted ? '제출 완료' : '전체 설문 제출'}
          onClick={
            isAllSurveysSubmitted
              ? handleToggleSubmitStatus
              : handleSubmitAllSurveys
          }
          disabled={!isSubmitAllButtonEnabled && !isAllSurveysSubmitted}
          className={
            isAllSurveysSubmitted
              ? 'bg-gray-200 px-6 py-3 text-sm font-medium text-gray-400 shadow-inner transition-colors'
              : isSubmitAllButtonEnabled
                ? 'bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
                : 'pointer-events-none bg-gray-200 px-6 py-3 text-sm font-medium text-gray-400'
          }
          type="button"
        />
      </div>

      {/* 그리드 뷰 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {(data.data as SurveyProduct[]).map((item: SurveyProduct) => (
          <BrandSurveyCard key={item.responseId} item={item} />
        ))}
      </div>
    </div>
  );
}
