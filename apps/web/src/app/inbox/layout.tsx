import EmergencyContact from '@/components/ui/EmergencyContact';
import ProgressGuidelines from '@/components/ui/ProgressGuidelines';
import SurveyIntroduction from '@/components/ui/SurveyIntroduction';

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <section className="rounded-b-xl bg-gray-50 py-12">
        <div className="grid grid-cols-1 gap-8 px-8 lg:grid-cols-2">
          {/* 왼쪽 컬럼 - 설문지 소개 */}
          <div className="lg:col-span-1">
            <SurveyIntroduction />
          </div>

          {/* 오른쪽 컬럼 - 가이드라인과 비상연락망 */}
          <div className="space-y-6 lg:col-span-1">
            <ProgressGuidelines />
            <EmergencyContact />
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}
