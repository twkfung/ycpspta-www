import {
  Roboto_Flex,
  Roboto_Mono,
  // Roboto_Slab,
  Noto_Sans_Mono,
  Noto_Sans_Display,
  Noto_Sans_HK,
  // Noto_Sans_TC,
  // Noto_Sans_SC,
  // Noto_Serif_HK,
  Noto_Sans_Symbols,
  Noto_Sans_Symbols_2,
  Noto_Sans,
} from "next/font/google"

const fontFallbackSans = Roboto_Flex({ subsets: ["latin"] })
const fontFallbackMono = Roboto_Mono({ subsets: ["latin"] })
// const fontFallbackSerif = Roboto_Slab({ subsets: ["latin"] })
const fontEngSans = Noto_Sans_Display({ subsets: ["latin"] })
const fontEngMono = Noto_Sans_Mono({ subsets: ["latin"] })
const fontChiSansHK = Noto_Sans_HK({ weight: ["400", "700"], preload: false })
// const fontChiSansTC = Noto_Sans_TC({ weight: "400", preload: false })
// const fontChiSansSC = Noto_Sans_SC({ weight: "400", preload: false })
// const fontChiSerifHK = Noto_Serif_HK({ weight: "400", preload: false })
const fontSansSymbol = Noto_Sans_Symbols({ subsets: ["latin"] })
const fontSansSymbol2 = Noto_Sans_Symbols_2({
  weight: "400",
  subsets: ["latin"],
})

export const fontsSans = [
  fontEngSans,
  // fontChiSerifHK,
  fontChiSansHK,
  // fontChiSansTC,
  // fontChiSansSC,
  fontSansSymbol,
  fontSansSymbol2,
  // fontFallbackSans,
]

export const fontsMono = [fontEngMono /* , fontFallbackMono */]
