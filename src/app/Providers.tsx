"use client"

import { theme } from "./theme"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { ReactQueryProvider } from "@/lib/react-query"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
