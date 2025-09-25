import type { SurveyProductResponseStatus } from '@/schemas/survey';

/**
 * 설문 제품 응답 상태별 버튼 스타일 클래스
 */
export const SURVEY_STATUS_BUTTON_STYLES: Record<
  SurveyProductResponseStatus,
  string
> = {
  NOT_STARTED: 'bg-blue-600 hover:bg-blue-700 text-white',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border border-blue-300',
  DONE: 'bg-gray-100 text-gray-600 border border-gray-300',
};

/**
 * 설문 제품 응답 상태별 버튼 라벨
 */
export const SURVEY_STATUS_LABELS: Record<SurveyProductResponseStatus, string> =
  {
    NOT_STARTED: '설문하러 가기',
    IN_PROGRESS: '설문중',
    DONE: '완료',
  };
