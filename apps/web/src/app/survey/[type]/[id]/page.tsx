'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import ProductImage from '@/components/survey/ProductImage';
import ProductInfo from '@/components/survey/ProductInfo';
import QualitativeEvaluation from '@/components/survey/QualitativeEvaluation';
import SurveyHeader from '@/components/survey/SurveyHeader';
import SurveyNavigation from '@/components/survey/SurveyNavigation';
import SurveyQuestion from '@/components/survey/SurveyQuestion';
import { useProductSurveyDetail } from '@/hooks/useSurveyProducts';
import { UserType } from '@/schemas/auth';
import { type ProductSurveyQuestion } from '@/schemas/survey';
import { loadSurveyProgress, saveSurveyProgress } from '@/utils/survey';

// 설문 문항은 상세 응답의 surveyResponses에서 구성합니다

export default function SurveyPage() {
  const router = useRouter();
  const { id, type } = useParams();
  const surveyId = Array.isArray(id) ? id[0] : id || 'default';
  const productResponseId = useMemo(() => {
    const numeric = Number(surveyId);
    return Number.isFinite(numeric) ? numeric : undefined;
  }, [surveyId]);

  const {
    data: detail,
    isLoading,
    error,
  } = useProductSurveyDetail({
    type: type as UserType,
    productResponseId,
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qualitativeAnswer, setQualitativeAnswer] = useState<string>('');

  // 설문 진행 상태 불러오기
  useEffect(() => {
    if (surveyId) {
      const progress = loadSurveyProgress(surveyId);
      if (progress) {
        setAnswers(progress.questionsAnswered);
        setQualitativeAnswer(progress.qualitativeAnswer);
      }
    }
  }, [surveyId]);

  // 실제 데이터 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-600">설문 데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-500">
          설문 데이터를 불러오지 못했습니다.
        </p>
      </div>
    );
  }

  const product = detail?.productDataSetResponse;
  const questions: ProductSurveyQuestion[] =
    detail?.productSurveyResponse.surveyResponses ?? [];

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSave = () => {
    console.log('임시저장:', { answers, qualitativeAnswer });

    // 설문 진행 상태 저장
    if (surveyId) {
      saveSurveyProgress(surveyId, {
        questionsAnswered: answers,
        qualitativeAnswer,
      });
    }
  };

  const handleComplete = () => {
    console.log('설문 문항 평가완료:', { answers, qualitativeAnswer });

    // 설문 진행 상태 저장
    if (surveyId) {
      saveSurveyProgress(surveyId, {
        questionsAnswered: answers,
        qualitativeAnswer,
      });

      // 가중치 평가 페이지로 이동
      router.push(`/weight-evaluation`);
    }
  };

  const isAllAnswered = questions.every((q) => {
    const key = String(q.index);
    return answers[key] !== undefined;
  });
  const isQualitativeValid = qualitativeAnswer.length >= 300;

  return (
    <div className="mx-auto h-full px-8 py-6">
      <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 왼쪽 섹션 - 제품 정보 */}
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
            <h2 className="mb-1 text-lg font-semibold text-gray-800">
              제품 정보
            </h2>
            <p className="text-sm text-gray-600">브랜드 및 제품 상세 정보</p>
          </div>
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 flex-1 space-y-6 overflow-y-auto p-6">
            {product && (
              <ProductInfo
                id={product.id}
                brandName={product.productName || product.companyName || ''}
                division={product.productTypeName || ''}
                representativeCategory={product.modelName || ''}
                representativeProduct={product.productName || ''}
                target={product.size || ''}
                homepage={product.referenceUrl || ''}
              />
            )}

            <ProductImage
              logoText={(product?.productName || 'PRODUCT').slice(0, 10)}
              backgroundColor="bg-black"
              textColor="text-white"
              label={product?.modelName || ''}
            />
          </div>
        </div>

        {/* 오른쪽 섹션 - 설문지 */}
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              브랜드 평가 설문
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              로고 디자인에 대한 평가를 진행해주세요
            </p>
          </div>

          {/* 스크롤 가능한 설문 내용 영역 */}
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 flex-1 space-y-6 overflow-y-auto p-6 pb-8">
            {product && (
              <SurveyHeader
                datasetId={`${product.id}_${product.productTypeName || ''}`}
              />
            )}

            <div className="space-y-8">
              {questions.map((question) => {
                const qId = String(question.index);
                const qText = String(
                  question.survey ?? question.response ?? `문항 ${qId}`
                );
                return (
                  <SurveyQuestion
                    key={qId}
                    questionId={qId}
                    questionNumber={qId}
                    question={qText}
                    value={answers[qId]}
                    onChange={(value) => handleAnswerChange(qId, value)}
                  />
                );
              })}

              {/* 정성평가 섹션 */}
              <QualitativeEvaluation
                value={qualitativeAnswer}
                onChange={setQualitativeAnswer}
              />
            </div>
          </div>

          {/* 하단 고정 버튼 영역 */}
          <div className="inset-shadow-sm flex-shrink-0 border-t border-gray-100 bg-gray-50/80 px-6 py-4">
            <SurveyNavigation
              onSave={handleSave}
              onComplete={handleComplete}
              canComplete={isAllAnswered && isQualitativeValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
