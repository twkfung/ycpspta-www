"use client"

import { Box, CircularProgress, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Main() {
  const router = useRouter()
  useEffect(() => router.replace("/members/news"), [router])
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          maxHeight: "400px",
          width: "100%",
        }}
      >
        <Typography>Redirecting...</Typography>
        <CircularProgress />
      </Box>
    </main>
  )
}
