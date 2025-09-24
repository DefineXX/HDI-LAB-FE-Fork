import clsx from 'clsx';

import { PROGRESS_GUIDELINES } from '@/constants/notice';

interface ProgressGuidelinesProps {
  className?: string;
}

export default function ProgressGuidelines({
  className = '',
}: ProgressGuidelinesProps) {
  const { TITLE, STEPS } = PROGRESS_GUIDELINES;

  return (
    <div
      className={clsx(
        'rounded-lg border border-blue-100 bg-blue-50 p-8',
        className
      )}
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
          {TITLE}
        </h2>
        <ul className="space-y-4">
          {STEPS.map((step) => (
            <li key={step.number} className="flex items-start space-x-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500 text-sm font-medium text-white">
                {step.number}
              </span>
              <div className="text-gray-700">
                <p>{step.content}</p>
                {step.note && (
                  <div className="mt-1">
                    <p className="text-sm font-medium text-red-600">
                      {step.note}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
