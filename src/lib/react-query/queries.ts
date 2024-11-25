import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory"
import { wpClient } from "@/lib/wpapi"
import {
  LooseUsePostsProps,
  StrictUsePostsProps,
  UsePostProps,
  UsePostsProps,
} from "./hooks"
import { WpEnv } from "@/lib/wpapi/WpEnv"
import { logger } from "../pino"

async function fetchPost(props: UsePostProps) {
  return await wpClient.fetchPost(props)
}

async function fetchPosts(props: UsePostsProps) {
  if (props.filterSticky) {
    const wpStickyPosts = await wpClient.fetchStickyPosts(props)
    const wpNonStickyPosts = await wpClient.fetchNonStickyPosts(props)
    return { stickyPosts: wpStickyPosts, posts: wpNonStickyPosts }
  }
  const wpPosts = await wpClient.fetchPosts(props)
  return { stickyPosts: [], posts: wpPosts }
}

async function fetchPostsV2(props: StrictUsePostsProps) {
  logger.info(`fetchPostsV2 props: ${JSON.stringify(props)}`)
  if (props.filterSticky) {
    const wpStickyPosts = await wpClient.getPosts({ ...props, sticky: true })
    logger.info(
      `fetchPostsV2 getPosts sticky:${JSON.stringify(wpStickyPosts.length)}`,
    )
    const wpNonStickyPosts = await wpClient.getPosts({
      ...props,
      sticky: false,
    })
    logger.info(
      `fetchPostsV2 getPosts non-sticky:${JSON.stringify(wpNonStickyPosts.length)}`,
    )
    return { stickyPosts: wpStickyPosts, posts: wpNonStickyPosts }
  }
  const wpPosts = await wpClient.getPosts(props)
  logger.info(`fetchPostsV2 getPosts all:${JSON.stringify(wpPosts.length)}`)
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
  categorized: (props: UsePostsProps) => ({
    queryKey: [props.categorySlug, props.tagSlug, props.filterSticky, props],
    queryFn: (_ctx) => fetchPosts(props),
  }),
  byCategory: (props: StrictUsePostsProps) => {
    return {
      queryKey: [
        props.categorySlug,
        props.tagIds,
        props.filterSticky,
        // props.maxPosts,
        props,
      ],
      queryFn: (_ctx) => fetchPostsV2(props),
    }
  },
})

export const queries = mergeQueryKeys(qkCategories, qkTags, qkPosts)
