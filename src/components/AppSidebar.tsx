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
      className="border-r border-primary-foreground/10 transition-all duration-300 shadow-lg"
      style={{
        width: open ? "260px" : "80px",
        backgroundColor: "hsl(var(--primary))",
        backgroundImage: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.95) 100%)",
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

      <SidebarContent className="px-3">
        {/* Main Navigation Group */}
        <SidebarGroup className="mb-8">
          <SidebarGroupLabel className="text-primary-foreground/70 px-3 text-xs font-semibold uppercase tracking-wider mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.slice(0, 3).map((item) => {
                const isActive = location.pathname === item.url;
                const ItemIcon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.tooltip}
                      className={`${
                        isActive
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground border-l-4 border-secondary shadow-md"
                          : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-secondary border-l-4 border-transparent"
                      } transition-all duration-200 py-4 px-6 rounded-lg`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 w-full">
                        <ItemIcon className="h-5 w-5 flex-shrink-0" />
                        {open && <span className="font-medium">{item.title}</span>}
                        {item.badge && open && (
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

        {/* Workflow Group */}
        <SidebarGroup className="mb-8">
          <SidebarGroupLabel className="text-primary-foreground/70 px-3 text-xs font-semibold uppercase tracking-wider mb-2">
            Workflow
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.slice(3, 7).map((item) => {
                const isActive = location.pathname === item.url;
                const ItemIcon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.tooltip}
                      className={`${
                        isActive
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground border-l-4 border-secondary shadow-md"
                          : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-secondary border-l-4 border-transparent"
                      } transition-all duration-200 py-4 px-6 rounded-lg`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 w-full">
                        <ItemIcon className="h-5 w-5 flex-shrink-0" />
                        {open && <span className="font-medium">{item.title}</span>}
                        {item.badge && open && (
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

        {/* Insights Group */}
        <SidebarGroup className="mb-8">
          <SidebarGroupLabel className="text-primary-foreground/70 px-3 text-xs font-semibold uppercase tracking-wider mb-2">
            Insights
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.slice(7).map((item) => {
                const isActive = location.pathname === item.url;
                const ItemIcon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.tooltip}
                      className={`${
                        isActive
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground border-l-4 border-secondary shadow-md"
                          : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-secondary border-l-4 border-transparent"
                      } transition-all duration-200 py-4 px-6 rounded-lg`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 w-full">
                        <ItemIcon className="h-5 w-5 flex-shrink-0" />
                        {open && <span className="font-medium">{item.title}</span>}
                        {item.badge && open && (
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


        {/* Smart Insights Widget */}
        {open && (
          <SidebarGroup className="mb-8">
            <SidebarGroupLabel className="text-primary-foreground/70 px-3 text-xs font-semibold uppercase tracking-wider mb-2">
              Quick Stats
            </SidebarGroupLabel>
            <div className="px-3 space-y-3">
              <div className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/15 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary-foreground/80 font-medium">Avg Turnaround</span>
                  <BarChart3 className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-primary-foreground">3.4 Days</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/15 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary-foreground/80 font-medium">This Month</span>
                  <CreditCard className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-primary-foreground">EGP 12,500</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/15 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary-foreground/80 font-medium">Top Lab</span>
                  <Star className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-base font-semibold text-primary-foreground">SmileWorks Lab</p>
                <Badge className="mt-2 bg-secondary/30 text-secondary border-secondary/40 text-xs">
                  Gold Certified
                </Badge>
              </div>
            </div>
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* Create New Case CTA - Fixed at bottom of navigation */}
      {open && (
        <div className="px-3 mb-8">
          <Link to="/create-case">
            <Button 
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              size="lg"
            >
              <PlusCircle className="mr-3 h-5 w-5" />
              Create New Case
            </Button>
          </Link>
        </div>
      )}

      {/* Footer with System Actions */}
      <SidebarFooter className="border-t border-primary-foreground/10 p-3 mt-auto">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Notifications"
              className="text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-secondary transition-all duration-200 py-4 px-6 rounded-lg relative"
            >
              <Bell className="h-5 w-5 flex-shrink-0" />
              {open && <span className="font-medium">Notifications</span>}
              {open && (
                <Badge className="ml-auto bg-secondary text-secondary-foreground">
                  5
                </Badge>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              className={`${
                location.pathname === "/settings"
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground border-l-4 border-secondary shadow-md"
                  : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-secondary border-l-4 border-transparent"
              } transition-all duration-200 py-4 px-6 rounded-lg`}
            >
              <Link to="/settings" className="flex items-center gap-3 w-full">
                <Settings className="h-5 w-5 flex-shrink-0" />
                {open && <span className="font-medium">Settings</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Help & Support"
              className="text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-secondary transition-all duration-200 py-4 px-6 rounded-lg"
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              {open && <span className="font-medium">Help & Support</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
