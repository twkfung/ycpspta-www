"use client"

import "@/styles/wp_block-library_style.css"

import { logger } from "@/lib/pino"
import { type WpPost, wpClient } from "@/lib/wpapi"
import { useEffect, useCallback, useReducer } from "react"
import {
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material"
import { Markdown } from "@/lib/shared/components"
import { WpEnv } from "@/lib/wpapi/WpEnv"
import { CenteredBox } from "./CenteredBox"

type Props = {
  categorySlug: WpEnv.CATEGORY_SLUGS
  tagSlug: WpEnv.TAG_SLUGS
  showDate?: boolean
  maxPosts?: number
  // collapseAfter?: number
}

type State = {
  error: unknown
  loading: boolean
  posts: WpPost[]
}
type Action =
  | {
      type: "ERROR_CAUGHT"
      payload: unknown
    }
  | {
      type: "POSTS_FETCHED"
      payload: WpPost[]
    }
  | {
      type: "LOADING_COMPLETED"
    }
  | {
      type: "RELOAD_REQUESTED"
    }

const initialState: State = {
  error: null,
  loading: true,
  posts: [],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ERROR_CAUGHT":
      return { ...state, error: action.payload, posts: [] }
    case "POSTS_FETCHED":
      return { ...state, posts: action.payload, loading: false }
    case "LOADING_COMPLETED":
      return { ...state, loading: false }
    case "RELOAD_REQUESTED":
      return { ...state, ...initialState }
    default:
      return state
  }
}

export function Posts({
  categorySlug,
  tagSlug,
  showDate = false,
  maxPosts,
}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { error, loading, posts } = state
  const fetchData = useCallback(async () => {
    try {
      const wpPosts = await wpClient.loadPublishedPosts({
        categorySlug,
        tagSlug,
        maxPosts,
      })
      dispatch({ type: "POSTS_FETCHED", payload: wpPosts })
    } catch (err) {
      logger.error(err, "error fetching posts")
      dispatch({ type: "ERROR_CAUGHT", payload: err })
    } finally {
      dispatch({ type: "LOADING_COMPLETED" })
    }
  }, [categorySlug, tagSlug, maxPosts])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleReload = async () => {
    dispatch({ type: "RELOAD_REQUESTED" })
    await fetchData()
  }

  if (error) {
    return (
      <section>
        <CenteredBox>
          <Typography variant="h5" gutterBottom color="error">
            Error loading data
          </Typography>
          <Button variant="contained" onClick={handleReload}>
            Reload
          </Button>
        </CenteredBox>
      </section>
    )
  }

  if (loading) {
    return (
      <section>
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      </section>
    )
  }

  if (posts.length === 0)
    return (
      <section>
        <CenteredBox>
          <Typography>Coming soon. Stay tuned.</Typography>
        </CenteredBox>
      </section>
    )

  return (
    <section>
      <Stack divider={<Divider flexItem />}>
        {posts.map((post: WpPost) => (
          <Paper
            component={"article"}
            key={post.guid}
            sx={{ padding: 1 }}
            elevation={4}
          >
            <Stack>
              <Typography variant="h6">{post.title}</Typography>
              {showDate && (
                <Typography variant="caption">{post.date.fromNow()}</Typography>
              )}
            </Stack>
            <Markdown>{post.content}</Markdown>
          </Paper>
        ))}
      </Stack>
    </section>
  )
}
