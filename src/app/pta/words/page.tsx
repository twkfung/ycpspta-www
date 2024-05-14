import { Posts } from "@/ui/shared"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.CATEGORY_SLUGS.PTA_WORDS}
        tagSlug={WpEnv.TAG_SLUGS.PTA_2022_TO_2024}
      />
    </main>
  )
}
