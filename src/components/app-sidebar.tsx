import * as React from "react"
import {
  LifeBuoy,
  // Map,
  // Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import ParklyLogo from "/public/parkly.png"


const data = {
  user: {
    name: "Parkly Admin",
    email: "admin@parkly.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Data",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Spots",
          url: "#",
        },
        {
          title: "Bookings",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "mailto:support@parkly.com",
      icon: LifeBuoy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="">
                  <img src={ParklyLogo} className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Parkly 2025</span>
                  <span className="truncate text-xs">Enterprise LLC Corp</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
