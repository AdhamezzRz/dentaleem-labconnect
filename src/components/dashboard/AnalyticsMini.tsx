import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, RotateCcw, Package, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const AnalyticsMini = () => {
  const insights = [
    { 
      label: "Avg Remake Rate", 
      value: "3%", 
      icon: RotateCcw,
      trend: "down",
      color: "text-secondary"
    },
    { 
      label: "Top Material Used", 
      value: "Zirconia", 
      icon: Package,
      color: "text-primary"
    },
    { 
      label: "Total Revenue", 
      value: "45,000 EGP", 
      icon: DollarSign,
      period: "This Month",
      color: "text-accent"
    },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Analytics Snapshot
          </CardTitle>
          <Link to="/analytics">
            <Button variant="ghost" size="sm" className="text-xs">
              Full Report
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div 
                key={insight.label}
                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    {insight.label}
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {insight.value}
                  </p>
                  {insight.period && (
                    <p className="text-xs text-muted-foreground">
                      {insight.period}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsMini;
