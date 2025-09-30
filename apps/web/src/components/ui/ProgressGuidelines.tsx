import clsx from 'clsx';
import Image from 'next/image';

import { PROGRESS_GUIDELINES } from '@/constants/notice';

interface ProgressGuidelinesProps {
  className?: string;
  type?: 'brand' | 'product';
}

export default function ProgressGuidelines({
  className = '',
  type = 'brand',
}: ProgressGuidelinesProps) {
  const { TITLE, STEPS } = PROGRESS_GUIDELINES[type];

  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg border border-blue-100 bg-blue-50 p-8',
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-2xl flex-col">
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
                <p className="flex items-center gap-2">
                  {step.content.split("'홍익대학교'")[0]}
                  {step.image && (
                    <>
                      <span className="inline-flex items-center">
                        <Image
                          src={step.image}
                          alt="홍익대학교 로고"
                          width={60}
                          height={20}
                          className="inline-block h-auto object-contain"
                        />
                      </span>
                      {step.content.split("'홍익대학교'")[1]}
                    </>
                  )}
                  {!step.image && step.content}
                </p>
                {step.note && (
                  <div className="mt-1 space-y-1">
                    {Array.isArray(step.note) ? (
                      step.note.map((noteItem, noteIndex) => (
                        <p
                          key={noteIndex}
                          className="text-sm font-medium text-red-600"
                        >
                          {noteItem}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm font-medium text-red-600">
                        {step.note}
                      </p>
                    )}
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
