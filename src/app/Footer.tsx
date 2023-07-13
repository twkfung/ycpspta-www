"use client"

import { Box, Typography, useTheme } from "@mui/material"

export function Footer() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography
        align="center"
        variant="caption"
        bgcolor={theme.palette.primary.light}
        flexGrow={1}
      >
        版權所有 &copy; 2023 油蔴地天主教小學(海泓道)家長教師會
      </Typography>
    </Box>
  )
}
