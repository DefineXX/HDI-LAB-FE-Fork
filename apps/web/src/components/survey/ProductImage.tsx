import { clsx } from 'clsx';
import Image from 'next/image';

interface ProductImageProps {
  imagePath: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
}

export default function ProductImage({
  imagePath,
  label,
  className,
  imageClassName,
  labelClassName,
}: ProductImageProps) {
  return (
    <div className={clsx('flex gap-4', className)}>
      {/* Vertical Bar */}
      <div className="w-1 flex-shrink-0 self-stretch rounded-full bg-gray-100"></div>

      {/* Image Content */}
      <div className="flex-1 space-y-3">
        {/* Product Image */}
        <div
          className={clsx('w-full overflow-hidden rounded-lg', imageClassName)}
        >
          <Image
            src={imagePath}
            alt={label || '제품 이미지'}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Label */}
        {label && (
          <p
            className={clsx(
              'text-sm font-medium text-gray-400',
              labelClassName
            )}
          >
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
