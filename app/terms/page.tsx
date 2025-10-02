import Link from 'next/link';
import {
  FileText,
  AlertTriangle,
  Shield,
  Users,
  Gavel,
  ExternalLink,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function Page() {
  const termsSections = [
    {
      id: 'purpose',
      title: '제1조 (목적)',
      icon: FileText,
      content:
        "본 약관은 AI 건강관리 식단 추천 및 상품 구매 서비스를 제공하는 '아이비'와 이용자 간의 권리, 의무, 책임 사항을 규정함을 목적으로 합니다.",
    },
    {
      id: 'definitions',
      title: '제2조 (용어의 정의)',
      icon: Shield,
      content: [
        '**아이비**: 회사가 운영하는 웹사이트 및 모바일 앱.',
        '**AI 건강관리 식단 서비스**: 회원이 제공한 나이, 키, 몸무게 등을 기반으로 AI가 맞춤형 식단을 추천하는 서비스.',
      ],
    },
    {
      id: 'services',
      title: '제4조 (서비스의 제공)',
      icon: Users,
      content: [
        'AI 건강관리 식단 서비스 제공',
        '재화 또는 용역에 대한 정보 제공 및 구매 계약 체결',
        '구매 상품의 배송 및 결제 지원',
      ],
    },
    {
      id: 'withdrawal',
      title: '제6조 (회원 탈퇴 및 자격 상실)',
      icon: ExternalLink,
      content: [
        '회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 처리합니다.',
        '허위 내용 등록, 타인 정보 도용, 공서양속에 반하는 행위 시 자격이 제한/상실될 수 있습니다.',
      ],
    },
    {
      id: 'liability',
      title: '제10조 (AI 식단 서비스 관련 책임의 제한)',
      icon: AlertTriangle,
      content: [
        'AI 식단 서비스는 이용자가 제공한 정보를 기반으로 한 **참고용 추천 정보**이며, **의학적 진단 또는 치료를 대체할 수 없습니다.**',
        '이용자는 건강 문제 발생 시 반드시 전문 의료기관의 진료를 받아야 하며, 회사는 추천 정보로 인한 직·간접적 결과에 대해 법적 책임을 지지 않습니다.',
      ],
      highlight: true,
    },
    {
      id: 'obligations',
      title: '제11조 (이용자의 의무)',
      icon: Gavel,
      content: ['허위 내용 등록 금지', '타인 정보 도용 금지', '지적재산권 침해 금지'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="enterprise-header sticky top-0 z-50 h-20 flex items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold text-foreground">aivy</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/privacy-policy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            개인정보처리방침
          </Link>
          <Link href="/terms" className="text-sm text-foreground font-medium">
            서비스 이용약관
          </Link>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="toc-nav">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                목차
              </h3>
              <nav className="space-y-1">
                {termsSections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="toc-item">
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="status-badge status-effective">
                  <CheckCircle className="w-3 h-3" />
                  시행일: 2025.10.01
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {/* Page header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="page-title">서비스 이용약관</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="status-badge status-effective">
                      <Clock className="w-3 h-3" />
                      최종 업데이트: 2025년 10월 1일
                    </span>
                  </div>
                </div>
              </div>

              <p className="page-subtitle max-w-3xl">
                본 약관은 아이비(Aivy) 서비스 이용에 대한 회사와 이용자 간의 권리 및 의무를
                규정합니다. 서비스를 이용하기 전에 약관을 주의 깊게 읽어 주시기 바랍니다.
              </p>
            </div>

            <div className="legal-section highlight mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="warning-icon" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                    중요 고지사항
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                    AI 건강관리 식단 서비스는 참고용 정보 제공 목적이며, 의학적 진단이나 치료를
                    대체할 수 없습니다. 건강 관련 문제가 있으시면 반드시 전문 의료기관에
                    상담받으시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {termsSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`legal-section ${section.highlight ? 'highlight' : ''}`}
                  >
                    <h2 className="legal-title">
                      <IconComponent
                        className={section.highlight ? 'warning-icon' : 'section-icon'}
                      />
                      {section.title}
                    </h2>

                    {Array.isArray(section.content) ? (
                      <div className="legal-list">
                        {section.content.map((item, i) => (
                          <div key={i} className="legal-list-item">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span
                              className={
                                section.highlight ? 'text-amber-700 dark:text-amber-300' : ''
                              }
                            >
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        className={`legal-content ${section.highlight ? 'text-amber-700 dark:text-amber-300' : ''}`}
                      >
                        {section.content}
                      </p>
                    )}
                  </section>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  약관 정보
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <strong>시행일:</strong> 2025년 10월 1일
                  </div>
                  <div>
                    <strong>버전:</strong> v1.0
                  </div>
                  <div>
                    <strong>문의:</strong> kysclient@gmail.com
                  </div>
                  <div>
                    <strong>관련 문서:</strong>
                    <Link href="/privacy" className="text-primary hover:underline ml-1">
                      개인정보처리방침
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
