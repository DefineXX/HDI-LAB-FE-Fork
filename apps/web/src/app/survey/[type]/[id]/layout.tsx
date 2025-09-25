export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-[calc(100vh-92px)]">{children}</div>;
}
