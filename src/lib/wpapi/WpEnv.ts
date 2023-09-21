import dayjs from "@/lib/dayjs"

export module WpEnv {
  const anniversarySince = "2022-09-01"

  export const djsAnniversarySince = dayjs(anniversarySince)
  export enum TAG_SLUGS {
    PTA_2022_TO_2024 = "PTA-2022-2024",
  }
  export enum CATEGORY_SLUGS {
    MEMBERS_NEWS = "members-news",
    PTA_WORDS = "pta-words",
    PTA_EXCO = "pta-exco",
    PTA_DOCS = "pta-docs",
    HELPERS_RECRUIT = "helpers-recruit",
  }
}
