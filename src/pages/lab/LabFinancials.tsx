import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DollarSign, TrendingUp, Clock, Download, 
  Search, Filter 
} from "lucide-react";

const LabFinancials = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Total Revenue (Month)", value: "EGP 65,000", change: "+12%", icon: DollarSign },
    { label: "Pending Payments", value: "EGP 8,500", change: "3 invoices", icon: Clock },
    { label: "Average Case Value", value: "EGP 950", change: "+5%", icon: TrendingUp },
    { label: "On-Time Payments", value: "91%", change: "+3%", icon: DollarSign },
  ];

  const invoices = [
    { 
      id: "INV-2025-001", 
      caseId: "PO-2025-001", 
      dentist: "Dr. Ahmed Helmy", 
      amount: 1200, 
      paymentType: "Split", 
      status: "Paid",
      date: "15 Jan 2025"
    },
    { 
      id: "INV-2025-002", 
      caseId: "PO-2025-002", 
      dentist: "Dr. Sara Youssef", 
      amount: 850, 
      paymentType: "Full", 
      status: "Pending",
      date: "17 Jan 2025"
    },
    { 
      id: "INV-2025-003", 
      caseId: "PO-2025-003", 
      dentist: "Dr. Walid Zaki", 
      amount: 2400, 
      paymentType: "Split", 
      status: "Paid",
      date: "18 Jan 2025"
    },
    { 
      id: "INV-2025-004", 
      caseId: "PO-2025-004", 
      dentist: "Dr. Laila Omar", 
      amount: 1500, 
      paymentType: "Full", 
      status: "Pending",
      date: "19 Jan 2025"
    },
    { 
      id: "INV-2025-005", 
      caseId: "PO-2025-005", 
      dentist: "Dr. Hossam Ali", 
      amount: 950, 
      paymentType: "Split", 
      status: "Paid",
      date: "20 Jan 2025"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
              <p className="text-muted-foreground mt-1">Track revenue, invoices, and payments</p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs mt-2 text-accent">{stat.change}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Invoices & Transactions</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[300px]"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Dentist</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.caseId}</TableCell>
                    <TableCell>{invoice.dentist}</TableCell>
                    <TableCell className="font-semibold">
                      EGP {invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{invoice.paymentType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={invoice.status === "Paid" ? "default" : "secondary"}
                        className={invoice.status === "Paid" ? "bg-accent" : ""}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status === "Pending" && (
                          <Button variant="outline" size="sm">
                            Request Payment
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-foreground">Full Payment</span>
                <div className="text-right">
                  <p className="font-semibold text-foreground">EGP 42,000</p>
                  <p className="text-xs text-muted-foreground">65% of revenue</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-foreground">Split Payment</span>
                <div className="text-right">
                  <p className="font-semibold text-foreground">EGP 23,000</p>
                  <p className="text-xs text-muted-foreground">35% of revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Revenue Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { dentist: "Dr. Ahmed Helmy", amount: 12400, cases: 18 },
                { dentist: "Dr. Sara Youssef", amount: 9800, cases: 14 },
                { dentist: "Dr. Walid Zaki", amount: 8200, cases: 12 },
              ].map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm text-foreground">{source.dentist}</p>
                    <p className="text-xs text-muted-foreground">{source.cases} cases</p>
                  </div>
                  <p className="font-semibold text-foreground">
                    EGP {source.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LabFinancials;
