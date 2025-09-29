import EmergencyContact from '@/components/ui/EmergencyContact';
import ProgressGuidelines from '@/components/ui/ProgressGuidelines';
import SurveyIntroduction from '@/components/ui/SurveyIntroduction';

interface InboxLayoutProps {
  children: React.ReactNode;
  params: {
    type: string;
  };
}

export default function InboxLayout({ children, params }: InboxLayoutProps) {
  // type 파라미터를 'brand' | 'product' 타입으로 변환
  const surveyType =
    params.type === 'brand' || params.type === 'product'
      ? params.type
      : 'brand'; // 기본값은 brand

  return (
    <div className="min-h-screen">
      <section className="rounded-b-xl bg-gray-50 py-12">
        <div className="grid grid-cols-1 gap-8 px-8 lg:grid-cols-2 lg:items-stretch">
          {/* 왼쪽 컬럼 - 설문지 소개 */}
          <div className="flex lg:col-span-1">
            <SurveyIntroduction className="flex-1" type={surveyType} />
          </div>

          {/* 오른쪽 컬럼 - 가이드라인과 비상연락망 */}
          <div className="flex flex-col space-y-6 lg:col-span-1">
            <ProgressGuidelines className="flex-1" type={surveyType} />
            <EmergencyContact type={surveyType} />
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}
