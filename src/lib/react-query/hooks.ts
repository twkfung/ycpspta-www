import { useQuery } from "@tanstack/react-query"
import { queries } from "./queries"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export type UsePostProps = {
  postId: number
}

export type UsePostsProps = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagSlug: WpEnv.TAG_SLUGS
  filterSticky: boolean
  maxPosts?: number
}

export function usePosts(props: UsePostsProps) {
  return useQuery(queries.posts.categorized(props))
}

export function usePost(props: UsePostProps) {
  return useQuery(queries.posts.single(props))
}
