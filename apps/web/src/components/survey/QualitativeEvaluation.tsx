import { clsx } from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface QualitativeEvaluationProps {
  value?: string;
  onChange: (value: string) => void;
  onSave?: (textResponse: string) => void;
  isSaving?: boolean;
  className?: string;
}

export default function QualitativeEvaluation({
  value = '',
  onChange,
  onSave,
  isSaving = false,
  className,
}: QualitativeEvaluationProps) {
  const [localValue, setLocalValue] = useState(value);
  const [characterCount, setCharacterCount] = useState(value.length);
  const [isFocused, setIsFocused] = useState(false);
  const [hasUserInput, setHasUserInput] = useState(false);
  const minCharacters = 200;
  const maxCharacters = 500;
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastInputTimeRef = useRef<number>(0);

  // 서버 데이터가 변경되면 로컬 상태도 업데이트 (사용자가 입력 중이 아닐 때만)
  useEffect(() => {
    if (!hasUserInput) {
      setLocalValue(value);
      setCharacterCount(value.length);
    }
  }, [value, hasUserInput]);

  // 디바운스된 저장 함수 - 포커스 상태에서만 동작
  const debouncedSave = useCallback(
    (textValue: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        if (onSave && textValue.trim().length > 0 && isFocused) {
          onSave(textValue);
          setHasUserInput(false); // 저장 후 사용자 입력 상태 초기화
        }
      }, 5000); // 5초 디바운스
    },
    [onSave, isFocused]
  );

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxCharacters) {
      setLocalValue(newValue);
      setCharacterCount(newValue.length);
      setHasUserInput(true);
      lastInputTimeRef.current = Date.now();

      // 부모 컴포넌트에 변경사항 전달
      onChange(newValue);

      // 디바운스된 저장 함수 호출
      debouncedSave(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // 포커스를 잃을 때 저장된 값이 있으면 즉시 저장
    if (hasUserInput && localValue.trim().length > 0 && onSave) {
      onSave(localValue);
      setHasUserInput(false);
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
          <div className="flex items-center gap-2">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              정성 평가
            </h3>
            {/* 저장 상태 표시 */}
            {isSaving && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <LoadingSpinner size="sm" />
                <span>저장 중...</span>
              </div>
            )}
            {hasUserInput && !isSaving && (
              <div className="flex items-center gap-1 text-xs text-orange-600">
                <span>수정 중...</span>
              </div>
            )}
          </div>
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
            value={localValue}
            onChange={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
