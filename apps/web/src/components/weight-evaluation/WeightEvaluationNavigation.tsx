interface WeightEvaluationNavigationProps {
  onSave: () => void;
  onComplete: () => void;
  canComplete: boolean;
}

export default function WeightEvaluationNavigation({
  onSave,
  onComplete,
  canComplete,
}: WeightEvaluationNavigationProps) {
  return (
    <div className="flex justify-end space-x-3">
      <button
        onClick={onSave}
        className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        임시저장
      </button>
      <button
        onClick={onComplete}
        disabled={!canComplete}
        className={`rounded-lg px-6 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          canComplete
            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        평가완료
      </button>
    </div>
  );
}
