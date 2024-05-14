"use client"

import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { EmailOutlined as IconContact } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dayjs from "@/lib/dayjs"

export function Footer() {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        direction: "row",
        alignItems: "center",
        bgcolor: theme.palette.primary.light, // lightblue
      }}
    >
      <Link href="/pta/contact/">
        <IconButton sx={{ marginLeft: 4, color: "white" }}>
          <IconContact sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Link>
      <Typography align="center" variant="caption" flexGrow={1}>
        版權所有 &copy; {dayjs().year()} 油蔴地天主教小學(海泓道)家長教師會
      </Typography>
    </Box>
  )
}
