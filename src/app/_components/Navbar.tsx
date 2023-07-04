import Link from "next/link"

export function Navbar() {
  return (
    <>
      <Link href="/">首頁</Link> | <Link href="/news">最新消息</Link> |{" "}
      <Link href="/news/inside">inside</Link>
    </>
  )
}
