import { Box, CircularProgress, Typography } from "@mui/material"

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        maxHeight: "400px",
        width: "100%",
      }}
    >
      <Typography>Loading...</Typography>
      <CircularProgress />
    </Box>
  )
}
