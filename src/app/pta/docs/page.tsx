import { Posts } from "@/ui/shared"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.CATEGORY_SLUGS.PTA_DOCS}
        tagSlug={WpEnv.TAG_SLUGS.PTA_ALL_TIME}
      />
    </main>
  )
}
