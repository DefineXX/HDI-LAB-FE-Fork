import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

interface QualitativeEvaluationProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function QualitativeEvaluation({
  value = '',
  onChange,
  className,
}: QualitativeEvaluationProps) {
  const [characterCount, setCharacterCount] = useState(value.length);
  const minCharacters = 300;
  const maxCharacters = 500;

  useEffect(() => {
    setCharacterCount(value.length);
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxCharacters) {
      onChange(newValue);
    }
  };

  const isMinimumMet = characterCount >= minCharacters;
  const isOverLimit = characterCount > maxCharacters;

  return (
    <div className={clsx('min-h-30 flex gap-4', className)}>
      {/* Vertical Bar */}
      <div className="w-1 flex-shrink-0 self-stretch rounded-full bg-gray-100"></div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        {/* Title */}
        <section>
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            정성 평가
          </h3>
          <p className="text-sm leading-relaxed text-gray-700">
            앞서 평가한 내용에 대한 전반적인 이유를 구체적으로 작성해 주세요.
          </p>
          <p className="text-xs text-gray-500">
            (디자인 8대요소 - 심미성, 조형성, 독창성, 사용성, 기능성, 윤리성,
            경제성, 목정성을 중심으로 300자 이상)
          </p>
        </section>

        {/* Text Input */}
        <div className="relative flex flex-col gap-2">
          <textarea
            id="qualitative-evaluation"
            value={value}
            onChange={handleTextChange}
            placeholder="입력해주세요"
            className={clsx(
              'min-h-30 w-full rounded-lg border px-4 py-3 text-sm',
              'placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500',
              'resize-none transition-all duration-200',
              isOverLimit
                ? 'border-red-300 bg-red-50'
                : isMinimumMet
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
            )}
            rows={8}
          />

          {/* Character Counter */}
          <div className="absolute bottom-3 right-3">
            <span
              className={clsx(
                'rounded px-2 py-1 text-xs font-medium',
                isOverLimit
                  ? 'bg-red-100 text-red-600'
                  : isMinimumMet
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500'
              )}
            >
              ({characterCount}/{maxCharacters}자)
            </span>
          </div>
        </div>

        {/* Validation Message */}
        {characterCount > 0 && (
          <div className="space-y-1">
            {isOverLimit && (
              <p className="text-xs text-red-600">
                최대 {maxCharacters}자까지 입력 가능합니다.
              </p>
            )}
            {!isMinimumMet && characterCount > 0 && (
              <p className="text-xs text-orange-600">
                최소 {minCharacters}자 이상 입력해주세요. (
                {minCharacters - characterCount}자 더 필요)
              </p>
            )}
            {isMinimumMet && !isOverLimit && (
              <p className="text-xs text-green-600">
                ✓ 최소 글자 수를 충족했습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
