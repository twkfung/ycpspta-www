import {
  Roboto_Flex,
  Roboto_Mono,
  // Roboto_Slab,
  Noto_Sans_Mono,
  Noto_Sans_Display,
  Noto_Sans_HK,
  Noto_Sans_TC,
  Noto_Sans_SC,
} from "next/font/google"

const fontFallbackSans = Roboto_Flex({ subsets: ["latin"] })
const fontFallbackMono = Roboto_Mono({ subsets: ["latin"] })
// const fontFallbackSerif = Roboto_Slab({ subsets: ["latin"] })
const fontEngSans = Noto_Sans_Display({ subsets: ["latin"] })
const fontEngMono = Noto_Sans_Mono({ subsets: ["latin"] })
const fontChiSansHK400 = Noto_Sans_HK({ weight: "400", subsets: ["latin"] })
const fontChiSansTC400 = Noto_Sans_TC({ weight: "400", subsets: ["latin"] })
const fontChiSansSC400 = Noto_Sans_SC({ weight: "400", subsets: ["latin"] })

export const fontsSans = [
  fontEngSans,
  fontChiSansHK400,
  fontChiSansTC400,
  fontChiSansSC400,
  fontFallbackSans,
]

export const fontsMono = [fontEngMono, fontFallbackMono]
