'use client';
import BackButton from '@/components/ui/back-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchHeaderProps {
  showBackButton?: boolean;
  onSearch?: (keyword: string) => void;
}

export function SearchHeader({ showBackButton = true, onSearch }: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row items-center fixed sm:relative top-0 bg-background z-50 w-full">
      <div
        style={{
          padding: '12px 20px 8px',
        }}
        className="flex flex-row items-center gap-2 border-b border-border w-full"
      >
        {showBackButton && <BackButton />}
        <div className="flex-1 relative flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="쿠팡에서 검색하기"
              className="pl-10 rounded-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            size="sm"
            className="rounded-full px-6"
          >
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
}
