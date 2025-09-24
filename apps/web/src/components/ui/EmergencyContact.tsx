import clsx from 'clsx';
import Image from 'next/image';

import { EMERGENCY_CONTACT } from '@/constants/notice';
import { HDILabOpenChatQR } from '@hdi/ui';

interface EmergencyContactProps {
  className?: string;
}

export default function EmergencyContact({
  className = '',
}: EmergencyContactProps) {
  const { TITLE, EMAIL, EMAIL_LABEL } = EMERGENCY_CONTACT;

  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-100 bg-white p-6 shadow-sm',
        className
      )}
    >
      <div className="text-center">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{TITLE}</h3>
        <div className="mx-auto mb-4 h-32 w-32">
          <div className="relative h-full w-full">
            <Image
              src={HDILabOpenChatQR}
              alt="HDILab Open Chat QR"
              fill
              sizes="full"
              priority
            />
          </div>
        </div>
        <div className="text-gray-700">
          <p className="text-sm">
            {EMAIL_LABEL}
            <span className="ml-1 font-medium">{EMAIL}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
