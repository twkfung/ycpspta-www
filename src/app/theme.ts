import { createTheme } from "@mui/material/styles"
import { lightBlue, orange } from "@mui/material/colors"
import { fontsSans, fontsMono } from "./fonts"

export const theme = createTheme({
  palette: {
    primary: {
      main: lightBlue[600],
    },
    secondary: {
      main: orange[600],
    },
  },
  typography: {
    allVariants: {
      fontFamily: [...fontsSans, ...fontsMono]
        .map((font) => font.style.fontFamily)
        .join(","),
    },
  },
})
