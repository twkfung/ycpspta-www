"use client"

import { usePost } from "@/lib/react-query/hooks"
import { CenteredBox } from "@/lib/shared/components/CenteredBox"
import { WpPost } from "@/lib/wpapi"
import { Paper, Stack, Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { PushPinTwoTone as IconPinned } from "@mui/icons-material"
import { Markdown } from "@/lib/shared/components"

export default function Page() {
  const params = useSearchParams()
  const paramPostId = params.get("postId")
  const router = useRouter()
  const isParamPostIdNull = paramPostId === null
  useEffect(() => {
    if (isParamPostIdNull) router.replace("/")
  }, [isParamPostIdNull, router])
  const postId = Number(paramPostId)
  const {
    isPending,
    isError,
    error,
    data: post,
    refetch,
  } = usePost({
    postId: postId,
  })

  if (isParamPostIdNull) return <main>Undefined</main>
  if (isNaN(postId))
    return (
      <main>
        <CenteredBox>
          <Typography>Invalid post id</Typography>
        </CenteredBox>
      </main>
    )
  if (isPending)
    return (
      <main>
        <CenteredBox>loading...</CenteredBox>
      </main>
    )
  if (isError)
    return (
      <main>
        <CenteredBox>
          <Typography variant="h5" gutterBottom color="error">
            Post not found
          </Typography>
        </CenteredBox>
      </main>
    )
  return (
    <main>
      <Post post={post} />
    </main>
  )
}

type PostProps = {
  post: WpPost
  showDate?: boolean
}

function Post({ post, showDate = true }: PostProps) {
  return (
    <Paper component={"article"} sx={{ padding: 1 }} elevation={4}>
      <Stack direction={"row"}>
        <Typography variant="h6">{post.title}</Typography>
        {post.sticky && <IconPinned fontSize="small" />}
      </Stack>
      {showDate && (
        <Typography variant="caption">{post.date.fromNow()}</Typography>
      )}
      <Markdown>{post.content}</Markdown>
    </Paper>
  )
}
