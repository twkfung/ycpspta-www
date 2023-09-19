import WPAPI from "wpapi"
import dayjs from "@/lib/dayjs"

export const wp = new WPAPI({
  endpoint: "https://pta.ycps.edu.hk/wp-json",
})

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
}

export type WpPost = {
  postId: number
  date: dayjs.Dayjs
  guid: string
  title: string
  content: string
  excerpt: string
}

export const wpPostFromJson = (post: WpPostJson): WpPost => {
  return {
    postId: post.id,
    date: dayjs(post.date),
    guid: post.guid.rendered,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
  }
}

export const mapWpPosts = (posts: WpPostJson[]): WpPost[] =>
  posts.map((json) => wpPostFromJson(json))
