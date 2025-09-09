"use client"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChefHat, Home, ShoppingCart, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
    const pathname = usePathname()

    const menuItems = [
        { icon: Home, label: "홈", href: "/" },
        { icon: ChefHat, label: "식단 생성", href: "/meal-plan" },
        { icon: ShoppingCart, label: "상품 추천", href: "/products" },
        { icon: Settings, label: "설정", href: "/settings" },
    ]

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r z-30 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                        <ChefHat className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-serif text-5xl italic">
                            Aivy
                        </h1>
                        <p className="text-xs text-muted-foreground">AI 식단 생성</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Button
                                variant={pathname === item.href ? "default" : "ghost"}
                                className="w-full justify-start gap-3 h-12"
                                asChild
                            >
                                <Link href={item.href}>
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Theme Toggle */}
            <div className="p-4 border-t">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">테마</span>
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    )
}
