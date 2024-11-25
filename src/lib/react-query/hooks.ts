import { useQuery } from "@tanstack/react-query"
import { queries } from "./queries"
import { WpEnv } from "@/lib/wpapi/WpEnv"
import { wpClient } from "@/lib/wpapi"
import { logger } from "../pino"

export type UsePostProps = {
  postId: number
}

export type UsePostsProps = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagSlug: WpEnv.TAG_SLUGS
  filterSticky: boolean
  maxPosts?: number
}

export type StrictUsePostsProps = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagIds: number[]
  filterSticky: boolean /** undefined for no filter; boolean for sticky or non-sticky only */
  maxPosts: number /** negative for unlimited; zero for noop; undefined for default */
}

export type LooseUsePostsProps = Omit<
  StrictUsePostsProps,
  "tagIds" | "maxPosts"
> &
  Partial<Pick<StrictUsePostsProps, "tagIds" | "maxPosts">>

export function usePostsV2(props: LooseUsePostsProps) {
  /**
   * normalize undefined values to default
   */
  let p: StrictUsePostsProps = {
    ...props,
    tagIds: props.tagIds ?? wpClient.getActiveYearTagIds(true),
    maxPosts: props.maxPosts ?? WpEnv.VISIBLE_ITEMS_PER_PAGE,
  }
  logger.debug(`p: ${JSON.stringify(p)}`)
  return useQuery(queries.posts.byCategory(p))
}

export function usePosts(props: UsePostsProps) {
  return useQuery(queries.posts.categorized(props))
}

export function usePost(props: UsePostProps) {
  return useQuery(queries.posts.single(props))
}
