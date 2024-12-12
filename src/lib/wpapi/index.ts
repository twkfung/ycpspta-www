"use client"

import WPAPI from "wpapi"
import dayjs from "@/lib/dayjs"
import { WpEnv } from "./WpEnv"
import { logger } from "@/lib/pino"
import z from "zod"
import { FetchPostsProps } from "@/lib/react-query/hooks"

export type WpCategory = {
  id: number
  link: string
  slug: string
  parent: number
  name: string
  description: string
}

export type WpTag = {
  id: number
  link: string
  slug: string
  name: string
}

export type WpPage = {
  id: number
  slug: string
  content: {
    rendered: string
  }
}

type FetchFnParams = {
  offset: number
  pageSize: number
}

type FetchFn = (params: FetchFnParams) => Promise<WpPostJson[]>

const Config = z
  .object({
    activeTags: z.string().array(),
  })
  .passthrough()
type Config = z.infer<typeof Config>

const CONFIG_DEFAULT = {
  activeTags: ["pta-all-time"],
}

class WpClient {
  public wp: WPAPI
  private categoryIdMap: Map<string, WpCategory> = new Map()
  private tagIdMap: Map<string, WpTag> = new Map()
  private categoriesLoaded = false
  private tagsLoaded = false
  private activeYearTagIds: number[] = []
  private allTimeYearTagId: number = 0
  private configLoaded = false
  private config: Config = CONFIG_DEFAULT

  private constructor(wp: WPAPI) {
    this.wp = wp
  }
  public static create(wp: WPAPI): WpClient {
    return new WpClient(wp)
  }
  private async loadConfig() {
    if (this.configLoaded) return
    await this.loadTags()
    let tagId = this.getTagId(WpEnv.TAG_SLUGS.PTA_ALL_TIME)
    if (tagId === undefined) throw new Error("undefined all-time year tag id")
    this.allTimeYearTagId = tagId

    const pages: WpPage[] = await this.wp.pages().slug(WpEnv.PAGE_SLUGS.CONFIG)
    if (pages.length > 0) {
      const page = pages[0]
      const text = extractTextFromHtml(page.content.rendered)
      const json = text ? JSON.parse(text) : CONFIG_DEFAULT
      const parsing = Config.safeParse(json)
      if (parsing.success) {
        this.config = parsing.data
      } else {
        logger.error(parsing.error, "error")
      }
    }
    this.activeYearTagIds = (
      await Promise.all(
        this.config.activeTags.map(async (tag) => this.getTagId(tag)),
      )
    ).filter((a) => a !== undefined)
    logger.debug(`config: ${JSON.stringify(this.config)}`)
    logger.debug(`allTimeYearTagId: ${this.allTimeYearTagId}`)
    logger.debug(`activeYearTagIds: ${JSON.stringify(this.activeYearTagIds)}`)
    this.configLoaded = true
  }
  public getActiveYearTagIds(appendAllTime?: boolean) {
    let ids = this.activeYearTagIds
    this.loadConfig().then(() => {
      ids = this.activeYearTagIds
    })
    if (appendAllTime) {
      if (!ids.includes(this.allTimeYearTagId))
        return [...ids, this.allTimeYearTagId]
    } else if (appendAllTime === false)
      return ids.filter((id) => id !== this.allTimeYearTagId)
    return [...ids]
  }
  public getAllTimeYearTagId() {
    let id = this.allTimeYearTagId
    this.loadConfig().then(() => {
      id = this.allTimeYearTagId
    })
    return id
  }

  private async loadCategories() {
    if (this.categoriesLoaded) return
    logger.debug("loading categories")
    const PAGINATION_SIZE = WpEnv.PAGINATION_SIZE
    let page = 1
    let categories: WpCategory[] = []
    try {
      do {
        categories = await this.wp
          .categories()
          .perPage(PAGINATION_SIZE)
          .page(page)
        categories.forEach((category: WpCategory) => {
          this.categoryIdMap.set(category.slug, category)
        })
        page++
      } while (categories.length >= PAGINATION_SIZE)
    } catch (error) {
      logger.error(error, "Error loading categories")
      throw error
    }
    this.categoriesLoaded = true
    logger.debug("categories loaded")
  }
  private async loadTags() {
    if (this.tagsLoaded) return
    logger.debug("loading tags")
    const PAGINATION_SIZE = WpEnv.PAGINATION_SIZE
    let page = 1
    let tags: WpTag[] = []
    try {
      do {
        tags = await this.wp.tags().perPage(PAGINATION_SIZE).page(page)
        tags.forEach((tag: WpTag) => {
          this.tagIdMap.set(tag.slug, tag)
        })
        page++
      } while (tags.length >= PAGINATION_SIZE)
    } catch (error) {
      logger.error(error, "Error loading tags")
      throw error
    }
    this.tagsLoaded = true
    logger.debug("tags loaded")
  }

  public getCategoryId(slug: string): number | undefined {
    if (!this.categoriesLoaded) this.loadCategories().then(() => {})
    let lookup = this.categoryIdMap.get(slug)
    if (!lookup) {
      try {
        this.wp
          .categories()
          .slug(slug)
          .then((categories) => {
            this.categoryIdMap.set(categories[0].slug, categories[0])
          })
      } catch (error) {
        const message = `Error fetching category: ${slug}`
        logger.error(message)
        throw new Error(message)
      }
    }
    lookup = this.categoryIdMap.get(slug)
    if (!lookup) return undefined
    return lookup.id
  }

  public getTagId(slug: string): number | undefined {
    let map: typeof this.tagIdMap
    if (!this.tagsLoaded)
      this.loadTags().then(() => {
        map = this.tagIdMap
      })
    let lookup = this.tagIdMap.get(slug)
    if (!lookup) {
      try {
        this.wp
          .tags()
          .slug(slug)
          .then((tags) => {
            this.tagIdMap.set(tags[0].slug, tags[0])
          })
      } catch (error) {
        const message = `Error fetching tag: ${slug}`
        logger.error(message)
        throw new Error(message)
      }
    }
    lookup = this.tagIdMap.get(slug)
    if (!lookup) return undefined
    return lookup.id
  }

  private getTaxonomyIds(categorySlug: string, tagSlug: string) {
    const catId = this.getCategoryId(categorySlug)
    const tagId = this.getTagId(tagSlug)
    if (catId === undefined || tagId === undefined) {
      logger.error(
        { categorySlug, catId, tagSlug, tagId },
        "undefined category or tag",
      )
      throw new Error("undefined category or tag")
    }
    return [catId, tagId]
  }

  public async getPosts({
    categorySlug,
    tagIds,
    maxPosts = WpEnv.VISIBLE_ITEMS_PER_PAGE,
    sticky,
  }: Pick<FetchPostsProps, "categorySlug" | "tagIds" | "maxPosts"> & {
    /** true for sticky posts only; false for non-sticky posts only; undefined for all posts */
    sticky?: boolean
  }): Promise<WpPost[]> {
    const catId = this.getCategoryId(categorySlug)
    if (catId === undefined) throw new Error("undefined category slug")
    if (tagIds.length === 0) return []
    if (sticky) maxPosts = -1 // unlimited
    if (maxPosts === 0) return []
    const pageSize = WpEnv.PAGINATION_SIZE
    const tasks = tagIds.map((tagId) =>
      this.fetchMaxPostsByFn(this.createFetchFn({ catId, tagId, sticky }), {
        maxPosts,
        pageSize,
      }),
    )
    const results = await Promise.all(tasks)
    const posts = this.combinePosts(results)
    if (maxPosts > 0) return posts.slice(0, maxPosts)
    return posts
  }

  private createFetchFn({
    catId,
    tagId,
    sticky,
  }: {
    catId: number
    tagId: number
    sticky?: boolean
  }): FetchFn {
    return (params: FetchFnParams) => {
      logger.debug(
        `createFetchFn params: ${JSON.stringify({ catId, tagId, sticky })}`,
      )
      let api = this.wp.posts()
      api = api.perPage(params.pageSize).offset(params.offset)
      api = api.orderby("date").order("desc")
      api = api.after(WpEnv.djsAnniversarySince.toISOString())
      api = api.status("publish")
      api = api.categories(catId)
      api = api.tags(tagId)
      if (sticky !== undefined) api = api.sticky(sticky)
      return api.get()
    }
  }

  private async fetchMaxPostsByFn(
    fetchFn: FetchFn,
    { maxPosts, pageSize }: { maxPosts?: number; pageSize: number },
  ) {
    let offset = 0
    let postsJson = await fetchFn({ offset, pageSize })
    let wpPosts = this.mapWpPosts(postsJson)
    let posts = [...wpPosts]
    while (
      (maxPosts === undefined || maxPosts > posts.length) &&
      wpPosts.length >= pageSize
    ) {
      offset += pageSize
      postsJson = await fetchFn({ offset, pageSize })
      wpPosts = this.mapWpPosts(postsJson)
      posts = [...posts, ...wpPosts]
    }
    return posts
  }

  private combinePosts(postsArray: WpPost[][]) {
    const mergedArray = postsArray.flat()
    const uniqueMap = new Map<number, WpPost>()
    mergedArray.forEach((item) => uniqueMap.set(item.postId, item))
    const uniqueArray = Array.from(uniqueMap.values())
    uniqueArray.sort((a, b) =>
      a.date.isAfter(b.date) ? -1 : a.date.isBefore(b.date) ? 1 : 0,
    )
    return uniqueArray
  }

  public async fetchPostById({ postId }: { postId: number }): Promise<WpPost> {
    const fetchFn = (postId: number) =>
      this.wp.posts().id(postId).status("publish").get()
    let postJson = await fetchFn(postId)
    logger.info(postJson, "postJson")
    let wpPost = wpPostFromJson(postJson)
    return wpPost
  }

  public async fetchPostBySlug({ slug }: { slug: string }): Promise<WpPost> {
    const fetchFn = (slug: string) =>
      this.wp.posts().slug(slug).status("publish").get()
    let postJson = await fetchFn(slug)
    logger.info(postJson, "postJson")
    let wpPost = wpPostFromJson(postJson)
    return wpPost
  }

  private mapWpPosts(posts: WpPostJson[]): WpPost[] {
    return posts.map((json) => wpPostFromJson(json))
  }
}

export const wpClient = WpClient.create(
  new WPAPI({
    endpoint: "https://pta.ycps.edu.hk/wp-json",
  }),
)

export type WpPostJson = {
  id: number
  date: string
  guid: {
    rendered: string
  }
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  sticky: boolean
}

export type WpPost = {
  postId: number
  date: dayjs.Dayjs
  guid: string
  title: string
  content: string
  excerpt: string
  sticky: boolean
}

export const wpPostFromJson = (post: WpPostJson): WpPost => {
  return {
    postId: post.id,
    date: dayjs(post.date),
    guid: post.guid.rendered,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
    sticky: post.sticky,
  }
}
;(async () => {
  await wpClient.getAllTimeYearTagId()
})()

function extractTextFromHtml(markup: string): string | undefined {
  if (typeof window !== "undefined") {
    const parser = new DOMParser()
    const document = parser.parseFromString(markup, "text/html")
    return document.body.textContent || ""
  }
  return undefined
}

function removeNewlines(s: string): string {
  return s.replace(/\r?\n|\r/g, "")
}
