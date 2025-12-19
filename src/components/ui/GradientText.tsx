import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export const GradientText = ({ children, className = '' }: GradientTextProps) => {
  return (
    <span className={`gradient-text font-bold ${className}`}>
      {children}
    </span>
  );
};
