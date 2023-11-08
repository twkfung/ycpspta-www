"use client"

import { TitledLayout } from "@/lib/shared/components"
import { Button, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

const props = {
  title: "文章",
}

const PageLayout = TitledLayout(props)
const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  return (
    <Stack sx={{ display: "flex" }}>
      <PageLayout>{children}</PageLayout>
      <Button
        sx={{ flexGrow: 1 }}
        variant="contained"
        color="inherit"
        onClick={() => {
          router.back()
        }}
      >
        返回
      </Button>
    </Stack>
  )
}
export default Layout
