import { Box, Typography } from "@mui/material"

type Props = {
  title: string
}

export const TitledLayout =
  (props: Props) =>
  ({ children }: { children: React.ReactNode }) => {
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
            {props.title}
          </Typography>
        </header>
        <section>
          <Box sx={{ paddingX: 0 }}>{children}</Box>
        </section>
      </Box>
    )
  }
