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
  responseId: z.int64(),
});

// 설문 제품 API 응답 스키마
export const SurveyProductApiResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(SurveyProductSchema),
});

// 타입 추출
export type SurveyProductResponseStatus = z.infer<
  typeof SurveyProductResponseStatusSchema
>;
export type SurveyProduct = z.infer<typeof SurveyProductSchema>;
export type SurveyProductApiResponse = z.infer<
  typeof SurveyProductApiResponseSchema
>;
