import type { SurveyStatus } from '@/types/inbox';

/**
 * 설문 상태별 버튼 스타일 클래스
 */
export const SURVEY_STATUS_BUTTON_STYLES: Record<SurveyStatus, string> = {
  pending: 'bg-blue-600 hover:bg-blue-700 text-white',
  'in-progress': 'bg-blue-100 text-blue-700 border border-blue-300',
  completed: 'bg-gray-100 text-gray-600 border border-gray-300',
  modify: 'bg-gray-100 text-gray-600 border border-gray-300',
};

/**
 * 설문 상태별 버튼 라벨
 */
export const SURVEY_STATUS_LABELS: Record<SurveyStatus, string> = {
  pending: '설문하러 가기',
  'in-progress': '설문중',
  completed: '완료',
  modify: '수정하기',
};
