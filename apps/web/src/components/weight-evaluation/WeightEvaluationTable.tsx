import {
  WeightEvaluationCategory,
  WeightEvaluationFactor,
} from '@/types/weight-evaluation';

interface WeightEvaluationTableProps {
  factors: WeightEvaluationFactor[];
  categories: WeightEvaluationCategory[];
  validationErrors: Record<string, string>;
  onWeightChange: (categoryId: string, factorId: string, value: number) => void;
}

export default function WeightEvaluationTable({
  factors,
  categories,
  validationErrors,
  onWeightChange,
}: WeightEvaluationTableProps) {
  const calculateTotal = (category: WeightEvaluationCategory): number => {
    return Object.values(category.weights).reduce(
      (sum: number, weight: number) => sum + weight,
      0
    );
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      {/* 가이드 텍스트 */}
      <div className="flex-shrink-0 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-800">
              가중치 설정 안내
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              각 평가 요인의 상대적 중요도를 숫자로 입력하거나, 표의 칸에서
              마우스로 1씩 조정해주세요. 각 제품의 가중치 총합이 반드시 100이
              되도록 설정해주세요.
            </p>
          </div>
        </div>
      </div>

      {/* 평가요인 설명 */}
      <div className="flex-shrink-0 space-y-3">
        <h2 className="text-lg font-medium text-gray-800">평가요인 설명</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {factors.map((factor) => (
            <div
              key={factor.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <h3 className="text-sm font-medium text-gray-800">
                {factor.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 가중치 입력 테이블 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-2 text-left text-sm font-medium text-gray-700">
                  카테고리
                </th>
                {factors.map((factor) => (
                  <th
                    key={factor.id}
                    className="border border-gray-300 px-1 py-2 text-center text-xs font-medium text-gray-700"
                  >
                    {factor.name}
                  </th>
                ))}
                <th className="border border-gray-300 px-2 py-2 text-center text-sm font-medium text-gray-700">
                  합계/기준
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const total = calculateTotal(category);
                const hasError = validationErrors[category.id];
                const isValid = total === 100;

                return (
                  <tr
                    key={category.id}
                    className={
                      hasError
                        ? 'bg-red-50'
                        : isValid
                          ? 'bg-green-50'
                          : total > 100
                            ? 'bg-red-100'
                            : 'bg-orange-100'
                    }
                  >
                    <td className="border border-gray-300 px-2 py-2 text-sm font-medium text-gray-800">
                      {category.name}
                    </td>
                    {factors.map((factor) => (
                      <td
                        key={factor.id}
                        className="border border-gray-300 px-1 py-1"
                      >
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={category.weights[factor.id] || 0}
                          onChange={(e) => {
                            const value = e.target.value;
                            // 빈 문자열이거나 유효한 숫자인 경우에만 처리
                            if (value === '' || /^\d+$/.test(value)) {
                              const numValue =
                                value === '' ? 0 : parseInt(value, 10);
                              onWeightChange(category.id, factor.id, numValue);
                            }
                          }}
                          onFocus={(e) => {
                            // 포커스 시 현재 값이 0이면 전체 선택
                            if (e.target.value === '0') {
                              e.target.select();
                            }
                          }}
                          onKeyDown={(e) => {
                            // 숫자 키를 눌렀을 때 현재 값이 0이면 전체 선택
                            if (
                              /^[0-9]$/.test(e.key) &&
                              (e.target as HTMLInputElement).value === '0'
                            ) {
                              (e.target as HTMLInputElement).select();
                            }
                          }}
                          className={`w-full rounded border px-1 py-1 text-center text-xs ${
                            hasError
                              ? 'border-red-300 bg-red-50 text-red-700'
                              : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                      </td>
                    ))}
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <span
                        className={`text-sm font-medium ${
                          total === 100
                            ? 'text-green-600'
                            : total > 100
                              ? 'text-red-600'
                              : 'text-orange-600'
                        }`}
                      >
                        {total}/100%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 검증 오류 메시지 */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="flex-shrink-0 rounded-lg border border-red-200 bg-red-50 p-3">
          <h3 className="mb-2 text-sm font-medium text-red-800">
            오류 메시지:
          </h3>
          {Object.entries(validationErrors).map(([categoryId, message]) => (
            <p key={categoryId} className="text-sm text-red-700">
              • {categories.find((c) => c.id === categoryId)?.name}: {message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
