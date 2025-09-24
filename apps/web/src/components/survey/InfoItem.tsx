import { clsx } from 'clsx';

interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export default function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {/* Vertical bar */}
      <div className="h-5 w-1 flex-shrink-0 rounded-full bg-blue-100" />

      <div className="flex flex-1">
        <span className="w-40 flex-shrink-0 font-medium text-gray-600">
          {label}:
        </span>
        <div className="text-gray-900">{value}</div>
      </div>
    </div>
  );
}
