import { Box, Typography } from "@mui/material"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <Typography
          variant="h5"
          color="secondary.contrastText"
          bgcolor="secondary.main"
          paddingX={1}
          align="center"
        >
          最新消息
        </Typography>
      </header>
      <section>
        <Box sx={{ padding: 1 }}>{children}</Box>
      </section>
    </>
  )
}
