"use client"

import WPAPI from "wpapi"
import dayjs from "@/lib/dayjs"
import { WpEnv } from "./WpEnv"
import { logger } from "@/lib/pino"
import z from "zod"

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
  private allTimeYearTagId: number | undefined = undefined
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
    this.allTimeYearTagId = await this.getTagId(WpEnv.TAG_SLUGS.PTA_ALL_TIME)
    /*
    logger.info("loading config")
    const catResp: WpCategory[] = await this.wp.categories().slug("env")
    if (catResp.length > 0) {
      const jsonString = catResp[0].description //.replace(/(\r)?(\n)|(\r)/g, "")
      const json = JSON.parse(jsonString)
      const parsing = Config.safeParse(json)
      if (parsing.success) {
        this.config = parsing.data
      } else {
        logger.error(parsing.error, "error")
      }
    }
      */

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
        this.config.activeTags.map(async (tag) => await this.getTagId(tag)),
      )
    ).filter((a) => a !== undefined)
    logger.debug(`config: ${JSON.stringify(this.config)}`)
    logger.debug(`allTimeYearTagId: ${this.allTimeYearTagId}`)
    logger.debug(`activeYearTagIds: ${JSON.stringify(this.activeYearTagIds)}`)
    this.configLoaded = true
  }
  public async getActiveYearTagIds(): Promise<number[]> {
    await this.loadConfig()
    return this.activeYearTagIds
  }
  public async getAllTimeYearTagId(): Promise<number | undefined> {
    await this.loadConfig()
    return this.allTimeYearTagId
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

  public async getCategoryId(slug: string): Promise<number | undefined> {
    if (!this.categoriesLoaded) await this.loadCategories()
    let lookup = this.categoryIdMap.get(slug)
    if (!lookup) {
      try {
        const categories = await this.wp.categories().slug(slug)
        const category: WpCategory = categories[0]
        this.categoryIdMap.set(category.slug, category)
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

  public async getTagId(slug: string): Promise<number | undefined> {
    if (!this.tagsLoaded) await this.loadTags()
    let lookup = this.tagIdMap.get(slug)
    if (!lookup) {
      try {
        const tags = await this.wp.tags().slug(slug)
        const tag: WpTag = tags[0]
        this.tagIdMap.set(tag.slug, tag)
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

  private async getTaxonomyIds(categorySlug: string, tagSlug: string) {
    const [catId, tagId] = await Promise.all([
      this.getCategoryId(categorySlug),
      this.getTagId(tagSlug),
    ])
    if (catId === undefined || tagId === undefined) {
      logger.error(
        { categorySlug, catId, tagSlug, tagId },
        "undefined category or tag",
      )
      throw new Error("undefined category or tag")
    }
    return [catId, tagId]
  }

  public async fetchStickyPosts({
    categorySlug,
    tagSlug,
  }: {
    categorySlug: string
    tagSlug: string
  }): Promise<WpPost[]> {
    const [catId, tagId] = await this.getTaxonomyIds(categorySlug, tagSlug)
    const PAGINATION_SIZE = WpEnv.PAGINATION_SIZE
    let offset = 0
    const fetchFn = (offset: number) =>
      this.wp
        .posts()
        .perPage(PAGINATION_SIZE) // wp accepts max 100
        .offset(offset)
        .orderby("date")
        .order("desc") // accepts "asc" or "desc"
        .categories(catId)
        .tags(tagId)
        .after(WpEnv.djsAnniversarySince.toISOString())
        .status("publish")
        .sticky(true)
        .get()
    let postsJson = await fetchFn(offset)
    // logger.info(`fetched ${posts.length} posts`)
    let wpPosts = this.mapWpPosts(postsJson)
    let posts = [...wpPosts]
    while (wpPosts.length >= PAGINATION_SIZE) {
      offset += PAGINATION_SIZE
      postsJson = await fetchFn(offset)
      wpPosts = this.mapWpPosts(postsJson)
      posts = [...posts, ...wpPosts]
    }
    return posts
  }

  public async fetchNonStickyPosts({
    categorySlug,
    tagSlug,
    maxPosts = WpEnv.VISIBLE_ITEMS_PER_PAGE,
  }: {
    categorySlug: string
    tagSlug: string
    maxPosts?: number
  }): Promise<WpPost[]> {
    const [catId, tagId] = await this.getTaxonomyIds(categorySlug, tagSlug)
    const PAGE_SIZE = WpEnv.PAGINATION_SIZE
    let offset = 0
    const fetchFn = (offset: number) =>
      this.wp
        .posts()
        .perPage(PAGE_SIZE) // wp accepts max 100
        .offset(offset)
        .orderby("date")
        .order("desc") // accepts "asc" or "desc"
        .categories(catId)
        .tags(tagId)
        .after(WpEnv.djsAnniversarySince.toISOString())
        .status("publish")
        .sticky(false)
        .get()
    let postsJson = await fetchFn(offset)
    // logger.info(`fetched ${posts.length} posts`)
    let wpPosts = this.mapWpPosts(postsJson)
    let posts = [...wpPosts]
    while (maxPosts > posts.length && wpPosts.length >= PAGE_SIZE) {
      offset += PAGE_SIZE
      postsJson = await fetchFn(offset)
      wpPosts = this.mapWpPosts(postsJson)
      posts = [...posts, ...wpPosts]
    }
    return posts
  }

  public async fetchPosts({
    categorySlug,
    tagSlug,
    maxPosts = WpEnv.VISIBLE_ITEMS_PER_PAGE,
  }: {
    categorySlug: string
    tagSlug: string
    maxPosts?: number
  }): Promise<WpPost[]> {
    const [catId, tagId] = await this.getTaxonomyIds(categorySlug, tagSlug)
    const PAGINATION_SIZE = WpEnv.PAGINATION_SIZE
    let offset = 0
    const fetchFn = (offset: number) =>
      this.wp
        .posts()
        .perPage(PAGINATION_SIZE) // wp accepts max 100
        .offset(offset)
        .orderby("date")
        .order("desc") // accepts "asc" or "desc"
        .categories(catId)
        .tags(tagId)
        .after(WpEnv.djsAnniversarySince.toISOString())
        .status("publish")
        // .sticky(true)
        .get()
    let postsJson = await fetchFn(offset)
    // logger.info(`fetched ${posts.length} posts`)
    let wpPosts = this.mapWpPosts(postsJson)
    let posts = [...wpPosts]
    while (maxPosts > posts.length && wpPosts.length >= PAGINATION_SIZE) {
      offset += PAGINATION_SIZE
      postsJson = await fetchFn(offset)
      wpPosts = this.mapWpPosts(postsJson)
      posts = [...posts, ...wpPosts]
    }
    return posts
  }

  public async fetchPost({ postId }: { postId: number }): Promise<WpPost> {
    const fetchFn = (postId: number) =>
      this.wp.posts().id(postId).status("publish").get()
    let postJson = await fetchFn(postId)
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
