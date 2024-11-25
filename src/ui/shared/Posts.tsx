"use client"

import "@/styles/wp_block-library_style.css"

import { logger } from "@/lib/pino"
import { type WpPost } from "@/lib/wpapi"
import {
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material"
import { WpEnv } from "@/lib/wpapi/WpEnv"
import { CenteredBox } from "./CenteredBox"
import { usePosts } from "@/lib/react-query/hooks"
import { Post } from "./Post"

type Props = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagIds?: number[]
  showDate?: boolean
  maxPosts?: number
  collapseAfter?: number
  stickyFirst?: boolean
  showPermaLink?: boolean
  showStickiness?: boolean
}

export function Posts({
  categorySlug,
  tagIds,
  showDate = false,
  maxPosts = WpEnv.VISIBLE_ITEMS_PER_PAGE,
  collapseAfter = 5,
  stickyFirst,
  showPermaLink = false,
  showStickiness = false,
}: Props) {
  const { isPending, isError, data, error, refetch } = usePosts({
    categorySlug,
    tagIds,
    filterSticky: !!stickyFirst,
    maxPosts,
  })

  const handleReload = async () => {
    refetch()
  }

  if (isError) {
    logger.error(error, "error fetching posts")
    return (
      <section>
        <CenteredBox>
          <Typography variant="h5" gutterBottom color="error">
            Error loading data
          </Typography>
          <Button variant="contained" onClick={handleReload}>
            Reload
          </Button>
        </CenteredBox>
      </section>
    )
  }

  if (isPending) {
    return (
      <section>
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      </section>
    )
  }

  const { stickyPosts, posts } = data
  if (stickyPosts.length === 0 && posts.length === 0)
    return (
      <section>
        <CenteredBox>
          <Typography>Coming soon. Stay tuned.</Typography>
        </CenteredBox>
      </section>
    )

  return (
    <section>
      <Stack divider={<Divider flexItem />}>
        {stickyPosts.map((post: WpPost, _index) => (
          <Post
            key={post.guid}
            showDate={showDate}
            post={post}
            defaultCollapsed={false}
            showPermaLink={showPermaLink}
            showStickiness={showStickiness}
          />
        ))}
      </Stack>
      <Stack divider={<Divider flexItem />}>
        {posts.map((post: WpPost, index) => (
          <Post
            key={post.guid}
            showDate={showDate}
            post={post}
            defaultCollapsed={
              collapseAfter === undefined || collapseAfter < 0
                ? false
                : index >= collapseAfter
            }
            showPermaLink={showPermaLink}
            showStickiness={showStickiness}
          />
        ))}
      </Stack>
    </section>
  )
}
