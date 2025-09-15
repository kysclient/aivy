'use client'
import { AppMobileSidebar } from '@/components/sidebar-mobile'
import BackButton from '@/components/ui/back-button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useScreenSize } from '@/hooks/use-screen-size'
import { Menu } from 'lucide-react'

export function MenuHeader({ title, showBackButton = true }: { title: string; showBackButton?: boolean }) {
  const screenSize = useScreenSize()
  return (
    <div className="flex flex-row items-center fixed sm:relative top-0 bg-background z-50 w-full">
      <div
        style={{
          padding: '12px 20px 8px'
        }}
        className="flex flex-row items-center gap-2 border-b border-border w-full"
      >
        {screenSize.isMobile ? (
          <Sheet key={'mobile-sidebar'}>
            <SheetTrigger asChild className="hover:bg-muted rounded-xl">
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent side={'left'}>
              <SheetTitle></SheetTitle>
              <AppMobileSidebar />
            </SheetContent>
          </Sheet>
        ) : (
          <>{showBackButton && <BackButton />}</>
        )}

        <div className="text-foreground text-lg font-bold truncate whitespace-nowrap overflow-hidden flex-1">{title}</div>
      </div>
    </div>
  )
}
