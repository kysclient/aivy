import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMemo } from "react";

type ThemeOption = 'system' | 'light' | 'dark' | 'deep-dark'

export function Logo({ className = '' }: { className?: string }) {
    const { theme, systemTheme } = useTheme();


    const isDarkMode = useMemo(() => {
        if (theme === 'system') {
            return systemTheme === 'dark'
        }
        return theme === 'dark' || theme === 'deep-dark'
    }, [theme, systemTheme])

    const logoSrc = isDarkMode ? '/logos/logo_white.png' : '/logos/logo_black.png'

    return (
        <>
            <Image src={logoSrc} alt="aivy logo" width={200} height={200} className={cn('', className)} />
        </>
    )
}