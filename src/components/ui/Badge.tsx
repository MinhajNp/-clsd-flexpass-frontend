import { clsx } from 'clsx';

export type BadgeVariant =
  | 'purple'
  | 'blue'
  | 'gray'
  | 'green'
  | 'orange'
  | 'red'
  | 'teal';

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  purple: 'bg-purple-100 text-purple-700 ring-purple-200',
  blue:   'bg-blue-100   text-blue-700   ring-blue-200',
  gray:   'bg-gray-100   text-gray-600   ring-gray-200',
  green:  'bg-emerald-100 text-emerald-700 ring-emerald-200',
  orange: 'bg-orange-100 text-orange-700 ring-orange-200',
  red:    'bg-red-100    text-red-700    ring-red-200',
  teal:   'bg-teal-100   text-teal-700   ring-teal-200',
};

const Badge = ({ label, variant, className }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
