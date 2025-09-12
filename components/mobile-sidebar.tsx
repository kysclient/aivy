"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChefHat, Home, User, Target, Heart, ShoppingCart, Settings, Menu, X } from "lucide-react"

interface MobileSidebarProps {
    currentStep: number
    onStepChange: (step: number) => void
}

export function MobileSidebar({ currentStep, onStepChange }: MobileSidebarProps) {
    const [isOpen, setIsOpen] = useState(false)

    const menuItems = [
        { icon: Home, label: "홈", step: -1 },
        { icon: User, label: "기본 정보", step: 0 },
        { icon: Target, label: "목표 설정", step: 1 },
        { icon: Heart, label: "식단 선호도", step: 2 },
        { icon: ChefHat, label: "식단 생성", step: 3 },
        { icon: ShoppingCart, label: "상품 추천", step: 4 },
        { icon: Settings, label: "설정", step: -2 },
    ]

    const handleItemClick = (step: number) => {
        if (step >= 0) {
            onStepChange(step)
        }
        setIsOpen(false)
    }

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Mobile Overlay & Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed left-0 top-0 h-full w-64 bg-card border-r z-50 flex flex-col"
                        >
                            {/* Logo */}
                            <div className="p-6 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                        <ChefHat className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-kakao font-bold font-primary">aivy</h1>

                                        <p className="text-xs text-muted-foreground">AI 식단 생성</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 p-4">
                                <ul className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Button
                                                variant={currentStep === item.step ? "default" : "ghost"}
                                                className="w-full justify-start gap-3 h-12"
                                                onClick={() => handleItemClick(item.step)}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-medium">{item.label}</span>
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
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
