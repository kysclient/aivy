import { cn } from '@/lib/utils';
import { memo } from 'react';

export const PopoverButton = memo(
  ({
    label,
    icon: Icon,
    onClick,
    disabled,
    className,
  }: {
    disabled?: boolean;
    label: string;
    icon: any;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
  }) => (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-full rounded-md p-2 flex items-center justify-between gap-4 hover:bg-muted-hover text-description transition-colors',
        className
      )}
    >
      <span className="text-xs sm:text-sm font-medium">{label}</span>
      <Icon className="w-4 h-4" />
    </button>
  )
);
PopoverButton.displayName = 'PopoverButton';
