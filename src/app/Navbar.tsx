"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  AppBar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import {
  Menu as MenuIcon,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material"
import { usePathname, useRouter } from "next/navigation"
import { logger } from "@/lib/pino"

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
    ],
  },
  {
    key: "/helpers/",
    label: "義工地帶",
    href: "/helpers/",
    children: [
      {
        key: "/helpers/recruit/",
        label: "義工招募",
        href: "/helpers/recruit/",
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
          <IconButton
            onClick={handleDrawerOpen}
            // sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
            油蔴地天主教小學(海泓道)家長教師會
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ flexShrink: 0 }}
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
        <>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
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
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
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
        </>
      </Drawer>
    </Box>
  )
}

export function Navbar() {
  return (
    <>
      <NavbarDrawer navItems={navItems} />
      {/* <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Link href="#">
          <Typography variant="button">會員資訊</Typography>
        </Link>
        <Link href="#">
          <Typography variant="button">家教會</Typography>
        </Link>
        <Link href="#">
          <Typography variant="button">義工地帶</Typography>
        </Link>
        <Link href="#">
          <Typography variant="button">產品</Typography>
        </Link>
        <Link href="#">
          <Typography variant="button">心聲</Typography>
        </Link>
        <Link href="/news">
          <Typography variant="button">最新消息</Typography>
        </Link>
        <Link href="/news/inside">
          <Typography variant="button">inside</Typography>
        </Link>
      </Stack> */}
    </>
  )
}
