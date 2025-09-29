import clsx from 'clsx';
import Image from 'next/image';

import { EMERGENCY_CONTACT } from '@/constants/notice';
import { HDILabBrandOpenChatQR, HDILabProductOpenChatQR } from '@hdi/ui';

interface EmergencyContactProps {
  className?: string;
  type?: 'brand' | 'product';
}

export default function EmergencyContact({
  className = '',
  type = 'brand',
}: EmergencyContactProps) {
  const { TITLE, EMAIL, EMAIL_LABEL } = EMERGENCY_CONTACT[type];

  // 타입별 QR 코드 이미지 설정
  const getQRCodeImage = () => {
    switch (type) {
      case 'brand':
        return HDILabBrandOpenChatQR; // 기존 브랜드용 QR 코드
      case 'product':
        return HDILabProductOpenChatQR; // TODO: 제품용 QR 코드 이미지로 교체 필요
      default:
        return HDILabBrandOpenChatQR;
    }
  };

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
              src={getQRCodeImage()}
              alt={`${type === 'brand' ? '브랜드' : '제품'} 설문 비상연락망 QR`}
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
