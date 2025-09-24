import BrandSurveyCard from '@/components/BrandSurveyCard';
import { DUMMY_BRAND_SURVEYS } from '@/mock/inbox';

export default function InboxPage() {
  return (
    <div className="space-y-6 px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900">설문함</h1>

      {/* 그리드 뷰 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {DUMMY_BRAND_SURVEYS.map((item) => (
          <BrandSurveyCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
