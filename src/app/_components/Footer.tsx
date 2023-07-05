"use client"

import { Box, Typography } from "@mui/material"

export function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography align="center" variant="caption">
        Copyright(c)2023 Yaumati Catholic Primary School (Hoi Wang Road) Parent
        Teacher Association. All Rights Reserved
      </Typography>
    </Box>
  )
}
