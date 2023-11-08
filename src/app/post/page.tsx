"use client"

import { usePost } from "@/lib/react-query/hooks"
import { CenteredBox } from "@/lib/shared/components/CenteredBox"
import { Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Post } from "@/lib/shared/components/Post"

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
      <Post post={post} collapsible={false} showDate={true} />
    </main>
  )
}
