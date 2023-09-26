import { Posts } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.CATEGORY_SLUGS.HELPERS_CODE}
        tagSlug={WpEnv.TAG_SLUGS.PTA_2022_TO_2024}
      />
    </main>
  )
}
