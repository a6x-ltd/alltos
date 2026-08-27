// components/ui/Badge.tsx
interface BadgeProps {
  label: string;
  variant?: 'default' | 'sale' | 'bestseller' | 'new';
  className?: string;
}

export default function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-white/80 backdrop-blur text-[#1f3b2c] border border-[#eae8e2]',
    sale: 'bg-red-100 text-red-700 border border-red-200',
    bestseller: 'bg-[#d4e2d4] text-[#1f3b2c] border border-[#b8cbb8]',
    new: 'bg-blue-100 text-blue-700 border border-blue-200',
  };

  return (
    <span className={`text-[10px] font-semibold px-3 py-1 rounded-full ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
}