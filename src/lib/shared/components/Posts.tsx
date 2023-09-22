"use client"

import "@/styles/wp_block-library_style.css"

import { logger } from "@/lib/pino"
import { type WpPost, wpClient } from "@/lib/wpapi"
import { useState, useEffect, useCallback } from "react"
import {
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material"
import { Markdown } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"
import { CenteredBox } from "./CenteredBox"

type Props = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagSlug: WpEnv.TAG_SLUGS
  showDate?: boolean
  // maxPosts?: number
  // collapseAfter?: number
}

export function Posts({ categorySlug, tagSlug, showDate = false }: Props) {
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<WpPost[]>([])
  const fetchData = useCallback(async () => {
    try {
      const wpPosts = await wpClient.loadPublishedPosts({
        categorySlug,
        tagSlug,
      })
      setPosts(wpPosts)
    } catch (err) {
      logger.error(err, "error fetching posts")
      setError(err)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [categorySlug, tagSlug])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleReload = async () => {
    setError(null)
    setLoading(true)
    setPosts([])
    await fetchData()
  }

  if (error) {
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

  if (loading) {
    return (
      <section>
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      </section>
    )
  }

  if (posts.length == 0)
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
        {posts.map((post: WpPost) => (
          <Paper
            component={"article"}
            key={post.guid}
            sx={{ padding: 1 }}
            elevation={4}
          >
            <Stack>
              <Typography variant="h6">{post.title}</Typography>
              {showDate && (
                <Typography variant="caption">{post.date.fromNow()}</Typography>
              )}
            </Stack>
            <Markdown>{post.content}</Markdown>
          </Paper>
        ))}
      </Stack>
    </section>
  )
}
