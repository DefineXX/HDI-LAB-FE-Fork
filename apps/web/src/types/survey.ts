export interface ProductInfo {
  id: string;
  brandName: string;
  division: string;
  category: string;
  representativeCategory: string;
  representativeProduct: string;
  target: string;
  homepage: string;
  logoText: string;
}

export interface SurveyQuestion {
  id: string;
  question: string;
}

export interface SurveyAnswer {
  questionId: string;
  value: number;
}

export interface QualitativeAnswer {
  content: string;
}

export interface SurveyData {
  product: ProductInfo;
  questions: SurveyQuestion[];
  qualitativeEvaluation?: boolean;
}

export type SurveyNavigationAction = 'previous' | 'save' | 'complete' | 'next';

export interface SurveyCompletionStatus {
  surveyQuestionsCompleted: boolean;
  weightEvaluationCompleted: boolean;
  isFullyCompleted: boolean;
}

export interface SurveyProgress {
  surveyId: string;
  questionsAnswered: Record<string, number>;
  qualitativeAnswer: string;
  weightEvaluationData?: Record<string, Record<string, number>>;
  completionStatus: SurveyCompletionStatus;
}
