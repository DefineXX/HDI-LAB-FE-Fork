import { ResearchPartners } from '@/components/ui/ResearchPartners';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      {children}
      <ResearchPartners className="absolute bottom-12" />
    </div>
  );
}
