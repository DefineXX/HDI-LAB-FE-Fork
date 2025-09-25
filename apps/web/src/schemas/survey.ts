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
  image: z.url(),
  responseStatus: SurveyProductResponseStatusSchema,
  responseId: z.int64(),
});

// 설문 제품 API 응답 스키마 (임시로 유연하게 처리)
export const SurveyProductApiResponseSchema = z.unknown().transform((data) => {
  // 실제 API 응답 구조에 맞게 변환
  if (Array.isArray(data)) {
    return { data };
  }
  if (data && typeof data === 'object' && 'data' in data) {
    return data as { data: unknown };
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

// ========================
// 상품 설문 상세 스키마
// ========================

// 응답의 정확한 스펙이 확정되기 전이므로 필수 최소 필드만 엄격 검증하고 나머지는 관대하게(pass through) 처리합니다.
export const ProductDataSetResponseSchema = z.object({
  id: z.string(),
  productName: z.string(),
  companyName: z.string(),
  modelName: z.string(),
  price: z.string(),
  material: z.string(),
  size: z.string(),
  weight: z.string(),
  referenceUrl: z.url().nullable(),
  registeredAt: z.string(),
  productPath: z.url().nullable(),
  productTypeName: z.string().nullable(),
  detailImagePath: z.url().nullable(),
  frontImagePath: z.url().nullable(),
  sideImagePath: z.url().nullable(),
});

export const ProductSurveyQuestionSchema = z.object({
  index: z.int32(),
  survey: z.string(),
  response: z.int32(),
});

export const ProductTextSurveyResponseSchema = z.object({
  survey: z.string(),
  response: z.string(),
});

export const ProductSurveyDetailResponseSchema = z.object({
  productDataSetResponse: ProductDataSetResponseSchema,
  productSurveyResponse: z.object({
    surveyResponses: z.array(ProductSurveyQuestionSchema),
    textSurveyResponse: ProductTextSurveyResponseSchema,
  }),
});

export type ProductSurveyDetailResponse = z.infer<
  typeof ProductSurveyDetailResponseSchema
>;
export type ProductDataSetResponse = z.infer<
  typeof ProductDataSetResponseSchema
>;
export type ProductSurveyQuestion = z.infer<typeof ProductSurveyQuestionSchema>;
export type ProductTextSurveyResponse = z.infer<
  typeof ProductTextSurveyResponseSchema
>;
