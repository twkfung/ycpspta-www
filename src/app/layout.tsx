import { fontsSans } from "./fonts"
import { Metadata, Viewport } from "next"
import { Providers } from "./Providers"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { Box } from "@mui/material"

const fontFamily = fontsSans.map((font) => font.style.fontFamily).join(",")

export const metadata: Metadata = {
  title: "油蔴地天主教小學(海泓道)家長教師會",
  description: "Built using next app",
  // viewport: { width: "device-width", initialScale: 1 },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body style={{ fontFamily: fontFamily, backgroundColor: "white" }}>
        <Providers>
          {/* <header>
            <Header />
          </header> */}
          <Box
            sx={{
              backgroundColor: "lightblue",
            }}
          >
            <nav>
              <Navbar />
            </nav>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  margin: 1,
                  width: "100%",
                  maxWidth: "800px",
                }}
              >
                {children}
              </Box>
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
