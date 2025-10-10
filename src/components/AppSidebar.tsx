import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Store,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Cases", url: "/dashboard", icon: FileText },
  { title: "Create New Case", url: "/create-case", icon: PlusCircle },
  { title: "Marketplace", url: "/marketplace", icon: Store },
  { title: "Chat", url: "/dashboard", icon: MessageSquare },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border"
      style={{
        backgroundColor: "hsl(var(--primary))",
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-primary-foreground/10">
        <Link to="/dashboard" className="flex items-center gap-2">
          {open ? (
            <>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
              </div>
              <span className="text-lg font-bold text-primary-foreground">
                DENTALEEM
              </span>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
            </div>
          )}
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        isActive
                          ? "bg-secondary text-foreground hover:bg-secondary hover:text-foreground"
                          : "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      }`}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
