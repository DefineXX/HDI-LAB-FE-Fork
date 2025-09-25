export interface WeightEvaluationFactor {
  id: string;
  name: string;
  description: string;
}

export interface WeightEvaluationCategory {
  id: string;
  name: string;
  weights: Record<string, number>;
}

export interface WeightEvaluationData {
  factors: WeightEvaluationFactor[];
  categories: WeightEvaluationCategory[];
}

export interface WeightValidationResult {
  isValid: boolean;
  message?: string;
  categoryId?: string;
}

export interface WeightEvaluationSuccessProps {
  onRedirect?: () => void;
}

export interface WeightEvaluationState {
  categories: WeightEvaluationCategory[];
  validationErrors: Record<string, string>;
  isCompleted: boolean;
}
