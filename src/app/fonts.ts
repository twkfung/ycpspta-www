import {
  Roboto_Flex,
  Roboto_Mono,
  // Roboto_Slab,
  Noto_Sans_Mono,
  Noto_Sans_Display,
  Noto_Sans_HK,
  Noto_Sans_TC,
  Noto_Sans_SC,
  // Noto_Serif_HK,
} from "next/font/google"

const fontFallbackSans = Roboto_Flex({ subsets: ["latin"] })
const fontFallbackMono = Roboto_Mono({ subsets: ["latin"] })
// const fontFallbackSerif = Roboto_Slab({ subsets: ["latin"] })
const fontEngSans = Noto_Sans_Display({ subsets: ["latin"] })
const fontEngMono = Noto_Sans_Mono({ subsets: ["latin"] })
const fontChiSansHK400 = Noto_Sans_HK({ weight: "400", preload: false })
const fontChiSansTC400 = Noto_Sans_TC({ weight: "400", preload: false })
const fontChiSansSC400 = Noto_Sans_SC({ weight: "400", preload: false })
// const fontChiSerifHK400 = Noto_Serif_HK({ weight: "400", preload: false })

export const fontsSans = [
  fontChiSansHK400,
  fontChiSansTC400,
  fontChiSansSC400,
  fontEngSans,
  fontFallbackSans,
]

export const fontsMono = [fontEngMono, fontFallbackMono]
