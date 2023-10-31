"use client"

import { Box, Typography, useTheme } from "@mui/material"
import { EmailOutlined as IconContact } from "@mui/icons-material"
import { useRouter } from "next/navigation"

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
      <IconContact
        sx={{ marginLeft: 4, fontSize: "1rem", color: "white" }}
        onClick={() => {
          router.push("/pta/contact/")
        }}
      />
      <Typography align="center" variant="caption" flexGrow={1}>
        版權所有 &copy; 2023 油蔴地天主教小學(海泓道)家長教師會
      </Typography>
    </Box>
  )
}
