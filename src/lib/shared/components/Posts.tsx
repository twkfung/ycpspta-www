"use client"

import { logger } from "@/lib/pino"
import { type WpPost, wpClient } from "@/lib/wpapi"
import { useState, useEffect } from "react"
import {
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material"
import { Markdown } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"

type Props = {
  categorySlug: WpEnv.wpCategorySlugs
  tagSlug: WpEnv.wpTagSlugs
}

export function Posts({ categorySlug, tagSlug }: Props) {
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<WpPost[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wpPosts = await wpClient.loadPublishedPosts({
          categorySlug,
          tagSlug,
        })
        setPosts(wpPosts)
      } catch (err) {
        logger.error(err, "error fetching posts")
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [categorySlug, tagSlug])

  return (
    <section>
      {loading && <CircularProgress />}
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
              <Typography variant="caption">{post.date.fromNow()}</Typography>
            </Stack>
            <Markdown>{post.content}</Markdown>
          </Paper>
        ))}
      </Stack>
    </section>
  )
}
