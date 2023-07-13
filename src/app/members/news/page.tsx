"use client"

import { logger } from "@/lib/pino"
import { wp } from "@/lib/wpapi"
import dayjs from "@/lib/dayjs"
import { useState, useEffect } from "react"
import { Paper, Typography, Box, Stack, Divider } from "@mui/material"
import Markdown from "@/lib/shared/components/Markdown"

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
    wp.categories()
      .slug("members-news")
      .then((cats) => {
        const categoryIdMembersNews: number = cats[0].id
        wp.tags()
          .slug("22-24")
          .then((tags) => {
            const tagId2224: number = tags[0].id
            wp.posts()
              .param("status", "publish")
              .param("categories", categoryIdMembersNews)
              .param("tags", tagId2224)
              .param("after", dayjs("2022-09-01").toISOString())
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
          })
      })
  }, [])

  return (
    <main>
      {loading && "loading..."}
      <Stack divider={<Divider flexItem />}>
        {posts.map((post: WpPost) => (
          <Paper
            component={"article"}
            key={post.guid}
            sx={{ padding: 1 }}
            elevation={4}
          >
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
      </Stack>
    </main>
  )
}
