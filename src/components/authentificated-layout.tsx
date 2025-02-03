import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { ReactNode } from "react";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            { children }
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
