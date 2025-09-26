import { UserType } from '@/schemas/auth';
import { type SurveyResponseRequest } from '@/schemas/survey';
import { type WeightedScoreRequestArray } from '@/schemas/weight-evaluation';
import { surveyService } from '@/services/survey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSurveyProducts = ({ type }: { type: UserType | undefined }) => {
  return useQuery({
    queryKey: ['surveyProducts', type],
    queryFn: () => surveyService.getSurveyProducts({ type: type! }),
    enabled: !!type, // type이 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};

export const useProductSurveyDetail = ({
  type,
  productResponseId,
}: {
  type: UserType;
  productResponseId: number | undefined;
}) => {
  return useQuery({
    queryKey: ['surveyDetail', productResponseId],
    queryFn: () =>
      surveyService.getSurveyDetail({
        type,
        productResponseId: productResponseId!,
      }),
    enabled: typeof productResponseId === 'number' && !!type,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSaveSurveyResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productResponseId,
      requestData,
    }: {
      productResponseId: number;
      requestData: SurveyResponseRequest;
    }) =>
      surveyService.saveSurveyResponse({
        productResponseId,
        requestData,
      }),
    onSuccess: (_, variables) => {
      // 설문 상세 데이터를 다시 fetch하여 최신 상태로 업데이트
      queryClient.invalidateQueries({
        queryKey: ['surveyDetail', variables.productResponseId],
      });
    },
    onError: (error) => {
      console.error('설문 응답 저장 실패:', error);
    },
  });
};

export const useSubmitWeightedScores = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData: WeightedScoreRequestArray) =>
      surveyService.submitWeightedScores(requestData),
    onSuccess: () => {
      // 가중치 평가 제출 성공 시 관련 쿼리들을 무효화할 수 있음
      // 필요에 따라 추가적인 캐시 무효화 로직을 구현할 수 있음
      console.log('가중치 평가 제출 성공');
    },
    onError: (error) => {
      console.error('가중치 평가 제출 실패:', error);
    },
  });
};
