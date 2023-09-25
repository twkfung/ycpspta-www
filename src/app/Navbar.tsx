"use client"

import React, { useState } from "react"
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
import Image from "next/image"
import LogoImage from "./YCPSPTA_logo.png"

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
        key: "/helpers/tips/",
        label: "小錦囊",
        href: "/helpers/tips/",
      },
    ],
  },
  {
    key: "/events/",
    label: "活動",
    href: "/events/",
    children: [
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
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
            油蔴地天主教小學(海泓道)家長教師會
          </Typography>
          <Image
            src={LogoImage}
            width={36}
            height={36}
            alt="YCPS PTA logo"
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          />
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
    </>
  )
}
