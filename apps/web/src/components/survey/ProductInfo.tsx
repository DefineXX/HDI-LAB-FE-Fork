import { clsx } from 'clsx';
import InfoItem from './InfoItem';

interface ProductInfoProps {
  id: string;
  brandName: string;
  division: string;
  representativeCategory: string;
  representativeProduct: string;
  target: string;
  homepage: string;
  className?: string;
}

export default function ProductInfo({
  id,
  brandName,
  division,
  representativeCategory,
  representativeProduct,
  target,
  homepage,
  className,
}: ProductInfoProps) {
  return (
    <div className={clsx('space-y-6', className)}>
      <h1 className="border-b border-blue-100 pb-6 text-2xl font-bold text-gray-900">
        {brandName}
      </h1>

      <div className="space-y-6 text-[15px]">
        <InfoItem label="ID" value={id} />
        <InfoItem label="부문·카테고리" value={division} />
        <InfoItem label="대표 제품 카테고리" value={representativeCategory} />
        <InfoItem label="대표 제품" value={representativeProduct} />
        <InfoItem label="타겟(성별/연령)" value={target} />
        <InfoItem
          label="홈페이지"
          value={
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                'text-blue-600 underline',
                'hover:text-blue-800',
                'transition-colors duration-200'
              )}
            >
              {homepage}
            </a>
          }
        />
      </div>
    </div>
  );
}
