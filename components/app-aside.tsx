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
            <div className='rounded-xl overflow-hidden'>
                <a href="https://link.coupang.com/a/cPTOPF" target="_blank" referrerPolicy="unsafe-url"><img src="https://ads-partners.coupang.com/banners/919945?subId=&traceId=V0-301-371ae01f4226dec2-I919945&w=320&h=100" alt="" /></a>            </div>
            <div className='rounded-xl overflow-hidden border border-border'>
                <iframe src="https://ads-partners.coupang.com/widgets.html?id=919934&template=carousel&trackingCode=AF4080389&subId=&width=328&height=120&tsource=" width="328" height="120" frameBorder="0" scrolling="no" referrerPolicy="unsafe-url"></iframe>
            </div>

            <div className="flex flex-row gap-4">
                {footers.map((item, idx) => (
                    <Link href={item.href} key={idx} className="hover:underline text-primary text-sm">
                        {item.title}
                    </Link>
                ))}
            </div>
            <div className="text-description font-medium text-xs">
                본 사이트는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
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
        href: '/intro'
    }
]
