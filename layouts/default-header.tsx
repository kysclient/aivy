import BackButton from "@/components/ui/back-button";

export function DefaultHeader({ title, showBackButton = true }: { title: string; showBackButton?: boolean }) {
    return (
        <div className="flex flex-row items-center fixed sm:relative top-0 bg-background z-50 w-full">
            <div
                style={{
                    padding: '12px 20px 8px'
                }}
                className="flex flex-row items-center gap-2 border-b border-border w-full"
            >
                {showBackButton && <BackButton />}
                <div className="text-foreground text-lg font-bold">{title}</div>
            </div>
        </div>
    )
}
