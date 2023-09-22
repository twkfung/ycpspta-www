import { Posts } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.CATEGORY_SLUGS.MEMBERS_NEWSLETTERS}
        tagSlug={WpEnv.TAG_SLUGS.PTA_ALL_TIME}
      />
    </main>
  )
}
