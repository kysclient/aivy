'use client';

import { Button } from '@/components/ui/button';
import { ChefHat, Home, ShoppingCart, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: '홈', href: '/' },
    { icon: ChefHat, label: '식단생성', href: '/meal-plan' },
    { icon: ShoppingCart, label: '상품추천', href: '/products' },
    { icon: Settings, label: '설정', href: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-40 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant={pathname === item.href ? 'default' : 'ghost'}
            size="sm"
            className="flex-col gap-1 h-auto py-2 px-3"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}
