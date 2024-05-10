"use client"

import { ReactQueryProvider } from "@/lib/react-query"
import { ThemeRegistry } from "@/ui/styles"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeRegistry>{children}</ThemeRegistry>
    </ReactQueryProvider>
  )
}
