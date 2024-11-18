import WPAPI from "wpapi"
import dayjs from "@/lib/dayjs"
import { WpEnv } from "./WpEnv"
import { logger } from "@/lib/pino"

export type WpCategory = {
  id: number
  link: string
  slug: string
  parent: number
  name: string
}

export type WpTag = {
  id: number
  link: string
  slug: string
  name: string
}

class WpClient {
  public wp: WPAPI
  private categoryIdMap: Map<string, WpCategory> = new Map()
  private tagIdMap: Map<string, WpTag> = new Map()
  private categoriesLoaded = false
  private tagsLoaded = false

  private constructor(wp: WPAPI) {
    this.wp = wp
  }
  public static create(wp: WPAPI): WpClient {
    return new WpClient(wp)
  }
  private async loadCategories() {
    logger.info("loading categories")
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
    logger.info("categories loaded")
  }
  private async loadTags() {
    logger.info("loading tags")
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
    logger.info("tags loaded")
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
