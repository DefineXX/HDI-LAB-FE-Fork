import { apiClient } from '@/lib/axios';
import { UserType } from '@/schemas/auth';
import {
  ProductSurveyDetailResponseSchema,
  SurveyProductApiResponseSchema,
  SurveyResponseRequestSchema,
  type ProductSurveyDetailResponse,
  type SurveyProductApiResponse,
  type SurveyResponseRequest,
} from '@/schemas/survey';
import {
  WeightedScoreRequestArraySchema,
  type WeightedScoreRequestArray,
} from '@/schemas/weight-evaluation';

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
  /**
   * 제품 설문 상세 조회
   */
  async getProductSurveyDetail({
    type,
    productResponseId,
  }: {
    type: UserType;
    productResponseId: number;
  }): Promise<ProductSurveyDetailResponse> {
    const response = await apiClient.get(
      `/survey/${type.toLowerCase()}/${productResponseId}`
    );

    console.log(`${type} SurveyDetail Response:`, response.data);

    try {
      const parsed = ProductSurveyDetailResponseSchema.parse(
        response.data.data
      );
      // productDataSetResponse는 화면 렌더링의 핵심 데이터이므로 여기서 필수 보장
      if (!parsed.productDataSetResponse) {
        throw new Error(
          'Missing productDataSetResponse in survey detail response'
        );
      }
      return parsed;
    } catch (error) {
      console.error('ProductSurveyDetail schema validation failed:', error);
      console.error(
        'Raw response data:',
        JSON.stringify(response.data, null, 2)
      );
      throw error;
    }
  },

  /**
   * 설문 응답 저장 (정량 평가 또는 정성 평가)
   */
  async saveSurveyResponse({
    productResponseId,
    requestData,
  }: {
    productResponseId: number;
    requestData: SurveyResponseRequest;
  }): Promise<void> {
    // 요청 데이터 검증
    const validatedData = SurveyResponseRequestSchema.parse(requestData);

    const response = await apiClient.post(
      `/survey/product/${productResponseId}`,
      validatedData
    );

    console.log('Survey Response Save:', {
      productResponseId,
      requestData: validatedData,
      response: response.data,
    });

    return response.data;
  },

  /**
   * 가중치 평가 점수 제출
   */
  async submitWeightedScores(
    requestData: WeightedScoreRequestArray
  ): Promise<void> {
    // 요청 데이터 검증
    const validatedData = WeightedScoreRequestArraySchema.parse(requestData);

    const response = await apiClient.post(
      '/survey/scores/weighted',
      validatedData
    );

    console.log('Weighted Scores Submit:', {
      requestData: validatedData,
      response: response.data,
    });

    return response.data;
  },
};
