import { z } from 'zod';

// 설문 제품 응답 상태 스키마 (실제 API 스펙에 맞게 수정)
export const SurveyProductResponseStatusSchema = z.enum([
  'NOT_STARTED',
  'IN_PROGRESS',
  'DONE',
]);

// 설문 제품 스키마
export const SurveyProductSchema = z.object({
  name: z.string(),
  image: z.string(),
  responseStatus: SurveyProductResponseStatusSchema,
  responseId: z.number(), // z.int64()에서 z.number()로 변경
});

// 설문 제품 API 응답 스키마 (임시로 유연하게 처리)
export const SurveyProductApiResponseSchema = z.any().transform((data) => {
  // 실제 API 응답 구조에 맞게 변환
  if (Array.isArray(data)) {
    return { data };
  }
  if (data && data.data) {
    return data;
  }
  return { data: [] };
});

// 타입 추출
export type SurveyProductResponseStatus = z.infer<
  typeof SurveyProductResponseStatusSchema
>;
export type SurveyProduct = z.infer<typeof SurveyProductSchema>;
export type SurveyProductApiResponse = z.infer<
  typeof SurveyProductApiResponseSchema
>;
