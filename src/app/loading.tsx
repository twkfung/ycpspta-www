import { CenteredBox } from "@/lib/shared/components/CenteredBox"
import { CircularProgress, Typography } from "@mui/material"

export default function Loading() {
  return (
    <CenteredBox>
      <Typography>Loading...</Typography>
      <CircularProgress />
    </CenteredBox>
  )
}
