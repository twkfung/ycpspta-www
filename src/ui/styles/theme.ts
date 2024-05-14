"use client"

import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import { lightBlue, orange } from "@mui/material/colors"
import { fontsSans, fontsMono } from "."
import { NextFont } from "next/dist/compiled/@next/font"

function createFontFamily(
  fontsSans: NextFont[],
  fontsMono: NextFont[],
): string {
  return [...fontsSans, ...fontsMono]
    .map((font) => font.style.fontFamily)
    .join(",")
}

export const theme = responsiveFontSizes(
  createTheme({
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
        fontFamily: createFontFamily(fontsSans, fontsMono),
      },
    },
  }),
)
