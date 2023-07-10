"use client"

import { useState } from "react"
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
import { useRouter } from "next/navigation"

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
    key: "/members",
    label: "會員通訊",
    href: "/members",
    children: [
      {
        key: "/members/news",
        label: "最新消息",
        href: "/members/news",
      },
    ],
  },
  {
    key: "/pta",
    label: "家教會",
    href: "/pta",
    children: [],
  },
  {
    key: "/helpers",
    label: "義工地帶",
    href: "/helpers",
    children: [],
  },
  {
    key: "/products",
    label: "產品",
    href: "/products",
    children: [],
  },
  {
    key: "/voices",
    label: "心聲",
    href: "/voices",
    children: [],
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

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
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
              <>
                <ListItem key={navItem.key} disablePadding>
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
                  >
                    <List dense disablePadding>
                      {navItem.children.map((item) => (
                        <ListItem key={item.key} disablePadding>
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
              </>
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
      <Stack
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
      </Stack>
    </>
  )
}
