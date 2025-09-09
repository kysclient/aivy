import { Background } from "@/components/background";
import { Newsletter } from "@/components/newsletter";

export default function Page() {
    return (
        <>
            <main className="p-inset h-[100dvh] w-full bg-black">
                <div className="relative h-full w-full">
                    <Background src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/default-cyTx6Z9dTeG6MKhxG1vxhlKbZuCu0K.mp4" placeholder="/default-placeholder.png" />
                    <Newsletter />
                    {/* <Footer /> */}
                </div>
            </main>
        </>
    )
}