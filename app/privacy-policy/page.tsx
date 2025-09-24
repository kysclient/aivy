import Link from "next/link";

export default function Page() {
    const policySections = [
        {
            title: "제1조 (개인정보의 처리 목적)",
            content: [
                "**회원 가입 및 관리:** 본인 식별/인증, 회원 자격 유지/관리, 고지/통지.",
                "**AI 건강관리 식단 서비스 제공:** 이용자의 나이, 키, 몸무게 등을 분석하여 맞춤형 식단 및 건강 정보 제공.",
                "**상품 구매 및 결제:** 구매 계약 체결 및 이행, 대금 결제, 물품 배송.",
                "**마케팅 및 광고 활용:** 신규 서비스 개발, 맞춤 서비스 제공, 통계 활용."
            ]
        },
        {
            title: "제2조 (처리하는 개인정보의 항목)",
            table: true,
            data: [
                { item: "필수 수집 항목", details: "이름, 이메일, 비밀번호, 나이, 키, 몸무게, 연락처, 배송지 주소, 결제 정보", purpose: "서비스 제공 및 구매" },
                { item: "민감 정보", details: "나이, 키, 몸무게 (맞춤형 식단 추천 목적)", purpose: "AI 건강관리 서비스" },
                { item: "자동 수집 항목", details: "서비스 이용 기록, 접속 로그, 쿠키, IP 정보", purpose: "서비스 개선 및 통계" }
            ]
        },
        {
            title: "제3조 (개인정보의 보유 및 이용 기간)",
            content: [
                "**회원 가입 및 관리:** 회원 탈퇴 시까지.",
                "**계약 및 대금 결제 기록:** 5년 (전자상거래법 근거).",
                "**소비자 불만/분쟁 처리 기록:** 3년 (전자상거래법 근거)."
            ]
        },
        {
            title: "제4조 (개인정보의 제3자 제공)",
            content: [
                "회사는 원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.",
                "다만, 상품 배송을 위한 **배송업체** 및 대금 결제를 위한 **결제 대행사**에는 필요한 범위 내에서 제공될 수 있습니다."
            ]
        },
        {
            title: "제6조 (이용자 및 법정대리인의 권리)",
            content: [
                "이용자는 언제든지 개인정보 **열람, 정정/삭제, 처리정지, 동의 철회**를 요구할 수 있습니다."
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
                <h1 className="text-2xl font-bold text-foreground mb-4 border-b pb-2">아이비(Aivy) 개인정보처리방침</h1>
                <div className=" p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground mb-4">
                        주식회사 (회사명) (이하 '회사' 또는 'Aivy')는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 등 관련 법령을 준수하여 개인정보 처리 방침을 수립·공개합니다.
                    </p>

                    {policySections.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-lg font-semibold text-foreground mb-2 border-l-4 border-border pl-2">{section.title}</h2>

                            {section.content && (
                                <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                                    {section.content.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.table && (
                                <div className="overflow-x-auto mt-2">
                                    <table className="min-w-full bg-background rounded-md">
                                        <thead>
                                            <tr className="bg-muted text-foreground">
                                                <th className="py-2 px-4 border-b text-left text-xs font-medium">항목</th>
                                                <th className="py-2 px-4 border-b text-left text-xs font-medium">상세 내용</th>
                                                <th className="py-2 px-4 border-b text-left text-xs font-medium">처리 목적</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.data.map((row, i) => (
                                                <tr key={i} className="border-b dark:border-gray-600 last:border-b-0">
                                                    <td className="py-2 px-4 text-sm text-foreground font-medium">{row.item}</td>
                                                    <td className="py-2 px-4 text-sm text-muted-foreground">{row.details}</td>
                                                    <td className="py-2 px-4 text-sm text-muted-foreground">{row.purpose}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}

                    <p className="text-xs text-red-500 mt-6">
                        본 방침은 (2025년 10월 1일)부터 적용됩니다. 법령 및 정책 변경 시 개정 최소 7일 전에 고지합니다.
                    </p>
                </div>
            </div>
        </>
    );
}