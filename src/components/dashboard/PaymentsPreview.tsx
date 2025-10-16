import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Payment {
  invoiceId: string;
  caseId: string;
  amount: number;
  status: "paid" | "unpaid" | "pending";
  date: string;
}

const PaymentsPreview = () => {
  const payments: Payment[] = [
    { invoiceId: "INV-001", caseId: "PO-2024-001", amount: 1200, status: "paid", date: "Jan 20" },
    { invoiceId: "INV-002", caseId: "PO-2024-002", amount: 850, status: "unpaid", date: "Jan 22" },
    { invoiceId: "INV-003", caseId: "PO-2024-003", amount: 950, status: "pending", date: "Jan 23" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      case "unpaid": return "bg-destructive/20 text-destructive border-destructive/30";
      case "pending": return "bg-amber-500/20 text-amber-700 border-amber-500/30";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Recent Payments
          </CardTitle>
          <Link to="/payments">
            <Button variant="ghost" size="sm" className="text-xs">
              View All
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {payments.map((payment) => (
            <div 
              key={payment.invoiceId} 
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">
                    {payment.invoiceId}
                  </span>
                  <Badge variant="outline" className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Case: {payment.caseId} • {payment.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">
                  {payment.amount} EGP
                </p>
                {payment.status === "unpaid" && (
                  <Link to="/payments">
                    <Button size="sm" variant="outline" className="mt-1 h-7 text-xs">
                      Pay Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsPreview;
