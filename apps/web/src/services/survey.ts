import { apiClient } from '@/lib/axios';
import {
  SurveyProductApiResponseSchema,
  type SurveyProductApiResponse,
} from '@/schemas/survey';

export const surveyService = {
  /**
   * 사용자에게 할당된 설문 제품 목록을 조회합니다.
   * @returns 설문 제품 목록
   */
  async getSurveyProducts(): Promise<SurveyProductApiResponse> {
    const response = await apiClient.get('/survey/product');

    console.log('SurveyProducts Response:', response.data);

    // Zod 스키마로 응답 검증
    const validatedData = SurveyProductApiResponseSchema.parse(response.data);
    return validatedData;
  },
};
