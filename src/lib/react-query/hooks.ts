import { useQuery } from "@tanstack/react-query"
import { queries } from "./queries"
import { WpEnv } from "@/lib/wpapi/WpEnv"
import { wpClient } from "@/lib/wpapi"
import { logger } from "@/lib/pino"

export type UsePostProps = {
  postId?: number
  slug: string
}

export type UsePostByIdProps = {
  postId: number
}
export type UsePostBySlugProps = { slug: string }

export type FetchPostsProps = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagIds: number[]
  filterSticky: boolean /** undefined for no filter; boolean for sticky or non-sticky only */
  maxPosts: number /** negative for unlimited; zero for noop; undefined for default */
}

export type UsePostsProps = Omit<FetchPostsProps, "tagIds" | "maxPosts"> &
  Partial<Pick<FetchPostsProps, "tagIds" | "maxPosts">>

export function usePosts(props: UsePostsProps) {
  /**
   * normalize undefined values to default
   */
  let p: FetchPostsProps = {
    ...props,
    tagIds: props.tagIds ?? wpClient.getActiveYearTagIds(true),
    maxPosts: props.maxPosts ?? WpEnv.VISIBLE_ITEMS_PER_PAGE,
  }
  logger.debug(`p: ${JSON.stringify(p)}`)
  return useQuery(queries.posts.byCategory(p))
}

export function usePost(props: UsePostProps) {
  return useQuery(queries.posts.single(props))
}
