"use client"
import { type WpPost } from "@/lib/wpapi"
import { useCallback, useState } from "react"
import { Paper, Typography, Stack, IconButton } from "@mui/material"
import {
  ExpandLess as IconExpandLess,
  ExpandMore as IconExpandMore,
  PushPinTwoTone as IconPinned,
  OpenInNewTwoTone as IconOpenLink,
} from "@mui/icons-material"
import { Markdown } from "@/lib/shared/components"
import Link from "next/link"

type PostProps = {
  post: WpPost
  showDate?: boolean
  collapsible?: boolean
  defaultCollapsed?: boolean
  showPermaLink?: boolean
  showStickiness?: boolean
}
export function Post({
  post,
  collapsible = true,
  defaultCollapsed = false,
  showDate = false,
  showPermaLink = false,
  showStickiness = false,
}: PostProps) {
  const [collapsed, setCollapse] = useState(!!defaultCollapsed)
  const handleCollapseToggle = useCallback(() => {
    if (collapsible) setCollapse((prev) => !prev)
  }, [collapsible])
  return (
    <Paper component={"article"} sx={{ padding: 1 }} elevation={4}>
      <Stack onClick={handleCollapseToggle}>
        <Stack
          direction={"row"}
          bgcolor={"lightgrey"}
          paddingLeft={collapsible ? 0 : 1}
        >
          {collapsible ? (
            collapsed ? (
              <IconExpandMore />
            ) : (
              <IconExpandLess />
            )
          ) : (
            false
          )}
          <Typography variant="h6">{post.title}</Typography>
          {showStickiness && post.sticky && <IconPinned fontSize="small" />}
          {showPermaLink && (
            <Link
              href={{
                pathname: "/post/",
                query: { postId: post.postId },
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <IconButton aria-label="open post">
                <IconOpenLink fontSize="small" />
              </IconButton>
            </Link>
          )}
        </Stack>
        {showDate && (
          <Typography variant="caption">{post.date.fromNow()}</Typography>
        )}
      </Stack>
      {!collapsed && <Markdown>{post.content}</Markdown>}
    </Paper>
  )
}
