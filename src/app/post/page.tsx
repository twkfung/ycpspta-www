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
  const paramSlug = params.get("slug")
  const router = useRouter()
  const isParamPostIdNull = paramPostId === null || paramPostId === ""
  const isParamSlugNull = paramSlug === null || paramSlug === ""
  useEffect(() => {
    if (isParamPostIdNull && isParamSlugNull) router.replace("/")
  }, [isParamPostIdNull, isParamSlugNull, router])
  const postId = isParamPostIdNull ? undefined : Number(paramPostId)
  const slug = paramSlug || ""
  const {
    isPending,
    isError,
    error,
    data: post,
    refetch,
  } = usePost({
    postId,
    slug,
  })

  if (
    (postId === undefined || isNaN(postId) || isParamPostIdNull) &&
    isParamSlugNull
  )
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
  return <Post post={post} collapsible={false} showDate={true} showSlugLink />
}
