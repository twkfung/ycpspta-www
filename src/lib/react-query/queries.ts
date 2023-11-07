import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory"
import { wpClient } from "@/lib/wpapi"
import { UsePostsProps } from "./hooks"

async function fetchPosts(props: UsePostsProps) {
  if (props.filterSticky) {
    const wpStickyPosts = await wpClient.fetchStickyPosts(props)
    const wpNonStickyPosts = await wpClient.fetchNonStickyPosts(props)
    return { stickyPosts: wpStickyPosts, posts: wpNonStickyPosts }
  }
  const wpPosts = await wpClient.fetchPosts(props)
  return { stickyPosts: [], posts: wpPosts }
}

const qkCategories = createQueryKeys("categories", {
  all: null,
})

const qkTags = createQueryKeys("tags", {
  all: null,
})

const qkPosts = createQueryKeys("posts", {
  single: null,
  categorized: (props: UsePostsProps) => ({
    queryKey: [props.categorySlug, props.tagSlug, props.filterSticky, props],
    queryFn: (_ctx) => fetchPosts(props),
  }),
})

export const queries = mergeQueryKeys(qkCategories, qkTags, qkPosts)
