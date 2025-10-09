import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  TrendingUp,
  Clock,
  Star,
  DollarSign,
} from "lucide-react";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalCases: 0,
    completedCases: 0,
    avgTurnaround: 0,
    totalSpent: 0,
    remakeRate: 0,
  });
  const [casesByType, setCasesByType] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: cases } = await supabase
          .from("cases")
          .select("*")
          .eq("dentist_id", user.id);

        if (cases) {
          const completed = cases.filter((c) => c.status === "completed");
          const remakes = cases.filter((c) => c.status === "remake");

          // Calculate average turnaround
          const turnarounds = completed
            .filter((c) => c.due_date && c.created_at)
            .map((c) => {
              const created = new Date(c.created_at).getTime();
              const due = new Date(c.due_date).getTime();
              return Math.ceil((due - created) / (1000 * 60 * 60 * 24));
            });

          const avgTurnaround =
            turnarounds.length > 0
              ? turnarounds.reduce((a, b) => a + b, 0) / turnarounds.length
              : 0;

          // Get payments
          const caseIds = cases.map((c) => c.id);
          const { data: payments } = await supabase
            .from("payments")
            .select("amount")
            .in("case_id", caseIds)
            .eq("status", "paid");

          const totalSpent = payments
            ? payments.reduce((sum, p) => sum + Number(p.amount), 0)
            : 0;

          // Case types distribution
          const typeCount: any = {};
          cases.forEach((c) => {
            typeCount[c.case_type] = (typeCount[c.case_type] || 0) + 1;
          });

          const typesArray = Object.entries(typeCount).map(([type, count]) => ({
            type,
            count,
          }));

          setStats({
            totalCases: cases.length,
            completedCases: completed.length,
            avgTurnaround: Math.round(avgTurnaround),
            totalSpent,
            remakeRate:
              cases.length > 0
                ? Math.round((remakes.length / cases.length) * 100)
                : 0,
          });

          setCasesByType(typesArray);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <span className="text-xl font-bold text-foreground">
              DENTALEEM
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className="text-sm font-medium text-foreground"
            >
              Analytics
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Insights into your dental case performance
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.totalCases}
            </p>
            <p className="text-sm text-muted-foreground">Total Cases</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.avgTurnaround}d
            </p>
            <p className="text-sm text-muted-foreground">Avg. Turnaround</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              ${Math.round(stats.totalSpent)}
            </p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.remakeRate}%
            </p>
            <p className="text-sm text-muted-foreground">Remake Rate</p>
          </Card>
        </div>

        {/* Case Types Distribution */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Case Types Distribution
          </h2>
          <div className="space-y-4">
            {casesByType.map((item: any) => {
              const percentage =
                (item.count / stats.totalCases) * 100;
              return (
                <div key={item.type}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground capitalize">
                      {item.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.count} cases ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Performance Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <p className="text-3xl font-bold text-primary mb-2">
                {stats.completedCases}
              </p>
              <p className="text-sm text-muted-foreground">
                Completed Cases
              </p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <p className="text-3xl font-bold text-secondary mb-2">
                {stats.totalCases - stats.completedCases}
              </p>
              <p className="text-sm text-muted-foreground">Active Cases</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <p className="text-3xl font-bold text-primary mb-2">
                ${stats.totalSpent > 0 && stats.completedCases > 0
                  ? Math.round(stats.totalSpent / stats.completedCases)
                  : 0}
              </p>
              <p className="text-sm text-muted-foreground">Avg. Cost/Case</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
