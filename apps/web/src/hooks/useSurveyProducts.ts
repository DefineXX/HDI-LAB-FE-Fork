import { UserType } from '@/schemas/auth';
import { surveyService } from '@/services/survey';
import { useQuery } from '@tanstack/react-query';

export const useSurveyProducts = ({ type }: { type: UserType | undefined }) => {
  return useQuery({
    queryKey: ['surveyProducts', type],
    queryFn: () => surveyService.getSurveyProducts({ type: type! }),
    enabled: !!type, // type이 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
};
