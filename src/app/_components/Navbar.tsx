"use client"

import Link from "next/link"
import { Divider, Stack, Typography } from "@mui/material"

export function Navbar() {
  return (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Link href="/">
        <Typography variant="button">首頁</Typography>
      </Link>
      <Link href="/news">
        <Typography variant="button">最新消息</Typography>
      </Link>
      <Link href="/news/inside">
        <Typography variant="button">inside</Typography>
      </Link>
    </Stack>
  )
}
