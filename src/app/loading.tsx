import { CenteredBox } from "@/ui/shared/CenteredBox"
import { CircularProgress, Typography } from "@mui/material"

export default function Loading() {
  return (
    <CenteredBox>
      <Typography>Loading...</Typography>
      <CircularProgress />
    </CenteredBox>
  )
}
