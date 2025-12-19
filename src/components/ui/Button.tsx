import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href
}: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-gradient-to-r from-cyber-purple to-cyber-blue text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-105',
    secondary: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40',
    outline: 'border-2 border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
