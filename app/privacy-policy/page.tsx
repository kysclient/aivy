import Link from "next/link"
import { Shield, FileText, Users, Lock, Eye, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  const policySections = [
    {
      title: "제1조 (개인정보의 처리 목적)",
      icon: <FileText className="w-5 h-5" />,
      content: [
        "**회원 가입 및 관리:** 본인 식별/인증, 회원 자격 유지/관리, 고지/통지.",
        "**AI 건강관리 식단 서비스 제공:** 이용자의 나이, 키, 몸무게 등을 분석하여 맞춤형 식단 및 건강 정보 제공.",
        "**상품 구매 및 결제:** 구매 계약 체결 및 이행, 대금 결제, 물품 배송.",
        "**마케팅 및 광고 활용:** 신규 서비스 개발, 맞춤 서비스 제공, 통계 활용.",
      ],
    },
    {
      title: "제2조 (처리하는 개인정보의 항목)",
      icon: <Users className="w-5 h-5" />,
      table: true,
      data: [
        {
          item: "필수 수집 항목",
          details: "이름, 이메일, 비밀번호, 나이, 키, 몸무게, 연락처, 배송지 주소, 결제 정보",
          purpose: "서비스 제공 및 구매",
          type: "required",
        },
        {
          item: "민감 정보",
          details: "나이, 키, 몸무게 (맞춤형 식단 추천 목적)",
          purpose: "AI 건강관리 서비스",
          type: "sensitive",
        },
        {
          item: "자동 수집 항목",
          details: "서비스 이용 기록, 접속 로그, 쿠키, IP 정보",
          purpose: "서비스 개선 및 통계",
          type: "automatic",
        },
      ],
    },
    {
      title: "제3조 (개인정보의 보유 및 이용 기간)",
      icon: <Lock className="w-5 h-5" />,
      content: [
        "**회원 가입 및 관리:** 회원 탈퇴 시까지.",
        "**계약 및 대금 결제 기록:** 5년 (전자상거래법 근거).",
        "**소비자 불만/분쟁 처리 기록:** 3년 (전자상거래법 근거).",
      ],
    },
    {
      title: "제4조 (개인정보의 제3자 제공)",
      icon: <Shield className="w-5 h-5" />,
      content: [
        "회사는 원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.",
        "다만, 상품 배송을 위한 **배송업체** 및 대금 결제를 위한 **결제 대행사**에는 필요한 범위 내에서 제공될 수 있습니다.",
      ],
    },
    {
      title: "제6조 (이용자 및 법정대리인의 권리)",
      icon: <Eye className="w-5 h-5" />,
      content: ["이용자는 언제든지 개인정보 **열람, 정정/삭제, 처리정지, 동의 철회**를 요구할 수 있습니다."],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "required":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "sensitive":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"
      case "automatic":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">돌아가기</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">aivy</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-medium text-primary">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              이용약관
            </Link>
            <Link href="mailto:kysclient@gmail.com?subject=아이비(Aivy) 서비스 피드백입니다." className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              문의하기
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5" />
        <div className="container relative max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            개인정보보호
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">개인정보처리방침</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8">
            Aivy는 이용자의 개인정보를 소중히 여기며, 관련 법령을 준수하여 투명하고 안전한 개인정보 처리 방침을
            제공합니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4 md:px-8">
          {/* Company Info */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">아이비(Aivy) 개인정보처리방침</h2>
                <p className="text-muted-foreground leading-relaxed">
                  주식회사 아이비 (이하 '회사' 또는 'Aivy')는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 등
                  관련 법령을 준수하여 개인정보 처리 방침을 수립·공개합니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">시행일자</div>
                <div className="font-semibold">2025년 10월 1일</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">개정일자</div>
                <div className="font-semibold">2025년 9월 24일</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">버전</div>
                <div className="font-semibold">v1.0</div>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {policySections.map((section, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-balance">{section.title}</h3>
                  </div>

                  {section.content && (
                    <div className="space-y-4">
                      {section.content.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                          <p
                            className="text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {section.table && (
                    <div className="overflow-hidden rounded-xl border border-border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50 border-b border-border">
                              <th className="text-left py-4 px-6 font-semibold text-sm">항목</th>
                              <th className="text-left py-4 px-6 font-semibold text-sm">상세 내용</th>
                              <th className="text-left py-4 px-6 font-semibold text-sm">처리 목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.data?.map((row, i) => (
                              <tr
                                key={i}
                                className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
                              >
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(row.type || "")}`}
                                    >
                                      {row.item}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-muted-foreground leading-relaxed">
                                  {row.details}
                                </td>
                                <td className="py-4 px-6 text-sm text-muted-foreground">{row.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-12 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">중요 공지사항</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  본 방침은 2025년 10월 1일부터 적용됩니다. 법령 및 정책 변경 시 개정 최소 7일 전에 고지하며, 중요한
                  변경사항이 있을 경우 이메일 또는 서비스 내 알림을 통해 별도 안내드립니다.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-card border border-border rounded-2xl p-6 md:p-8">
            <h4 className="text-lg font-semibold mb-4">개인정보보호 문의</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">개인정보보호책임자</div>
                <div className="font-medium">김유신 (kysclient@gmail.com)</div>
              </div>
              {/* <div>
                <div className="text-sm text-muted-foreground mb-1">고객지원센터</div>
                <div className="font-medium">1588-0000 (평일 09:00-18:00)</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">aivy</span>
              <span className="text-muted-foreground text-sm">© 2025 All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                이용약관
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
