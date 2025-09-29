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

  // 현재 설문의 인덱스 찾기 (responseId로 비교)
  const currentIndex = surveys.findIndex(
    (survey) => survey.responseId === currentSurveyId
  );

  // 이전 설문 정보
  const previousSurvey = currentIndex > 0 ? surveys[currentIndex - 1] : null;
  const canGoPrevious = previousSurvey !== null;

  // 다음 설문 정보
  const nextSurvey =
    currentIndex < surveys.length - 1 ? surveys[currentIndex + 1] : null;
  const canGoNext = nextSurvey !== null;

  // 이전 설문으로 이동 (surveyId 사용)
  const goToPrevious = () => {
    if (canGoPrevious && previousSurvey) {
      router.push(`/survey/${surveyType}/${previousSurvey.responseId}`);
    }
  };

  // 다음 설문으로 이동 (surveyId 사용)
  const goToNext = () => {
    if (canGoNext && nextSurvey) {
      router.push(`/survey/${surveyType}/${nextSurvey.responseId}`);
    }
  };

  // 설문 목록으로 돌아가기
  const goBackToList = () => {
    router.push(`/inbox/${surveyType.toLowerCase()}`);
  };

  return {
    currentSurveyId,
    currentIndex,
    totalSurveys: surveys.length,
    canGoPrevious,
    canGoNext,
    previousSurvey,
    nextSurvey,
    goToPrevious,
    goToNext,
    goBackToList,
  };
};
