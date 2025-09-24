'use client';

import ProductImage from '@/components/survey/ProductImage';
import ProductInfo from '@/components/survey/ProductInfo';
import QualitativeEvaluation from '@/components/survey/QualitativeEvaluation';
import SurveyHeader from '@/components/survey/SurveyHeader';
import SurveyNavigation from '@/components/survey/SurveyNavigation';
import SurveyQuestion from '@/components/survey/SurveyQuestion';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

// 임시 데이터 - 실제로는 API에서 가져올 데이터
const mockSurveyData = {
  id: '0001',
  brandName: '디올',
  division: 'bplo',
  category: '화장품/미용>향수>여성향수',
  representativeProduct: '디올뷰티 어딕트 립 글로우',
  target: '여성/20-30대',
  homepage: 'https://www.dior.com/ko_kr',
  logoText: 'DIOR',
};

const surveyQuestions = [
  {
    id: '1-1',
    question: '이 로고 디자인은 긍정적인 인상을 준다',
  },
  {
    id: '1-2',
    question: '이 로고 디자인은 감성적으로 끌린다',
  },
  {
    id: '1-3',
    question: '이 로고 디자인은 형태, 서체가 미적으로 우수하다',
  },
  {
    id: '1-4',
    question: '이 로고 디자인은 형태, 서체가 미적으로 우수하다',
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const { id } = useParams();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [qualitativeAnswer, setQualitativeAnswer] = useState<string>('');
  // 실제로는 params.id를 사용해서 해당 설문 데이터를 가져와야 함
  console.log('Survey ID:', id);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSave = () => {
    console.log('임시저장:', { answers, qualitativeAnswer });
    // 임시저장 로직 구현
  };

  const handleComplete = () => {
    console.log('평가완료:', { answers, qualitativeAnswer });
    // 평가완료 로직 구현
    router.push(`/weight-evaluation`);
  };

  const isAllAnswered = surveyQuestions.every(
    (q) => answers[q.id] !== undefined
  );
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
            <ProductInfo
              id={mockSurveyData.id}
              brandName={mockSurveyData.brandName}
              division={mockSurveyData.division}
              representativeCategory={mockSurveyData.category}
              representativeProduct={mockSurveyData.representativeProduct}
              target={mockSurveyData.target}
              homepage={mockSurveyData.homepage}
            />

            <ProductImage
              logoText={mockSurveyData.logoText}
              backgroundColor="bg-black"
              textColor="text-white"
              label="디올 뷰티 어딕트 립 글로우"
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
            <SurveyHeader
              datasetId={`${mockSurveyData.id}_${mockSurveyData.division}`}
            />

            <div className="space-y-8">
              {surveyQuestions.map((question) => (
                <SurveyQuestion
                  key={question.id}
                  questionId={question.id}
                  questionNumber={question.id}
                  question={question.question}
                  value={answers[question.id]}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              ))}

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
