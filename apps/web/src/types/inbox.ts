export type SurveyStatus = 'pending' | 'in-progress' | 'completed' | 'modify';

export type BrandSurveyItem = {
  id: number;
  brandName: string;
  logoText?: string;
  status: SurveyStatus;
};
