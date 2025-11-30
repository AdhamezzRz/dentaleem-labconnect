import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Download, CreditCard } from "lucide-react";

const Payments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: casesData } = await supabase
          .from("cases")
          .select("id")
          .eq("dentist_id", user.id);

        if (casesData) {
          const caseIds = casesData.map((c) => c.id);

          const { data: paymentsData, error } = await supabase
            .from("payments")
            .select("*, cases(patient_initials, case_type)")
            .in("case_id", caseIds)
            .order("created_at", { ascending: false });

          if (error) throw error;
          setPayments(paymentsData || []);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

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
              to="/payments"
              className="text-sm font-medium text-foreground"
            >
              Payments
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Payments & Invoices
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track all your payments and download invoices
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Paid
                </p>
                <p className="text-3xl font-bold text-foreground">
                  ${totalPaid.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-foreground">
                  ${totalPending.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Transactions
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {payments.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Download className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Payments List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Transaction History
          </h2>

          {loading ? (
            <p className="text-muted-foreground text-center py-8">
              Loading payments...
            </p>
          ) : payments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No payments yet
            </p>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold text-foreground">
                          {payment.cases?.patient_initials || "N/A"}
                        </p>
                        <Badge
                          className={
                            payment.status === "paid"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {payment.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground capitalize">
                          {payment.payment_type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()} •{" "}
                        {payment.cases?.case_type?.replace("_", " ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold text-foreground">
                        ${parseFloat(payment.amount).toFixed(2)}
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Payments;
