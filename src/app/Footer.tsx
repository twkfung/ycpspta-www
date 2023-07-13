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
        版權所有 &copy; 2023 油蔴地天主教小學(海泓道)家長教師會
      </Typography>
    </Box>
  )
}
