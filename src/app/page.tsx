"use client"

import { CenteredBox } from "@/lib/shared/components/CenteredBox"
import { CircularProgress, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Main() {
  const router = useRouter()
  useEffect(() => router.replace("/members/news"), [router])
  return (
    <main>
      <CenteredBox>
        <Typography>Redirecting...</Typography>
        <CircularProgress />
      </CenteredBox>
    </main>
  )
}
