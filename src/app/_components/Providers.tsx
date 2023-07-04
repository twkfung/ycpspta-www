"use client"

import { theme } from "../theme"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
