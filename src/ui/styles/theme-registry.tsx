"use client"

import React from "react"
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"

import { theme } from "."
import {
  AppRouterCacheProvider,
  AppRouterCacheProviderProps,
} from "@mui/material-nextjs/v14-appRouter"

type CreateCacheOptions = AppRouterCacheProviderProps["options"]

export function ThemeRegistry({
  children,
  options,
}: React.PropsWithChildren<{ options?: CreateCacheOptions }>) {
  return (
    /* Official CacheProvider from mui
     * @see https://mui.com/material-ui/guides/nextjs/
     */
    <AppRouterCacheProvider options={options}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
