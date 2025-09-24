'use client';

import clsx from 'clsx';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ text, onClick, className, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx('rounded-lg py-3.5', className)}
      type={type}
    >
      {text}
    </button>
  );
}
