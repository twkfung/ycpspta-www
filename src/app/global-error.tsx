"use client"

import { useEffect } from "react"
import { logger } from "@/lib/pino"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    logger.error(error, "Error reported in app global")
  }, [error])

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
      </body>
      <button onClick={() => reset()}>Try again</button>
    </html>
  )
}
