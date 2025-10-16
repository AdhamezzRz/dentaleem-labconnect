import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, ShoppingBag, MessageCircle, TrendingUp, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActionsPanel = () => {
  const actions = [
    { icon: Plus, label: "Create New Case", href: "/create-case", variant: "default" as const },
    { icon: Upload, label: "Upload Files (STL/Images)", href: "/create-case", variant: "outline" as const },
    { icon: ShoppingBag, label: "View My Marketplace Labs", href: "/marketplace", variant: "outline" as const },
    { icon: MessageCircle, label: "Open Messages", href: "/dashboard", variant: "outline" as const },
    { icon: TrendingUp, label: "View Analytics", href: "/analytics", variant: "outline" as const },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.href} className="block">
              <Button 
                variant={action.variant}
                className="w-full justify-start gap-3 h-12 transition-all hover:scale-[1.02]"
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">{action.label}</span>
              </Button>
            </Link>
          );
        })}

        {/* Help Card */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Need Help?</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Chat with Dentaleem support
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel;
