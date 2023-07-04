"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Main() {
  const router = useRouter()
  useEffect(() => router.replace("/news"), [router])
  return (
    <main>
      <section>Loading...</section>
    </main>
  )
}
