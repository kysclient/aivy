'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JSX } from 'react';
import { cn } from '@/lib/utils';

interface LinkButtonProps {
  href?: string;
  icon?: (size: number) => JSX.Element;
  title: string;
  button?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  destructive?: boolean;
}

export function LinkButton({
  children,
  destructive = false,
  href = '/',
  icon,
  title,
  button = false,
  onClick = () => {},
}: LinkButtonProps) {
  const destructiveColor = destructive ? 'text-[#f40b42] hover:bg-primary-hover' : '';

  return (
    <>
      {button ? (
        <div
          onClick={onClick}
          className={cn(
            'w-full py-[8px] px-[20px] min-h-[48px] items-center gap-[12px] flex flex-row hover:bg-muted',
            destructiveColor
          )}
        >
          {icon && icon(24)}
          <div className="text-[15px] flex-1">{title}</div>
          <div>
            {children ? (
              children
            ) : (
              <ChevronRight className={cn('text-description', destructiveColor)} />
            )}
          </div>
        </div>
      ) : (
        <Link
          href={href}
          className="py-[8px] px-[20px] min-h-[48px] items-center gap-[12px] flex flex-row hover:bg-muted"
        >
          {icon && icon(24)}
          <div className="text-[15px] flex-1">{title}</div>
          <div>
            <ChevronRight className="text-description" />
          </div>
        </Link>
      )}
    </>
  );
}

export default LinkButton;
