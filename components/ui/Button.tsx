// components/ui/Button.tsx
'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-[#1f3b2c] text-white hover:bg-[#2a4f3a]',
    secondary: 'bg-[#f2f0eb] text-[#1f3b2c] hover:bg-[#e5e2da]',
    outline: 'border border-[#1f3b2c]/30 text-[#1f3b2c] hover:bg-[#1f3b2c]/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={`rounded-full font-medium transition shadow-sm hover:shadow-md ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}