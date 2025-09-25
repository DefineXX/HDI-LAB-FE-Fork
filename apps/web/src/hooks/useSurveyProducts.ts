import { surveyService } from '@/services/survey';
import { useQuery } from '@tanstack/react-query';

export const useSurveyProducts = () => {
  return useQuery({
    queryKey: ['surveyProducts'],
    queryFn: surveyService.getSurveyProducts,
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};
