"use client"

import { logger } from "@/lib/pino"
import { wp, type WpPost, type WpPostJson } from "@/lib/wpapi"
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

export default function Page() {
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<WpPost[]>([])
  useEffect(() => {
    const categoryName = "members-news"
    const tagName = "22-24"
    const fetchData = async () => {
      try {
        const cats = await wp.categories().slug(categoryName)
        const categoryId: number = cats[0].id
        const tags = await wp.tags().slug(tagName)
        const tagId: number = tags[0].id
        const posts = await wp
          .posts()
          .param("status", "publish")
          .param("categories", categoryId)
          .param("tags", tagId)
          .param("after", dayjs("2022-09-01").toISOString())
          .get()
        logger.info(posts, "posts fetched")
        const wpPosts: WpPost[] = posts.map((post: WpPostJson) => {
          return {
            postId: post.id,
            date: dayjs(post.date),
            guid: post.guid,
            title: post.title.rendered,
            content: post.content.rendered,
            excerpt: post.excerpt.rendered,
          }
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
  }, [])

  return (
    <main>
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
    </main>
  )
}
