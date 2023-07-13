import { Box, Typography } from "@mui/material"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box>
      <header>
        <Typography
          variant="h5"
          color="secondary.contrastText"
          bgcolor="secondary.main"
          paddingX={1}
          align="center"
        >
          主席的話
        </Typography>
      </header>
      <section>
        <Box sx={{ paddingX: 0 }}>{children}</Box>
      </section>
    </Box>
  )
}
