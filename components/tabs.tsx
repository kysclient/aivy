import { cn } from '@/lib/utils';

interface TabsProps {
  handleChange: (value: string) => void;
  data: any[];
  value: any;
  className?: string;
}

export function Tabs({ data, value, handleChange, className }: TabsProps) {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
      className={cn(`grid border-b border-border bg-background`, className)}
    >
      {data.map((item, idx) => (
        <button
          onClick={() => {
            handleChange(item.value);
          }}
          key={`tabs_${idx}`}
          className={cn('inline-block hover:bg-muted font-semibold text-foreground p-3')}
        >
          <span
            className={cn(
              'pb-3.5 px-2 text-sm',
              item.value === value && 'border-b-3 border-primary text-foreground font-bold'
            )}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
