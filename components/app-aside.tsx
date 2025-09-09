'use client'
import { useScreenSize } from '@/hooks/use-screen-size'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AppAside() {
    const screenSize = useScreenSize()
    const pathname = usePathname()
    return (
        <aside
            className="space-y-[20px] border-l border-border h-full"
            style={{
                padding: '20px 20px 20px 28px',
                gap: 16,
                position: 'fixed',
                left: '50%',
                transform: 'translateX(296px) translateX(calc(-1* var(--removed-body-scroll-bar-size, 0px) / 2))',
                width: 328,
                maxHeight: '100%',
                overflowY: 'auto',
                display: screenSize.isDesktop ? 'block' : 'none'
            }}
        >

            <div className="flex flex-row gap-4">
                {footers.map((item, idx) => (
                    <Link href={item.href} key={idx} className="hover:underline text-primary text-sm">
                        {item.title}
                    </Link>
                ))}
            </div>
            <div className="text-description font-medium text-xs">© 2025 Aivy from XXXX</div>
        </aside>
    )
}

const footers = [
    {
        title: '피드백',
        href: '/'
    },
    {
        title: '개인정보',
        href: '/'
    },
    {
        title: '이용약관',
        href: '/'
    },
    {
        title: '도움말',
        href: '/'
    }
]
