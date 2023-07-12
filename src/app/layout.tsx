import { fontsSans } from "./fonts"
import { Metadata } from "next"
import { Providers, Header, Footer, Navbar } from "./_components"
import { Box, Paper } from "@mui/material"

const fontFamily = fontsSans.map((font) => font.style.fontFamily).join(",")

export const metadata: Metadata = {
  title: "油蔴地天主教小學(海泓道)家長教師會",
  description: "Built using next app",
  viewport: { width: "device-width", initialScale: 1 },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body style={{ fontFamily: fontFamily, backgroundColor: "lightblue" }}>
        <Providers>
          {/* <header>
            <Header />
          </header> */}
          <Box sx={{ backgroundColor: "lightblue" }}>
            <nav>
              <Navbar />
            </nav>
            <section>
              <Box sx={{ backgroundColor: "white", margin: 1 }}>{children}</Box>
            </section>
            <footer>
              <Footer />
            </footer>
          </Box>
        </Providers>
      </body>
    </html>
  )
}
