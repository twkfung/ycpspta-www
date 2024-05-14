"use client"

import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

export const CenteredBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  maxHeight: "400px",
})
