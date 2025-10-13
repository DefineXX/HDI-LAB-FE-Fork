import { clsx } from 'clsx';

interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export default function InfoItem({ label, value, className }: InfoItemProps) {
  return (
    <div className={clsx('flex min-w-0 gap-3', className)}>
      {/* Vertical bar */}
      <div className="mt-1 h-5 w-1 flex-shrink-0 rounded-full bg-blue-50" />

      <div className="flex min-w-0 flex-1">
        <span className="w-40 flex-shrink-0 pt-0.5 font-medium text-gray-600">
          {label}
        </span>
        <div className="min-w-0 flex-1 overflow-hidden text-gray-900">
          {value}
        </div>
      </div>
    </div>
  );
}
