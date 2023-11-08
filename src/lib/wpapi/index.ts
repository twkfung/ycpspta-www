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
    try {
      const categories = await this.wp
        .categories()
        .perPage(WpEnv.ITEMS_PER_PAGE)
      categories.forEach((category: WpCategory) => {
        this.categoryIdMap.set(category.slug, category)
      })
      this.categoriesLoaded = true
    } catch (error) {
      logger.error(error, "Error loading categories")
      throw error
    }
  }
  private async loadTags() {
    try {
      const tags = await this.wp.tags().perPage(WpEnv.ITEMS_PER_PAGE)
      tags.forEach((tag: WpTag) => {
        this.tagIdMap.set(tag.slug, tag)
      })
      this.tagsLoaded = true
    } catch (error) {
      logger.error(error, "Error loading tags")
      throw error
    }
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
    const PageSize = WpEnv.ITEMS_PER_PAGE
    let offset = 0
    const fetchFn = (offset: number) =>
      this.wp
        .posts()
        .perPage(PageSize) // wp accepts max 100
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
    while (wpPosts.length >= PageSize) {
      offset += PageSize
      postsJson = await fetchFn(offset)
      wpPosts = this.mapWpPosts(postsJson)
      posts = [...posts, ...wpPosts]
    }
    return posts
  }

  public async fetchNonStickyPosts({
    categorySlug,
    tagSlug,
    maxPosts = WpEnv.ITEMS_PER_PAGE,
  }: {
    categorySlug: string
    tagSlug: string
    maxPosts?: number
  }): Promise<WpPost[]> {
    const [catId, tagId] = await this.getTaxonomyIds(categorySlug, tagSlug)
    const PageSize = WpEnv.ITEMS_PER_PAGE
    let offset = 0
    const fetchFn = (offset: number) =>
      this.wp
        .posts()
        .perPage(PageSize) // wp accepts max 100
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
    while (maxPosts > posts.length && wpPosts.length >= PageSize) {
      offset += PageSize
      postsJson = await fetchFn(offset)
      wpPosts = this.mapWpPosts(postsJson)
      posts = [...posts, ...wpPosts]
    }
    return posts
  }

  public async fetchPosts({
    categorySlug,
    tagSlug,
    maxPosts = WpEnv.ITEMS_PER_PAGE,
  }: {
    categorySlug: string
    tagSlug: string
    maxPosts?: number
  }): Promise<WpPost[]> {
    const [catId, tagId] = await this.getTaxonomyIds(categorySlug, tagSlug)
    const PageSize = WpEnv.ITEMS_PER_PAGE
    let offset = 0
    const fetchFn = (offset: number) =>
      this.wp
        .posts()
        .perPage(PageSize) // wp accepts max 100
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
    while (maxPosts > posts.length && wpPosts.length >= PageSize) {
      offset += PageSize
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
