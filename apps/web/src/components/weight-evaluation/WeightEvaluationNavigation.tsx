interface WeightEvaluationNavigationProps {
  onComplete: () => void;
  canComplete: boolean;
  isLoading?: boolean;
}

export default function WeightEvaluationNavigation({
  onComplete,
  canComplete,
  isLoading = false,
}: WeightEvaluationNavigationProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onComplete}
        disabled={!canComplete || isLoading}
        className={`rounded-lg px-6 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          canComplete && !isLoading
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        {isLoading ? '제출 중...' : '최종 제출하기'}
      </button>
    </div>
  );
}
