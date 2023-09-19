import { Posts } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.wpCategorySlugs.categoryMembersNews}
        tagSlug={WpEnv.wpTagSlugs.tag2224}
      />
    </main>
  )
}
