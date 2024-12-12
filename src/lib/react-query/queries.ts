import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory"
import { wpClient } from "@/lib/wpapi"
import { FetchPostsProps, UsePostProps } from "./hooks"
import { logger } from "../pino"

async function fetchPost(props: UsePostProps) {
  if (props.postId)
    return await wpClient.fetchPostById({ postId: props.postId })
  else return await wpClient.fetchPostBySlug(props)
}

async function fetchPosts(props: FetchPostsProps) {
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

function toKey(props: UsePostProps) {
  return props.postId ? props.postId : props.slug
}

const qkPosts = createQueryKeys("posts", {
  single: (props: UsePostProps) => ({
    queryKey: [toKey(props), props],
    queryFn: (_ctx) => fetchPost(props),
  }),
  byCategory: (props: FetchPostsProps) => {
    return {
      queryKey: [props.categorySlug, props.tagIds, props.filterSticky, props],
      queryFn: (_ctx) => fetchPosts(props),
    }
  },
})

export const queries = mergeQueryKeys(qkCategories, qkTags, qkPosts)
