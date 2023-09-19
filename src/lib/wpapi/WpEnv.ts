import dayjs from "@/lib/dayjs"

export module WpEnv {
  const anniversarySince = "2022-09-01"

  export const djsAnniversarySince = dayjs(anniversarySince)
  export enum wpTagSlugs {
    tag2224 = "22-24",
  }
  export enum wpCategorySlugs {
    categoryMembersNews = "members-news",
  }
}
