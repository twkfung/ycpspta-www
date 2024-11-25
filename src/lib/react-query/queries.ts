import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory"
import { wpClient } from "@/lib/wpapi"
import { StrictUsePostsProps, UsePostProps, UsePostsProps } from "./hooks"
import { logger } from "../pino"

async function fetchPost(props: UsePostProps) {
  return await wpClient.fetchPost(props)
}

async function fetchPosts(props: StrictUsePostsProps) {
  logger.info(`fetchPosts props: ${JSON.stringify(props)}`)
  if (props.filterSticky) {
    const wpStickyPosts = await wpClient.getPosts({ ...props, sticky: true })
    logger.info(
      `fetchPosts getPosts sticky:${JSON.stringify(wpStickyPosts.length)}`,
    )
    const wpNonStickyPosts = await wpClient.getPosts({
      ...props,
      sticky: false,
    })
    logger.info(
      `fetchPosts getPosts non-sticky:${JSON.stringify(wpNonStickyPosts.length)}`,
    )
    return { stickyPosts: wpStickyPosts, posts: wpNonStickyPosts }
  }
  const wpPosts = await wpClient.getPosts(props)
  logger.info(`fetchPosts getPosts all:${JSON.stringify(wpPosts.length)}`)
  return { stickyPosts: [], posts: wpPosts }
}

const qkCategories = createQueryKeys("categories", {
  all: null,
})

const qkTags = createQueryKeys("tags", {
  all: null,
})

const qkPosts = createQueryKeys("posts", {
  single: (props: UsePostProps) => ({
    queryKey: [props.postId, props],
    queryFn: (_ctx) => fetchPost(props),
  }),
  byCategory: (props: StrictUsePostsProps) => {
    return {
      queryKey: [props.categorySlug, props.tagIds, props.filterSticky, props],
      queryFn: (_ctx) => fetchPosts(props),
    }
  },
})

export const queries = mergeQueryKeys(qkCategories, qkTags, qkPosts)
