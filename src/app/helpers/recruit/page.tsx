import { Posts } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"

export default function Page() {
  return (
    <main>
      <Posts
        categorySlug={WpEnv.wpCategorySlugs.categoryHelpersRecruit}
        tagSlug={WpEnv.wpTagSlugs.tag2022To2024}
      />
    </main>
  )
}
