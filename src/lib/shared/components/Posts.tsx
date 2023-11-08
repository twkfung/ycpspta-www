"use client"

import "@/styles/wp_block-library_style.css"

import { logger } from "@/lib/pino"
import { type WpPost } from "@/lib/wpapi"
import { useCallback, useState } from "react"
import {
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material"
import {
  ExpandLess as IconExpandLess,
  ExpandMore as IconExpandMore,
  PushPinTwoTone as IconPinned,
  OpenInNewTwoTone as IconOpenLink,
} from "@mui/icons-material"
import { Markdown } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"
import { CenteredBox } from "./CenteredBox"
import { usePosts } from "@/lib/react-query/hooks"
import Link from "next/link"

type Props = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagSlug: WpEnv.TAG_SLUGS
  showDate?: boolean
  maxPosts?: number
  collapseAfter?: number
  stickyFirst?: boolean
  showPermaLink?: boolean
}

export function Posts({
  categorySlug,
  tagSlug,
  showDate = false,
  maxPosts = WpEnv.ITEMS_PER_PAGE,
  collapseAfter = 5,
  stickyFirst,
  showPermaLink = false,
}: Props) {
  const { isPending, isError, data, error, refetch } = usePosts({
    categorySlug,
    tagSlug,
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
          <CollapsiblePost
            key={post.guid}
            showDate={showDate}
            post={post}
            defaultCollapsed={false}
            showPermaLink={showPermaLink}
          />
        ))}
      </Stack>
      <Stack divider={<Divider flexItem />}>
        {posts.map((post: WpPost, index) => (
          <CollapsiblePost
            key={post.guid}
            showDate={showDate}
            post={post}
            defaultCollapsed={
              collapseAfter === undefined || collapseAfter < 0
                ? false
                : index >= collapseAfter
            }
            showPermaLink={showPermaLink}
          />
        ))}
      </Stack>
    </section>
  )
}

type CollapsiblePostProps = {
  post: WpPost
  showDate?: boolean
  defaultCollapsed?: boolean
  showPermaLink?: boolean
}

function CollapsiblePost({
  post,
  showDate,
  defaultCollapsed = true,
  showPermaLink = false,
}: CollapsiblePostProps) {
  const [collapsed, setCollapse] = useState(!!defaultCollapsed)
  const handleCollapseToggle = useCallback(() => {
    setCollapse((prev) => !prev)
  }, [])
  return (
    <Paper component={"article"} sx={{ padding: 1 }} elevation={4}>
      <Stack onClick={handleCollapseToggle}>
        <Stack direction={"row"}>
          {collapsed ? <IconExpandMore /> : <IconExpandLess />}
          <Typography variant="h6">{post.title}</Typography>
          {post.sticky && <IconPinned fontSize="small" />}
          {showPermaLink && (
            <Link
              href={{
                pathname: "/post/",
                query: { postId: post.postId },
              }}
            >
              <IconButton aria-label="open post">
                <IconOpenLink fontSize="small" />
              </IconButton>
            </Link>
          )}
        </Stack>
        {showDate && (
          <Typography variant="caption">{post.date.fromNow()}</Typography>
        )}
      </Stack>
      {!collapsed && <Markdown>{post.content}</Markdown>}
    </Paper>
  )
}
