'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ProductImage from '@/components/survey/ProductImage';
import ProductInfo from '@/components/survey/ProductInfo';
import QualitativeEvaluation from '@/components/survey/QualitativeEvaluation';
import SurveyHeader from '@/components/survey/SurveyHeader';
import SurveyNavigationWithArrows from '@/components/survey/SurveyNavigationWithArrows';
import SurveyQuestion from '@/components/survey/SurveyQuestion';
import { useSurveyNavigation } from '@/hooks/useSurveyNavigation';
import {
  useSaveSurveyResponse,
  useSubmitSurvey,
} from '@/hooks/useSurveyProducts';
import { UserType } from '@/schemas/auth';
import {
  type BrandSurveyDetailResponse,
  type BrandSurveyQuestion,
} from '@/schemas/survey';
import { saveSurveyProgress } from '@/utils/survey';

interface BrandSurveyProps {
  surveyId: string;
  detail: BrandSurveyDetailResponse;
}

export default function BrandSurvey({ surveyId, detail }: BrandSurveyProps) {
  const router = useRouter();
  const { type } = useParams();
  const surveyType = (type as string).toUpperCase() as UserType;

  // 설문 네비게이션 훅 사용
  const {
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    currentIndex,
    totalSurveys,
  } = useSurveyNavigation();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qualitativeAnswer, setQualitativeAnswer] = useState<string>('');
  const [savingQuestions, setSavingQuestions] = useState<Set<string>>(
    new Set()
  );
  const [isSavingQualitative, setIsSavingQualitative] = useState(false);

  const brand = detail.data.brandDatasetResponse;
  const questions: BrandSurveyQuestion[] =
    detail.data.brandSurveyResponse?.response ?? [];

  // 서버에서 받아온 데이터를 클라이언트 상태에 반영
  useEffect(() => {
    if (!detail.data.brandSurveyResponse?.response) return;

    const serverAnswers: Record<string, number> = {};

    detail.data.brandSurveyResponse.response.forEach((question) => {
      if (question.response && question.response > 0 && question.index) {
        serverAnswers[String(question.index)] = question.response;
      }
    });

    setAnswers(serverAnswers);

    // 정성평가 응답도 서버 데이터에서 초기화
    if (detail.data.brandSurveyResponse?.textResponse?.response) {
      setQualitativeAnswer(
        detail.data.brandSurveyResponse.textResponse.response
      );
    }
  }, [detail]);

  // 설문 응답 저장 mutation
  const saveSurveyResponseMutation = useSaveSurveyResponse();

  // 설문 제출 mutation
  const submitSurveyMutation = useSubmitSurvey();

  // 정량평가 저장 핸들러
  const handleQuantitativeSave = async (questionId: string, value: number) => {
    setSavingQuestions((prev) => new Set(prev).add(questionId));

    try {
      await saveSurveyResponseMutation.mutateAsync({
        type: surveyType,
        productResponseId: Number(surveyId), // API는 여전히 productResponseId 필드를 사용
        requestData: {
          index: Number(questionId),
          response: value,
          textResponse: null,
        },
      });
    } catch (error) {
      console.error('정량평가 저장 실패:', error);
    } finally {
      setSavingQuestions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
  };

  // 정성평가 저장 핸들러
  const handleQualitativeSave = async (textResponse: string) => {
    setIsSavingQualitative(true);

    try {
      await saveSurveyResponseMutation.mutateAsync({
        type: surveyType,
        productResponseId: Number(surveyId), // API는 여전히 productResponseId 필드를 사용
        requestData: {
          index: null,
          response: null,
          textResponse,
        },
      });
    } catch (error) {
      console.error('정성평가 저장 실패:', error);
    } finally {
      setIsSavingQualitative(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 로컬 스토리지에도 저장 (백업용)
    saveSurveyProgress(surveyId, {
      questionsAnswered: { ...answers, [questionId]: value },
      qualitativeAnswer,
    });
  };

  const handleQualitativeChange = (value: string) => {
    setQualitativeAnswer(value);

    // 로컬 스토리지에도 저장 (백업용)
    saveSurveyProgress(surveyId, {
      questionsAnswered: answers,
      qualitativeAnswer: value,
    });
  };

  const handleComplete = async () => {
    console.log('브랜드 설문 평가완료:', { answers, qualitativeAnswer });

    try {
      // 설문 제출 API 호출
      await submitSurveyMutation.mutateAsync({
        type: surveyType,
        responseId: Number(surveyId),
      });

      // 설문 진행 상태 저장
      if (surveyId) {
        saveSurveyProgress(surveyId, {
          questionsAnswered: answers,
          qualitativeAnswer,
        });
      }

      // 설문함 페이지로 돌아가기
      router.push(`/inbox/${surveyType.toLowerCase()}`);
    } catch (error) {
      console.error('설문 제출 실패:', error);
      // 에러 처리 로직 추가 가능
    }
  };

  const isAllAnswered = questions.every((q) => {
    const key = String(q.index);
    return (q.response && q.response > 0) || answers[key] !== undefined;
  });

  // 정성평가 유효성 검사
  const currentQualitativeValue =
    detail.data.brandSurveyResponse?.textResponse?.response ||
    qualitativeAnswer;
  const isQualitativeValid = currentQualitativeValue.length >= 300;

  return (
    <div className="mx-auto h-full px-8 py-6">
      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 왼쪽 섹션 - 로고 정보 */}
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
            <h2 className="mb-1 text-lg font-semibold text-gray-800">
              로고 정보
            </h2>
            <p className="text-sm text-gray-600">로고 상세 정보</p>
          </div>
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 flex-1 space-y-6 overflow-y-auto p-6">
            <ProductInfo type="brand" data={brand} />

            {/* 브랜드 이미지 */}
            {brand.image && (
              <div className="space-y-4">
                <ProductImage imagePath={brand.image} label="로고 이미지" />
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 섹션 - 설문지 */}
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              로고 평가 설문
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              로고 디자인에 대한 평가를 진행해주세요
            </p>
          </div>

          {/* 스크롤 가능한 설문 내용 영역 */}
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 flex-1 space-y-6 overflow-y-auto p-6 pb-8">
            <SurveyHeader type="brand" />

            <div className="space-y-8">
              {questions.map((question) => {
                const qId = String(question.index);
                const qText = String(question.survey ?? `문항 ${qId}`);
                const currentValue =
                  question.response && question.response > 0
                    ? question.response
                    : answers[qId];

                return (
                  <SurveyQuestion
                    key={qId}
                    questionId={qId}
                    questionNumber={qId}
                    question={qText}
                    value={currentValue}
                    onChange={(value) => handleAnswerChange(qId, value)}
                    onSave={handleQuantitativeSave}
                    isSaving={savingQuestions.has(qId)}
                  />
                );
              })}

              {/* 정성평가 섹션 */}
              <QualitativeEvaluation
                value={currentQualitativeValue}
                onChange={handleQualitativeChange}
                onSave={handleQualitativeSave}
                isSaving={isSavingQualitative}
              />
            </div>
          </div>

          {/* 하단 고정 버튼 영역 */}
          <div className="inset-shadow-sm flex-shrink-0 border-t border-gray-100 bg-gray-50/80 px-6 py-4">
            <SurveyNavigationWithArrows
              onComplete={handleComplete}
              canComplete={isAllAnswered && isQualitativeValid}
              onPrevious={goToPrevious}
              onNext={goToNext}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              currentStep={currentIndex + 1}
              totalSteps={totalSurveys}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
