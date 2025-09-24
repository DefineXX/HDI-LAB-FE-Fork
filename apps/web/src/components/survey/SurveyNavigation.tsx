import { clsx } from 'clsx';

interface SurveyNavigationProps {
  onSave?: () => void;
  onComplete?: () => void;
  canComplete?: boolean;
  className?: string;
}

export default function SurveyNavigation({
  onSave,
  onComplete,
  canComplete = false,
  className,
}: SurveyNavigationProps) {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div className="flex gap-3">
        <button
          onClick={onSave}
          className={clsx(
            'rounded-lg px-6 py-2 text-white transition-colors duration-200',
            'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
          )}
        >
          임시저장
        </button>

        <button
          onClick={onComplete}
          disabled={!canComplete}
          className={clsx(
            'rounded-lg px-6 py-2 transition-colors duration-300',
            {
              'bg-blue-600 text-white hover:bg-blue-700': canComplete,
              'pointer-events-none bg-gray-300 text-gray-400': !canComplete,
            }
          )}
        >
          평가완료
        </button>
      </div>
    </div>
  );
}
