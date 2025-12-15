import HomeShell from "@/components/home-shell"
import { getLatestPosts } from "@/lib/blog"

export default async function Home() {
  const posts = await getLatestPosts(5)
  return <HomeShell posts={posts} />
}
