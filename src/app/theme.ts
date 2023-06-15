import { createTheme } from "@mui/material/styles"
import { fontsSans, fontsMono } from "./fonts"

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: [...fontsSans, ...fontsMono]
        .map((font) => font.style.fontFamily)
        .join(","),
    },
  },
})
