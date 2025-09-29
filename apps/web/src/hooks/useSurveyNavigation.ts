import { useParams, useRouter } from 'next/navigation';

import { SurveyProduct } from '@/schemas/survey';

import { useMe } from './useMe';
import { useSurveyProducts } from './useSurveyProducts';

export const useSurveyNavigation = () => {
  const router = useRouter();
  const params = useParams();
  const currentSurveyId = BigInt(params.id as string);
  const surveyType = params.type as string;

  const { data: userInfo } = useMe();
  const { userType } = userInfo?.data || {};

  const { data: surveysData } = useSurveyProducts({ type: userType });
  const surveys = (surveysData?.data as SurveyProduct[]) || [];

  // 설문 목록을 responseId 순서대로 정렬
  const sortedSurveys = [...surveys].sort((a, b) => {
    // responseId를 숫자로 변환하여 비교
    const aId =
      typeof a.responseId === 'bigint' ? Number(a.responseId) : a.responseId;
    const bId =
      typeof b.responseId === 'bigint' ? Number(b.responseId) : b.responseId;
    return aId - bId;
  });

  // 현재 설문의 인덱스 찾기 (정렬된 배열에서 responseId로 비교)
  const currentIndex = sortedSurveys.findIndex((survey) => {
    const surveyId =
      typeof survey.responseId === 'bigint'
        ? Number(survey.responseId)
        : survey.responseId;
    const currentId = Number(currentSurveyId);
    return surveyId === currentId;
  });

  // 디버깅을 위한 로그 (클라이언트 사이드에서만)
  if (typeof window !== 'undefined') {
    console.log('Survey Navigation Debug:', {
      currentSurveyId: currentSurveyId.toString(),
      surveyType,
      totalSurveys: surveys.length,
      sortedSurveyIds: sortedSurveys.map((s) => {
        if (typeof s.responseId === 'bigint') {
          return s.responseId.toString();
        }
        return String(s.responseId);
      }),
      currentIndex,
      currentSurvey: sortedSurveys[currentIndex]?.name || 'Not found',
    });
  }

  // 이전 설문 정보
  const previousSurvey =
    currentIndex > 0 ? sortedSurveys[currentIndex - 1] : null;
  const canGoPrevious = previousSurvey !== null;

  // 다음 설문 정보
  const nextSurvey =
    currentIndex < sortedSurveys.length - 1
      ? sortedSurveys[currentIndex + 1]
      : null;
  const canGoNext = nextSurvey !== null;

  // 이전 설문으로 이동 (responseId 사용)
  const goToPrevious = () => {
    if (canGoPrevious && previousSurvey) {
      const previousId =
        typeof previousSurvey.responseId === 'bigint'
          ? previousSurvey.responseId.toString()
          : String(previousSurvey.responseId);
      router.push(`/survey/${surveyType}/${previousId}`);
    }
  };

  // 다음 설문으로 이동 (responseId 사용)
  const goToNext = () => {
    if (canGoNext && nextSurvey) {
      const nextId =
        typeof nextSurvey.responseId === 'bigint'
          ? nextSurvey.responseId.toString()
          : String(nextSurvey.responseId);
      router.push(`/survey/${surveyType}/${nextId}`);
    }
  };

  // 설문 목록으로 돌아가기
  const goBackToList = () => {
    router.push(`/inbox/${surveyType.toLowerCase()}`);
  };

  return {
    currentSurveyId,
    currentIndex,
    totalSurveys: sortedSurveys.length,
    canGoPrevious,
    canGoNext,
    previousSurvey,
    nextSurvey,
    goToPrevious,
    goToNext,
    goBackToList,
    sortedSurveys, // 정렬된 설문 목록도 반환
  };
};
