import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, TrendingDown, Package, Clock, 
  DollarSign, Star, Users, AlertTriangle 
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LabAnalytics = () => {
  const monthlyRevenue = [
    { month: "Sep", revenue: 52000 },
    { month: "Oct", revenue: 58000 },
    { month: "Nov", revenue: 61000 },
    { month: "Dec", revenue: 65000 },
    { month: "Jan", revenue: 68000 },
  ];

  const materialUsage = [
    { name: "Zirconia", value: 45, color: "#0E5E5A" },
    { name: "Emax", value: 30, color: "#A2C67A" },
    { name: "PMMA", value: 15, color: "#0A4F4B" },
    { name: "Others", value: 10, color: "#F8F8F2" },
  ];

  const turnaroundTimes = [
    { material: "Zirconia", avg: 4.2 },
    { material: "Emax", avg: 5.1 },
    { material: "PMMA", avg: 2.8 },
    { material: "Bridge", avg: 6.5 },
  ];

  const topDentists = [
    { name: "Dr. Ahmed Helmy", cases: 28, revenue: 24500 },
    { name: "Dr. Sara Youssef", cases: 22, revenue: 19800 },
    { name: "Dr. Walid Zaki", cases: 19, revenue: 17200 },
    { name: "Dr. Laila Omar", cases: 15, revenue: 13500 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-1">Track your lab performance and key metrics</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">EGP 68,000</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12% this month</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Turnaround</p>
                  <p className="text-2xl font-bold text-foreground">4.6 days</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                    <TrendingDown className="h-3 w-3" />
                    <span>-0.3 days faster</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Remake Rate</p>
                  <p className="text-2xl font-bold text-foreground">3.2%</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                    <TrendingDown className="h-3 w-3" />
                    <span>-0.8% improvement</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.8 ⭐</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                    <TrendingUp className="h-3 w-3" />
                    <span>87 reviews</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Star className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0E5E5A" 
                    strokeWidth={2}
                    name="Revenue (EGP)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Material Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Material Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={materialUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {materialUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Turnaround Times */}
          <Card>
            <CardHeader>
              <CardTitle>Average Turnaround by Material</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={turnaroundTimes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="material" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avg" fill="#A2C67A" name="Days" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Dentists */}
          <Card>
            <CardHeader>
              <CardTitle>Top Dentists by Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDentists.map((dentist, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{dentist.name}</p>
                        <p className="text-xs text-muted-foreground">{dentist.cases} cases</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">EGP {dentist.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card">
              <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-foreground">Performance Improving</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You're 2 days faster than average this month. Keep it up!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-foreground">Quality Trending Better</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your remake rate dropped by 0.8% this week. Excellent quality control!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card">
              <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-foreground">Revenue Growth Opportunity</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Consider offering premium services to top 3 dentists for increased revenue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabAnalytics;
