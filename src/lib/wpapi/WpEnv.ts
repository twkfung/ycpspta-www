import dayjs from "@/lib/dayjs"

export namespace WpEnv {
  export const VISIBLE_ITEMS_PER_PAGE = 50
  export const PAGINATION_SIZE = 100 // wp accepts max 100

  const anniversarySince = "2022-09-01"

  export const djsAnniversarySince = dayjs(anniversarySince)
  export enum PAGE_SLUGS {
    CONFIG = "config",
  }
  export enum TAG_SLUGS {
    PTA_ALL_TIME = "pta-all-time",
    // PTA_2022_TO_2024 = "pta-2022-2024",
  }
  export enum CATEGORY_SLUGS {
    MEMBERS_NEWS = "members-news",
    MEMBERS_NOTICES = "members-notices",
    MEMBERS_NEWSLETTERS = "members-newsletters",
    MEMBERS_WELFARE = "members-welfare",
    PTA_WORDS = "pta-words",
    PTA_EXCO = "pta-exco",
    PTA_DOCS = "pta-docs",
    PTA_CONTACT = "pta-contact",
    HELPERS_RECRUIT = "helpers-recruit",
    HELPERS_HANDBOOK = "helpers-handbook",
    HELPERS_CODE = "helpers-code",
    EVENTS_CALENDAR = "events-calendar",
    EVENTS_ALBUMS = "events-albums",
    EVENTS_PROMO = "events-promo",

    // ENV = "env",
  }
}
