"use client"

import React, { useState } from "react"
import {
  AppBar,
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import {
  Menu as IconMenu,
  ChevronLeft as IconChevronLeft,
  ExpandLess as IconExpandLess,
  ExpandMore as IconExpandMore,
} from "@mui/icons-material"
import { usePathname, useRouter } from "next/navigation"
import { logger } from "@/lib/pino"
import { AppEnv } from "./appEnv"
import Link from "next/link"
import ptaLogo from "./YCPSPTA_logo_small.png"

type NavItem = {
  key: string
  label: string
  href: string
}
type NavItemContainer = NavItem & {
  children: NavItem[]
}

const navItems: NavItemContainer[] = [
  {
    key: "/members/",
    label: "會員通訊",
    href: "/members/",
    children: [
      {
        key: "/members/news/",
        label: "最新消息",
        href: "/members/news/",
      },
      {
        key: "/members/notices/",
        label: "通告",
        href: "/members/notices/",
      },
      {
        key: "/members/newsletters/",
        label: "會訊",
        href: "/members/newsletters/",
      },
      {
        key: "/members/welfare/",
        label: "福利",
        href: "/members/welfare/",
      },
    ],
  },
  {
    key: "/pta/",
    label: "家教會",
    href: "/pta/",
    children: [
      {
        key: "/pta/words/",
        label: "我們心聲",
        href: "/pta/words/",
      },
      {
        key: "/pta/exco/",
        label: "委員名單",
        href: "/pta/exco/",
      },
      {
        key: "/pta/docs/",
        label: "文件",
        href: "/pta/docs/",
      },
      {
        key: "/pta/contact/",
        label: "聯絡",
        href: "/pta/contact/",
      },
    ],
  },
  {
    key: "/helpers/",
    label: "家長義工地帶",
    href: "/helpers/",
    children: [
      {
        key: "/helpers/recruit/",
        label: "義工招募",
        href: "/helpers/recruit/",
      },
      {
        key: "/helpers/handbook/",
        label: "義工手冊",
        href: "/helpers/handbook/",
      },
      {
        key: "/helpers/code/",
        label: "守則",
        href: "/helpers/code/",
      },
    ],
  },
  {
    key: "/events/",
    label: "活動",
    href: "/events/",
    children: [
      {
        key: "/events/promo/",
        label: "活動推介",
        href: "/events/promo/",
      },
      {
        key: "/events/calendar/",
        label: "年度活動",
        href: "/events/calendar/",
      },
      {
        key: "/events/albums/",
        label: "影集",
        href: "/events/albums/",
      },
    ],
  },
]

function NavbarDrawer({ navItems }: { navItems: NavItemContainer[] }) {
  const router = useRouter()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState("")
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleMenuExpand = (key: string) => () => {
    setExpand(key)
  }
  const handleMenuCollapse = () => {
    setExpand("")
  }
  const handleLinkRoute = (href: NavItem["href"]) => () => {
    router.push(href)
    setOpen(false)
  }
  const pathname = usePathname()
  logger.info(pathname, "pathname")

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: theme.palette.background.default,
              }}
              src={ptaLogo.src}
            >
              家
            </Avatar>
          </Link>
          <IconButton onClick={handleDrawerOpen}>
            <IconMenu />
          </IconButton>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            // sx={{ gap: 1 }}
          >
            <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
              <Typography variant="h4" align="center" component="div">
                油蔴地天主教小學(海泓道) 家長教師會
              </Typography>
            </Box>
          </Box>
          {/* <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: theme.palette.primary.dark,
              }}
            >
              家
            </Avatar>
          </Link>
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
            油蔴地天主教小學(海泓道) 家長教師會
          </Typography> */}

          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: theme.palette.primary.dark,
              }}
            >
              家
            </Avatar>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ flexShrink: 0, display: "flex" }}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          },
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          <IconChevronLeft />
        </IconButton>
        <Divider />
        <List dense>
          {navItems.map((navItem) => (
            <React.Fragment key={navItem.key}>
              <ListItem
                disablePadding
                sx={{
                  backgroundColor: pathname.endsWith(navItem.href)
                    ? theme.palette.primary.main
                    : undefined,
                }}
              >
                <ListItemButton
                  key={navItem.key}
                  onClick={
                    navItem.children.length > 0
                      ? expand === navItem.key
                        ? handleMenuCollapse
                        : handleMenuExpand(navItem.key)
                      : handleLinkRoute(navItem.href)
                  }
                >
                  <ListItemText primary={navItem.label} />
                  {navItem.children.length === 0 ? (
                    false
                  ) : expand === navItem.key ? (
                    <IconExpandLess />
                  ) : (
                    <IconExpandMore />
                  )}
                </ListItemButton>
              </ListItem>
              {navItem.children.length === 0 ? (
                false
              ) : (
                <Collapse
                  in={expand === navItem.key}
                  timeout="auto"
                  unmountOnExit
                  key={`collapse-${navItem.key}`}
                >
                  <List dense disablePadding>
                    {navItem.children.map((item) => (
                      <ListItem
                        key={item.key}
                        disablePadding
                        sx={{
                          backgroundColor: pathname.endsWith(item.href)
                            ? theme.palette.primary.main
                            : undefined,
                        }}
                      >
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={handleLinkRoute(item.href)}
                        >
                          <ListItemText primary={item.label}></ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List dense>
          <Divider />
          <ListItem>
            <ListItemText>網站版本: {AppEnv.version}</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}

export function Navbar() {
  return (
    <>
      <NavbarDrawer navItems={navItems} />
    </>
  )
}
