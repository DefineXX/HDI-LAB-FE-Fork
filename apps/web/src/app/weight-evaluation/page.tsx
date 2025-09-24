'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import WeightEvaluationHeader from '@/components/weight-evaluation/WeightEvaluationHeader';
import WeightEvaluationNavigation from '@/components/weight-evaluation/WeightEvaluationNavigation';
import WeightEvaluationSuccess from '@/components/weight-evaluation/WeightEvaluationSuccess';
import WeightEvaluationTable from '@/components/weight-evaluation/WeightEvaluationTable';

import { SurveyProgress } from '@/types/survey';
import {
  WeightEvaluationCategory,
  WeightEvaluationData,
} from '@/types/weight-evaluation';
import {
  calculateSurveyCompletionStatus,
  clearSurveyProgress,
  saveSurveyProgress,
} from '@/utils/survey';

// 임시 데이터 - 실제로는 API에서 가져올 데이터
const mockWeightEvaluationData: WeightEvaluationData = {
  factors: [
    {
      id: 'aesthetics',
      name: '심미성',
      description:
        '로고 디자인이 주는 시각적 아름다움과 감성적 만족감에 대한 정도',
    },
    {
      id: 'formative',
      name: '조형성',
      description:
        '로고 디자인이 시각적으로 얼마나 균형있고 조화롭게 느끼는지에 대한 객관·주관적 평가',
    },
    {
      id: 'originality',
      name: '독창성',
      description:
        '로고가 브랜드의 고유성을 효과적으로 드러내고 모방 가능성을 최소화하면서도 새로운 미적·상징적 가치를 제시하는 정도',
    },
    {
      id: 'usability',
      name: '사용성',
      description:
        '로고가 다양한 매체·환경에서 문제없이 변형 및 적용할 수 있는 정도',
    },
    {
      id: 'functionality',
      name: '기능성',
      description:
        '사용자가 로고를 직관적으로 이해하고 인식하며, 혼란 없이 받아들일 수 있는 정도',
    },
    {
      id: 'ethics',
      name: '윤리성',
      description:
        '디자인이 사회·문화적 책임을 통합적으로 고려하며, 준법에 위배되지 않는 정도',
    },
    {
      id: 'economy',
      name: '경제성',
      description:
        '로고가 최소한의 색상·공정으로 제작 비용을 절감하면서도 추가 수정 없이 다양한 매체·크기·환경에 재사용·확장되어 운용 비용을 낮출 수 있는 정도',
    },
    {
      id: 'purpose',
      name: '목적성',
      description:
        '브랜드 로고 또는 시각 시스템이 그 브랜드의 정체성, 가치, 사명, 혹은 의도된 메시지를 명확하고 의미 있게 전달한다고 인식하는 정도',
    },
  ],
  categories: [
    {
      id: 'cosmetics',
      name: '코스메틱',
      weights: {
        aesthetics: 5,
        formative: 70,
        originality: 5,
        usability: 0,
        functionality: 0,
        ethics: 0,
        economy: 0,
        purpose: 0,
      },
    },
    {
      id: 'fnb',
      name: 'F&B',
      weights: {
        aesthetics: 5,
        formative: 70,
        originality: 5,
        usability: 0,
        functionality: 0,
        ethics: 0,
        economy: 0,
        purpose: 0,
      },
    },
  ],
};

export default function WeightEvaluationPage() {
  const { id } = useParams();
  const surveyId = Array.isArray(id) ? id[0] : id || 'default';

  const [categories, setCategories] = useState<WeightEvaluationCategory[]>(
    mockWeightEvaluationData.categories
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [surveyProgress, setSurveyProgress] = useState<SurveyProgress | null>(
    null
  );

  // // 설문 진행 상태 불러오기
  // useEffect(() => {
  //   if (surveyId) {
  //     const progress = loadSurveyProgress(surveyId);
  //     setSurveyProgress(progress);
  //   }
  // }, [surveyId]);

  // surveyId가 유효하지 않은 경우 처리
  if (!surveyId) {
    return (
      <div className="mx-auto h-full px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex h-full flex-col items-center justify-center space-y-6 px-8 py-12">
            <div className="space-y-4 text-center">
              <h1 className="text-2xl font-bold text-gray-800">잘못된 접근</h1>
              <p className="text-lg text-gray-600">
                설문 ID가 올바르지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleWeightChange = (
    categoryId: string,
    factorId: string,
    value: number
  ) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, weights: { ...category.weights, [factorId]: value } }
          : category
      )
    );

    // 해당 카테고리의 검증 오류 제거
    if (validationErrors[categoryId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[categoryId];
        return newErrors;
      });
    }
  };

  const validateWeights = (category: WeightEvaluationCategory): boolean => {
    const total = Object.values(category.weights).reduce(
      (sum, weight) => sum + weight,
      0
    );
    return total === 100;
  };

  const handleSave = () => {
    const errors: Record<string, string> = {};

    categories.forEach((category) => {
      if (!validateWeights(category)) {
        const total = Object.values(category.weights).reduce(
          (sum, weight) => sum + weight,
          0
        );
        errors[category.id] =
          `각 카테고리별 가중치 합이 정확히 100%가 되어야 합니다. (현재: ${total}%)`;
      }
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('임시저장:', categories);
      // 임시저장 로직 구현
    }
  };

  const handleComplete = () => {
    const errors: Record<string, string> = {};

    categories.forEach((category) => {
      if (!validateWeights(category)) {
        const total = Object.values(category.weights).reduce(
          (sum, weight) => sum + weight,
          0
        );
        errors[category.id] =
          `각 카테고리별 가중치 합이 정확히 100%가 되어야 합니다. (현재: ${total}%)`;
      }
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('가중치 평가완료:', categories);

      // 설문 진행 상태 업데이트
      const updatedProgress = {
        ...surveyProgress,
        weightEvaluationData: categories.reduce(
          (acc, category) => {
            acc[category.id] = category.weights;
            return acc;
          },
          {} as Record<string, Record<string, number>>
        ),
      };

      // 테스트를 위해 설문 완료 조건을 완화 - 가중치 평가만 완료되어도 성공 상태로 이동
      if (surveyProgress) {
        const completionStatus = calculateSurveyCompletionStatus(
          surveyProgress.questionsAnswered || {},
          ['1-1', '1-2', '1-3', '1-4'], // 실제로는 설문 데이터에서 가져와야 함
          surveyProgress.qualitativeAnswer || '',
          categories
        );

        updatedProgress.completionStatus = completionStatus;

        // 테스트 모드: 가중치 평가만 완료되어도 성공 페이지 표시
        setIsCompleted(true);
        // 설문 완료 후 진행 상태 삭제
        setTimeout(() => {
          clearSurveyProgress(surveyId);
        }, 3000);

        // 원래 로직 (주석 처리)
        // if (completionStatus.isFullyCompleted) {
        //   setIsCompleted(true);
        //   // 설문 완료 후 진행 상태 삭제
        //   setTimeout(() => {
        //     clearSurveyProgress(surveyId);
        //   }, 3000);
        // } else {
        //   // 가중치 평가만 완료된 경우 설문 문항으로 돌아가기
        //   console.log('설문 문항 평가가 필요합니다.');
        //   // 실제로는 설문 문항 페이지로 리다이렉트해야 함
        // }
      } else {
        // surveyProgress가 없는 경우에도 테스트를 위해 성공 상태로 이동
        setIsCompleted(true);
        setTimeout(() => {
          clearSurveyProgress(surveyId);
        }, 3000);
      }

      saveSurveyProgress(surveyId, updatedProgress);
      setSurveyProgress(updatedProgress as SurveyProgress);
    }
  };

  const isAllValid = categories.every((category) => validateWeights(category));

  // 테스트를 위해 설문 문항 완료 검증 조건을 완화
  // if (
  //   surveyProgress &&
  //   !surveyProgress.completionStatus?.surveyQuestionsCompleted
  // ) {
  //   return (
  //     <div className="mx-auto h-full px-4 py-4 sm:px-6 lg:px-8">
  //       <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
  //         <div className="flex h-full flex-col items-center justify-center space-y-6 px-8 py-12">
  //           <div className="rounded-full bg-orange-100 p-8">
  //             <svg
  //               className="h-16 w-16 text-orange-600"
  //               fill="none"
  //               stroke="currentColor"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  //               />
  //             </svg>
  //           </div>
  //           <div className="space-y-4 text-center">
  //             <h1 className="text-2xl font-bold text-gray-800">
  //               설문 문항 평가 필요
  //             </h1>
  //             <p className="text-lg text-gray-600">
  //               가중치 평가를 진행하기 전에 먼저 설문 문항 평가를 완료해주세요.
  //             </p>
  //             <p className="text-sm text-gray-500">
  //               설문 문항 평가가 완료되어야 가중치 평가를 진행할 수 있습니다.
  //             </p>
  //           </div>
  //           <button
  //             onClick={() => window.history.back()}
  //             className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  //           >
  //             설문 문항으로 돌아가기
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // 완료 상태일 때 성공 페이지 표시
  if (isCompleted) {
    return (
      <div className="mx-auto h-full px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <WeightEvaluationSuccess />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto h-full px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        {/* 헤더 */}
        <WeightEvaluationHeader />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 overflow-hidden p-4 sm:p-6">
          <WeightEvaluationTable
            factors={mockWeightEvaluationData.factors}
            categories={categories}
            validationErrors={validationErrors}
            onWeightChange={handleWeightChange}
          />
        </div>

        {/* 하단 네비게이션 */}
        <div className="inset-shadow-sm flex-shrink-0 border-t border-gray-100 bg-gray-50/80 px-4 py-3 sm:px-6 sm:py-4">
          <WeightEvaluationNavigation
            onSave={handleSave}
            onComplete={handleComplete}
            canComplete={isAllValid}
          />
        </div>
      </div>
    </div>
  );
}
