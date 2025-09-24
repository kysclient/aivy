import Link from "next/link";


export default function Page() {
    const termsSections = [
        {
            title: "제1조 (목적)",
            content: "본 약관은 AI 건강관리 식단 추천 및 상품 구매 서비스를 제공하는 '아이비'와 이용자 간의 권리, 의무, 책임 사항을 규정함을 목적으로 합니다."
        },
        {
            title: "제2조 (용어의 정의)",
            content: [
                "**아이비**: 회사가 운영하는 웹사이트 및 모바일 앱.",
                "**AI 건강관리 식단 서비스**: 회원이 제공한 나이, 키, 몸무게 등을 기반으로 AI가 맞춤형 식단을 추천하는 서비스."
            ]
        },
        {
            title: "제4조 (서비스의 제공)",
            content: [
                "AI 건강관리 식단 서비스 제공",
                "재화 또는 용역에 대한 정보 제공 및 구매 계약 체결",
                "구매 상품의 배송 및 결제 지원"
            ]
        },
        {
            title: "제6조 (회원 탈퇴 및 자격 상실)",
            content: [
                "회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 처리합니다.",
                "허위 내용 등록, 타인 정보 도용, 공서양속에 반하는 행위 시 자격이 제한/상실될 수 있습니다."
            ]
        },
        {
            title: "제10조 (AI 식단 서비스 관련 책임의 제한)",
            content: [
                "AI 식단 서비스는 이용자가 제공한 정보를 기반으로 한 **참고용 추천 정보**이며, **의학적 진단 또는 치료를 대체할 수 없습니다.**",
                "이용자는 건강 문제 발생 시 반드시 전문 의료기관의 진료를 받아야 하며, 회사는 추천 정보로 인한 직·간접적 결과에 대해 법적 책임을 지지 않습니다."
            ],
            highlight: true
        },
        {
            title: "제11조 (이용자의 의무)",
            content: [
                "허위 내용 등록 금지",
                "타인 정보 도용 금지",
                "지적재산권 침해 금지"
            ]
        }
    ];

    return (
        <>
            <header className="h-20 w-full border-b border-border flex justify-center items-center">
                <Link href={'/'}>
                    <h1 className="text-3xl font-kakao font-bold font-primary">aivy</h1>
                </Link>
            </header>
            <div className="bg-background p-6 rounded-lg shadow-xl border border-border max-w-4xl mx-auto my-8 pt-20">
                <h1 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">아이비(Aivy) 서비스 이용약관</h1>
                <div className=" overflow-y-auto p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground mb-4">
                        본 약관은 '아이비' 서비스 이용에 대한 회사와 이용자 간의 권리 및 의무를 규정합니다. 약관을 주의 깊게 읽어 주시기 바랍니다.
                    </p>

                    {termsSections.map((section, index) => (
                        <div key={index} className={`mb-6 p-3 rounded-md ${section.highlight ? 'bg-red-50 border border-red-300 dark:bg-red-950 dark:border-red-700' : ''}`}>
                            <h2 className={`text-lg font-semibold ${section.highlight ? 'text-red-600 dark:text-red-400' : 'text-foreground'} mb-2 border-l-4 border-blue-500 pl-2`}>{section.title}</h2>

                            {Array.isArray(section.content) ? (
                                <ul className={`list-disc pl-5 text-sm space-y-1 ${section.highlight ? 'text-red-600 dark:text-red-300' : 'text-muted-foreground'}`}>
                                    {section.content.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={`text-sm ${section.highlight ? 'text-red-600 dark:text-red-300' : 'text-muted-foreground'}`}>{section.content}</p>
                            )}
                        </div>
                    ))}

                    <p className="text-xs text-muted-foreground mt-6">
                        본 약관은 (2025년 10월 1일)부터 적용됩니다.
                    </p>
                </div>
            </div>
        </>
    );
}