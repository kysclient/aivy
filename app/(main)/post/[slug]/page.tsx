import { PostDetail } from "@/components/post/post-detail"

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const { slug } = params
    return <PostDetail />
}
