import { Posts } from "@/ui/shared"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.CATEGORY_SLUGS.MEMBERS_NOTICES}
        stickyFirst
        showStickiness
      />
    </main>
  )
}
