import { Posts } from "@/ui/shared"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.CATEGORY_SLUGS.MEMBERS_NOTICES}
        tagSlug={WpEnv.TAG_SLUGS.PTA_2022_TO_2024}
      />
    </main>
  )
}
