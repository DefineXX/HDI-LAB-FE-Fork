import { apiClient } from '@/lib/axios';
import { UserType } from '@/schemas/auth';
import {
  SurveyProductApiResponseSchema,
  type SurveyProductApiResponse,
} from '@/schemas/survey';

export const surveyService = {
  /**
   * 사용자에게 할당된 설문 제품 목록을 조회합니다.
   * @returns 설문 제품 목록
   */
  async getSurveyProducts({
    type,
  }: {
    type: UserType;
  }): Promise<SurveyProductApiResponse> {
    const response = await apiClient.get(`/survey/${type.toLowerCase()}`);

    console.log('Survey List Response:', response.data);

    try {
      // Zod 스키마로 응답 검증
      const validatedData = SurveyProductApiResponseSchema.parse(response.data);
      return validatedData;
    } catch (error) {
      console.error('Schema validation failed:', error);
      console.error(
        'Raw response data:',
        JSON.stringify(response.data, null, 2)
      );
      throw error;
    }
  },
};
