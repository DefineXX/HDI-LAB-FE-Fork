import { clsx } from 'clsx';

interface SurveyHeaderProps {
  datasetId: string;
  className?: string;
  type?: 'brand' | 'product';
}

export default function SurveyHeader({
  datasetId,
  className,
  type = 'product',
}: SurveyHeaderProps) {
  const getTitle = () => {
    switch (type) {
      case 'brand':
        return '시각 디자인 해석·평가 AI 개발을 위한 설문지';
      case 'product':
        return '제품 디자인 해석·평가 AI 개발을 위한 설문지';
      default:
        return '제품 디자인 해석·평가 AI 개발을 위한 설문지';
    }
  };

  return (
    <div className={clsx('space-y-4', className)}>
      <h2 className="text-xl font-semibold text-gray-900">{getTitle()}</h2>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">설문 ID:</span>
        <span
          className={clsx(
            'rounded px-3 py-1 font-mono text-sm',
            'bg-gray-100 text-gray-900'
          )}
        >
          {datasetId}
        </span>
      </div>

      <div
        className={clsx('rounded-lg p-4', 'border border-blue-200 bg-blue-50')}
      >
        <p className="text-sm text-gray-700">
          본 설문은 각 문항에 대해 1점(전혀 동의하지 않음)부터 5점(매우
          동의함)까지의 5점 척도로 평가합니다.
        </p>
        <div className="mt-2 text-xs text-gray-600">
          <span>1 (전혀 동의하지 않음)</span>
          <span className="mx-2">·</span>
          <span>2 (동의하지 않음)</span>
          <span className="mx-2">·</span>
          <span>3 (보통)</span>
          <span className="mx-2">·</span>
          <span>4 (동의함)</span>
          <span className="mx-2">·</span>
          <span>5 (매우 동의함)</span>
        </div>
      </div>
    </div>
  );
}
