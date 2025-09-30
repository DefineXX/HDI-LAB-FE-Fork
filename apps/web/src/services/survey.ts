import { apiClient } from '@/lib/axios';
import { UserType } from '@/schemas/auth';
import {
  BrandSurveyDataSchema,
  ProductSurveyDataSchema,
  SurveyProductApiResponseSchema,
  SurveyResponseRequestSchema,
  type BrandSurveyDetailResponse,
  type ProductSurveyDetailResponse,
  type SurveyProductApiResponse,
  type SurveyResponseRequest,
} from '@/schemas/survey';
import {
  WeightedScoreApiResponseSchema,
  WeightedScoreRequestArraySchema,
  type WeightedScoreApiResponse,
  type WeightedScoreRequestArray,
} from '@/schemas/weight-evaluation';
import { analyzeDataStructure, safeZodParse } from '@/utils/zod';

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

    // Zod 스키마로 응답 검증
    return safeZodParse(SurveyProductApiResponseSchema, response.data, {
      operation: 'SurveyProductApiResponse validation',
      additionalInfo: {
        type,
        url: `/survey/${type.toLowerCase()}`,
      },
    });
  },
  /**
   * 제품 설문 상세 조회
   */
  async getSurveyDetail({
    type,
    productResponseId,
  }: {
    type: UserType;
    productResponseId: number;
  }): Promise<ProductSurveyDetailResponse | BrandSurveyDetailResponse> {
    const response = await apiClient.get(
      `/survey/${type.toLowerCase()}/${productResponseId}`
    );

    console.log(`${type} SurveyDetail Response:`, response.data);

    // type을 대문자로 정규화하여 비교
    const normalizedType = type.toUpperCase();

    // type에 따라 동적으로 스키마 선택
    if (normalizedType === 'PRODUCT') {
      console.log('Validating with ProductSurveyDataSchema...');
      console.log('Raw response.data:', response.data);
      console.log('response.data.data:', response.data.data);

      // data 부분만 검증
      const validatedData = safeZodParse(
        ProductSurveyDataSchema,
        response.data.data, // data 부분만 검증
        {
          operation: 'ProductSurveyData validation',
          additionalInfo: {
            type,
            normalizedType,
            dataKeys: response.data?.data
              ? Object.keys(response.data.data)
              : 'no data',
            dataStructure: analyzeDataStructure(response.data?.data),
          },
        }
      );

      // productDataSetResponse는 화면 렌더링의 핵심 데이터이므로 여기서 필수 보장
      if (!validatedData.productDataSetResponse) {
        throw new Error(
          'Missing productDataSetResponse in survey detail response'
        );
      }

      // 전체 응답 구조로 반환
      return {
        status: response.data.status,
        message: response.data.message,
        data: validatedData,
      };
    } else if (normalizedType === 'BRAND') {
      console.log('Validating with BrandSurveyDataSchema...');
      console.log('Raw response.data:', response.data);
      console.log('response.data.data:', response.data.data);
      console.log(
        'response.data.data keys:',
        response.data?.data ? Object.keys(response.data.data) : 'no data'
      );
      console.log(
        'response.data.data.brandDatasetResponse:',
        response.data?.data?.brandDatasetResponse
      );
      console.log(
        'response.data.data.brandSurveyResponse:',
        response.data?.data?.brandSurveyResponse
      );

      // data 부분만 검증
      const validatedData = safeZodParse(
        BrandSurveyDataSchema,
        response.data.data, // data 부분만 검증
        {
          operation: 'BrandSurveyData validation',
          additionalInfo: {
            type,
            normalizedType,
            dataKeys: response.data?.data
              ? Object.keys(response.data.data)
              : 'no data',
            dataStructure: analyzeDataStructure(response.data?.data),
            brandDatasetResponseExists:
              !!response.data?.data?.brandDatasetResponse,
            brandDatasetResponseKeys: response.data?.data?.brandDatasetResponse
              ? Object.keys(response.data.data.brandDatasetResponse)
              : 'no brandDatasetResponse',
          },
        }
      );

      // brandDatasetResponse는 화면 렌더링의 핵심 데이터이므로 여기서 필수 보장
      if (!validatedData.brandDatasetResponse) {
        throw new Error(
          'Missing brandDatasetResponse in survey detail response'
        );
      }

      // 전체 응답 구조로 반환
      return {
        status: response.data.status,
        message: response.data.message,
        data: validatedData,
      };
    } else {
      throw new Error(
        `Unsupported survey type: ${type} (normalized: ${normalizedType})`
      );
    }
  },

  /**
   * 설문 응답 저장 (정량 평가 또는 정성 평가)
   */
  async saveSurveyResponse({
    type,
    productResponseId,
    requestData,
  }: {
    type: UserType;
    productResponseId: number;
    requestData: SurveyResponseRequest;
  }): Promise<void> {
    // 요청 데이터 검증
    const validatedData = safeZodParse(
      SurveyResponseRequestSchema,
      requestData,
      {
        operation: 'SurveyResponseRequest validation',
        additionalInfo: {
          type,
          productResponseId,
        },
      }
    );

    const response = await apiClient.post(
      `/survey/${type.toLowerCase()}/${productResponseId}`,
      validatedData
    );

    console.log('Survey Response Save:', {
      type,
      productResponseId,
      requestData: validatedData,
      response: response.data,
    });

    return response.data;
  },

  /**
   * 설문 제출 (완료)
   */
  async submitSurvey({
    type,
    responseId,
  }: {
    type: UserType;
    responseId: number;
  }): Promise<void> {
    const response = await apiClient.post(
      `/survey/${type.toLowerCase()}/${responseId}/submit`
    );

    console.log('Survey Submit:', {
      type,
      responseId,
      response: response.data,
    });

    return response.data;
  },

  /**
   * 가중치 평가 점수 조회
   */
  async getWeightedScores(): Promise<WeightedScoreApiResponse> {
    const response = await apiClient.get('/survey/scores/weighted');

    console.log('Weighted Scores Response:', response.data);

    // Zod 스키마로 응답 검증
    return safeZodParse(WeightedScoreApiResponseSchema, response.data, {
      operation: 'WeightedScoreApiResponse validation',
      additionalInfo: {
        url: '/survey/scores/weighted',
      },
    });
  },

  /**
   * 가중치 평가 점수 제출
   */
  async submitWeightedScores(
    requestData: WeightedScoreRequestArray
  ): Promise<void> {
    // 요청 데이터 검증
    const validatedData = safeZodParse(
      WeightedScoreRequestArraySchema,
      requestData,
      {
        operation: 'WeightedScoreRequestArray validation',
      }
    );

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
