import clsx from 'clsx';
import type { ReactNode } from 'react';

import { SURVEY_INTRODUCTION } from '@/constants/notice';

interface SurveyIntroductionProps {
  className?: string;
  type?: 'brand' | 'product';
}

interface RichSegment {
  text: string;
  highlight?: boolean;
  className?: string;
  breakAfter?: boolean;
}

interface ContentItem {
  type: 'text' | 'highlight' | 'rich';
  content: string | string[] | RichSegment[];
  className?: string;
}

function renderContentItem(item: ContentItem, index: number): ReactNode {
  const { type, content, className } = item;

  switch (type) {
    case 'highlight':
      return (
        <span key={index} className={clsx('font-semibold', className)}>
          {content as string}
        </span>
      );

    case 'rich':
      if (Array.isArray(content)) {
        return (
          <span key={index}>
            {(content as RichSegment[]).map((seg, segIndex) => (
              <span key={segIndex}>
                <span
                  className={clsx(
                    seg.highlight ? 'font-semibold' : undefined,
                    seg.className
                  )}
                >
                  {seg.text}
                </span>
                {seg.breakAfter && <br />}
              </span>
            ))}
          </span>
        );
      }
      return <span key={index}>{content as string}</span>;

    case 'text':
    default:
      return (
        <span key={index} className={className}>
          {content as string}
        </span>
      );
  }
}

export default function SurveyIntroduction({
  className = '',
  type = 'brand',
}: SurveyIntroductionProps) {
  const { TITLE, CONTENT, FOOTER } = SURVEY_INTRODUCTION[type];

  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg border border-gray-100 bg-white p-8 shadow-sm',
        className
      )}
    >
      <div className="mx-auto flex max-w-4xl flex-1 flex-col">
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
          {TITLE}
        </h1>
        <div className="flex-1 space-y-6 leading-relaxed text-gray-700">
          {CONTENT.map((item, index) => (
            <p key={index}>{renderContentItem(item, index)}</p>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between gap-4 text-sm text-gray-400">
            <span>{FOOTER.EXPECTED_TIME}</span>
            <span>{FOOTER.RESEARCH_INSTITUTION}</span>
            <span>{FOOTER.CONTACT_EMAIL}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
