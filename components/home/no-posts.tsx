import { EmptyTree } from "../icons";

export function NoPosts() {
    return (
        <div className="flex flex-col gap-4 items-center py-10">
            <div className="rounded-full p-2 flex items-center justify-center bg-muted flex-shrink-0 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px]">
                <EmptyTree className="text-description" />
            </div>
            <span className="text-description font-medium">아직 게시물이 없습니다.</span>
        </div>
    )
}
