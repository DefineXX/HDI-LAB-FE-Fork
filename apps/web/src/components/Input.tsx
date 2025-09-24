import clsx from 'clsx';
import { InputType } from '../types/input';

interface InputProps {
  type: InputType;
  placeholder: string;
  label?: string;
  className?: string;
}

export function Input({ type, placeholder, label, className }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="pl-0.5 text-sm tracking-tight text-gray-500">
          {label}
        </label>
      )}
      <input
        type={type}
        className={clsx(
          'rounded-lg border border-gray-300 px-4 py-3.5 transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none',
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
