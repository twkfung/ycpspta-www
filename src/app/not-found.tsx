import { Paper, Typography } from "@mui/material"
import Link from "next/link"

export default function NotFound() {
  return (
    <Paper>
      <Typography variant="h4">Not Found</Typography>
      <Typography variant="body1">
        Could not find requested resource.
      </Typography>
      <Typography variant="body1">
        Back to <Link href="/">Home</Link>
      </Typography>
    </Paper>
  )
}
