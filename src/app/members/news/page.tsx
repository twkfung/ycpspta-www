"use client"

import { logger } from "@/lib/pino"
import { wp } from "@/lib/wpapi"
import dayjs from "@/lib/dayjs"
import { useState, useEffect } from "react"
import { Paper, Typography, Box, Stack } from "@mui/material"
import Markdown from "@/app/_components/Markdown"

type WpPostJson = {
  id: number
  date: string
  guid: {
    rendered: string
  }
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
}

type WpPost = {
  postId: number
  date: dayjs.Dayjs
  guid: string
  title: string
  content: string
  excerpt: string
}

export default function Page() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<WpPost[]>([])
  useEffect(() => {
    wp.posts()
      .param("status", "publish")
      .get()
      .then((posts) => {
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
      })
      .catch((err) => {
        logger.error(err, "error fetching posts")
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <section>
        {loading && "loading..."}
        {posts.map((post: WpPost) => (
          <Paper key={post.guid}>
            <Stack
            // direction={"row"}
            // justifyContent={"left"}
            // justifyItems={"baseline"}
            >
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="caption">{post.date.fromNow()}</Typography>
            </Stack>
            <Markdown>{post.content}</Markdown>
          </Paper>
        ))}
      </section>
    </main>
  )
}
