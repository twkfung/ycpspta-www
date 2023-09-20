import dayjs from "@/lib/dayjs"

export module WpEnv {
  const anniversarySince = "2022-09-01"

  export const djsAnniversarySince = dayjs(anniversarySince)
  export enum wpTagSlugs {
    tag2022To2024 = "2022-2024",
  }
  export enum wpCategorySlugs {
    categoryMembersNews = "members-news",
    categoryPtaWords = "pta-words",
    categoryPtaExco = "pta-exco",
  }
}
