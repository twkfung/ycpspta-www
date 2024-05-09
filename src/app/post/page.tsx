"use client"

import { usePost } from "@/lib/react-query/hooks"
import { CenteredBox } from "@/ui/shared/CenteredBox"
import { Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Post } from "@/ui/shared/Post"

export default function Page() {
  const params = useSearchParams()
  const paramPostId = params.get("postId")
  const router = useRouter()
  const isParamPostIdNull = paramPostId === null || paramPostId === ""
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

  if (isNaN(postId) || isParamPostIdNull)
    return (
      <CenteredBox>
        <Typography>Invalid post id</Typography>
      </CenteredBox>
    )
  if (isPending) return <CenteredBox>loading...</CenteredBox>
  if (isError)
    return (
      <CenteredBox>
        <Typography variant="h5" gutterBottom color="error">
          Post not found
        </Typography>
      </CenteredBox>
    )
  return <Post post={post} collapsible={false} showDate={true} />
}
