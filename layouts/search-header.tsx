'use client';
import BackButton from '@/components/ui/back-button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchHeader({ showBackButton = true }: { showBackButton?: boolean }) {
  return (
    <div className="flex flex-row items-center fixed sm:relative top-0 bg-background z-50 w-full">
      <div
        style={{
          padding: '12px 20px 8px',
        }}
        className="flex flex-row items-center gap-2 border-b border-border w-full"
      >
        {showBackButton && <BackButton />}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="검색어 입력" className="pl-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
