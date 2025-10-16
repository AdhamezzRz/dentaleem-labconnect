import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Upload, Truck, DollarSign, Settings } from "lucide-react";

interface ActivityEvent {
  id: string;
  message: string;
  timestamp: string;
  category: "lab" | "payment" | "system";
  icon: React.ElementType;
}

const ActivityFeed = () => {
  const activities: ActivityEvent[] = [
    { 
      id: "1", 
      message: "Precision Lab uploaded new design for PO-001", 
      timestamp: "2h ago", 
      category: "lab",
      icon: Upload
    },
    { 
      id: "2", 
      message: "Delivery courier marked case as en route", 
      timestamp: "5h ago", 
      category: "lab",
      icon: Truck
    },
    { 
      id: "3", 
      message: "Promo discount applied to invoice", 
      timestamp: "1d ago", 
      category: "payment",
      icon: DollarSign
    },
    { 
      id: "4", 
      message: "Elite Dental Lab responded to your message", 
      timestamp: "1d ago", 
      category: "lab",
      icon: Activity
    },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Activity Feed
          </CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="labs">Labs</SelectItem>
              <SelectItem value="payments">Payments</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">
                    {activity.message}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
