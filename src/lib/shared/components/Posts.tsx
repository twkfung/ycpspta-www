"use client"

import { logger } from "@/lib/pino"
import { wp, type WpPost, mapWpPosts } from "@/lib/wpapi"
import dayjs from "@/lib/dayjs"
import { useState, useEffect } from "react"
import {
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material"
import { Markdown } from "@/lib/shared/components"

type Props = {
  categoryName: string
  tagName: string
}

export default function Posts({ categoryName, tagName }: Props) {
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<WpPost[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, tags] = await Promise.all([
          wp.categories().slug(categoryName),
          wp.tags().slug(tagName),
        ])
        const categoryId: number = cats[0].id
        const tagId: number = tags[0].id
        const posts = await wp
          .posts()
          .param("status", "publish")
          .param("categories", categoryId)
          .param("tags", tagId)
          .param("after", dayjs("2022-09-01").toISOString())
          .get()
        logger.info(posts, "posts fetched")
        const wpPosts = mapWpPosts(posts)
        setPosts(wpPosts)
      } catch (err) {
        logger.error(err, "error fetching posts")
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [categoryName, tagName])

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
