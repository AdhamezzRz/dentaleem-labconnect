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
  Package,
  Star,
  Bell,
  HelpCircle,
  Upload,
  FileDown,
  Phone,
  ChevronDown,
  User,
  LogOut,
  Building2,
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
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, tooltip: "Overview of your cases and performance" },
  { 
    title: "My Cases", 
    url: "/dashboard", 
    icon: FileText, 
    badge: 8,
    tooltip: "View all your cases",
    subItems: [
      { title: "Active Cases", url: "/dashboard" },
      { title: "Drafts", url: "/dashboard" },
      { title: "Completed", url: "/dashboard" },
    ]
  },
  { title: "Marketplace", url: "/marketplace", icon: Store, tooltip: "Explore and connect with certified labs" },
  { title: "Messages", url: "/dashboard", icon: MessageSquare, badge: 3, tooltip: "Conversations with your labs" },
  { title: "Deliveries", url: "/dashboard", icon: Package, badge: 2, tooltip: "Track your active deliveries" },
  { title: "Payments", url: "/payments", icon: CreditCard, tooltip: "Manage payments and invoices" },
  { title: "Reviews", url: "/dashboard", icon: Star, tooltip: "View and manage lab feedback" },
  { title: "Analytics", url: "/analytics", icon: BarChart3, tooltip: "Track performance and spending" },
];

const quickActions = [
  { title: "New Case", icon: PlusCircle, action: "create-case", tooltip: "Start a new case order" },
  { title: "Upload STL", icon: Upload, action: "upload", tooltip: "Upload a scan file" },
  { title: "Latest Invoice", icon: FileDown, action: "invoice", tooltip: "View latest invoice" },
  { title: "Contact Support", icon: Phone, action: "support", tooltip: "Get help from support" },
];

export function AppSidebar() {
  const location = useLocation();
  const { open } = useSidebar();

  const handleQuickAction = (action: string) => {
    switch(action) {
      case "create-case":
        window.location.href = "/create-case";
        break;
      case "upload":
        console.log("Upload STL");
        break;
      case "invoice":
        console.log("View Invoice");
        break;
      case "support":
        console.log("Contact Support");
        break;
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border transition-all duration-200"
      style={{
        backgroundColor: "hsl(var(--primary))",
      }}
    >
      {/* Header with Logo and User Info */}
      <SidebarHeader className="border-b border-primary-foreground/10">
        <Link to="/dashboard" className="flex items-center justify-center gap-2 py-4">
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

        {open && (
          <div className="px-3 pb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">DR</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">Dr. Ahmed Hassan</span>
                    <span className="text-xs text-primary-foreground/70">Dentist</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building2 className="mr-2 h-4 w-4" />
                  Switch to Clinic
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/70 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const isActive = location.pathname === item.url;
                const ItemIcon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.tooltip}
                      className={`${
                        isActive
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground border-l-2 border-secondary"
                          : "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      } transition-all duration-200`}
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        <ItemIcon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge className="ml-auto bg-secondary text-secondary-foreground">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Create New Case CTA */}
        {open && (
          <div className="px-2 py-4">
            <Link to="/create-case">
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium"
                size="sm"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Case
              </Button>
            </Link>
          </div>
        )}

        {/* Smart Insights Widget */}
        {open && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary-foreground/70 px-2">
              Quick Stats
            </SidebarGroupLabel>
            <div className="px-2 space-y-2">
              <div className="bg-primary-foreground/5 rounded-lg p-3 border border-primary-foreground/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-primary-foreground/70">Avg Turnaround</span>
                  <BarChart3 className="h-3 w-3 text-secondary" />
                </div>
                <p className="text-lg font-bold text-primary-foreground">3.4 Days</p>
              </div>
              <div className="bg-primary-foreground/5 rounded-lg p-3 border border-primary-foreground/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-primary-foreground/70">This Month</span>
                  <CreditCard className="h-3 w-3 text-secondary" />
                </div>
                <p className="text-lg font-bold text-primary-foreground">EGP 12,500</p>
              </div>
              <div className="bg-primary-foreground/5 rounded-lg p-3 border border-primary-foreground/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-primary-foreground/70">Top Lab</span>
                  <Star className="h-3 w-3 text-secondary" />
                </div>
                <p className="text-sm font-semibold text-primary-foreground">SmileWorks Lab</p>
                <Badge className="mt-1 bg-secondary/20 text-secondary border-secondary/30">
                  Gold Certified
                </Badge>
              </div>
            </div>
          </SidebarGroup>
        )}

        {/* Quick Actions */}
        {open && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary-foreground/70 px-2">
              Quick Actions
            </SidebarGroupLabel>
            <div className="grid grid-cols-2 gap-2 px-2">
              {quickActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <Button
                    key={action.action}
                    variant="outline"
                    size="sm"
                    className="flex flex-col h-auto py-3 bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-secondary"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <ActionIcon className="h-4 w-4 mb-1" />
                    <span className="text-xs">{action.title}</span>
                  </Button>
                );
              })}
            </div>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Footer with Notifications and Settings */}
      <SidebarFooter className="border-t border-primary-foreground/10 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Notifications"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground relative"
            >
              <Bell className="h-4 w-4" />
              {open && <span>Notifications</span>}
              <Badge className="ml-auto bg-secondary text-secondary-foreground">
                5
              </Badge>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              className={`${
                location.pathname === "/settings"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                {open && <span>Settings</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Help & Support"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <HelpCircle className="h-4 w-4" />
              {open && <span>Help & Support</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
