import { Posts } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.CATEGORY_SLUGS.MEMBERS_NEWS}
        tagSlug={WpEnv.TAG_SLUGS.PTA_2022_TO_2024}
      />
    </main>
  )
}
