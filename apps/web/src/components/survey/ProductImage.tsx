import { clsx } from 'clsx';
// import Image from 'next/image';

interface ProductImageProps {
  logoText: string;
  label?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
}

export default function ProductImage({
  logoText,
  label,
  backgroundColor = 'bg-black',
  textColor = 'text-white',
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
        {/* Product Image - 임시 텍스트로 표시 */}
        <div
          className={clsx(
            'flex aspect-square w-full items-center justify-center',
            backgroundColor,
            imageClassName
          )}
        >
          <span
            className={clsx(
              'text-6xl font-bold uppercase tracking-wider',
              textColor
            )}
          >
            {logoText}
          </span>
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
