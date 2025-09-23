import { InputType } from '../types/input';

interface InputProps {
  type: InputType;
  placeholder: string;
  label?: string;
}

export function Input({ type, placeholder, label }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="pl-0.5 text-sm tracking-tight text-gray-500">
          {label}
        </label>
      )}
      <input
        type={type}
        className="w-90 rounded-lg border border-gray-300 p-4 transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
