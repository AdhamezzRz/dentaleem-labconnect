import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle2, FileText, Clock } from "lucide-react";

interface DeliveryPaymentSectionProps {
  delivery?: {
    courier: string;
    trackingNumber: string;
    status: "picked_up" | "in_transit" | "delivered";
    eta: string;
    proofOfDelivery?: string;
  };
  payment: {
    type: "split" | "full";
    paidAmount: number;
    remainingBalance: number;
    paymentDate: string;
    promoCode?: string;
    discount?: number;
  };
  onConfirmReceipt?: () => void;
}

export const DeliveryPaymentSection = ({
  delivery,
  payment,
  onConfirmReceipt,
}: DeliveryPaymentSectionProps) => {
  const getDeliveryStatusColor = (status: string) => {
    const colors = {
      picked_up: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      in_transit: "bg-primary/10 text-primary border-primary/20",
      delivered: "bg-secondary/20 text-secondary-foreground border-secondary/30",
    };
    return colors[status as keyof typeof colors] || "bg-muted";
  };

  const getDeliveryStatusLabel = (status: string) => {
    const labels = {
      picked_up: "Picked Up",
      in_transit: "In Transit",
      delivered: "Delivered",
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="space-y-6">
      {/* Delivery Tracking */}
      {delivery && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Delivery Tracking
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Courier</p>
                <p className="font-medium">{delivery.courier}</p>
              </div>
              <Badge
                variant="outline"
                className={getDeliveryStatusColor(delivery.status)}
              >
                {getDeliveryStatusLabel(delivery.status)}
              </Badge>
            </div>

            <div className="border-t border-border pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Number</p>
                  <p className="font-mono text-sm">{delivery.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Estimated Arrival
                  </p>
                  <p className="font-medium">
                    {new Date(delivery.eta).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      delivery.status === "picked_up" ||
                      delivery.status === "in_transit" ||
                      delivery.status === "delivered"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Picked Up</p>
                    <p className="text-xs text-muted-foreground">
                      Package collected from lab
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      delivery.status === "in_transit" ||
                      delivery.status === "delivered"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">In Transit</p>
                    <p className="text-xs text-muted-foreground">
                      On the way to your clinic
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      delivery.status === "delivered"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Delivered</p>
                    <p className="text-xs text-muted-foreground">
                      Package received
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {delivery.status === "delivered" && onConfirmReceipt && (
              <Button onClick={onConfirmReceipt} className="w-full">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Confirm Receipt
              </Button>
            )}

            {delivery.proofOfDelivery && (
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Proof of Delivery
                </p>
                <img
                  src={delivery.proofOfDelivery}
                  alt="Proof of delivery"
                  className="w-full h-48 object-cover rounded-lg border border-border"
                />
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Payment Summary */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Payment Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Type</span>
            <Badge variant="outline">
              {payment.type === "full" ? "Full Payment" : "Split Payment"}
            </Badge>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Paid Amount</span>
            <span className="font-medium text-secondary">
              EGP {payment.paidAmount.toLocaleString()}
            </span>
          </div>

          {payment.remainingBalance > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Remaining Balance</span>
              <span className="font-medium text-destructive">
                EGP {payment.remainingBalance.toLocaleString()}
              </span>
            </div>
          )}

          {payment.promoCode && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Promo Code ({payment.promoCode})
              </span>
              <span className="text-secondary">
                -EGP {payment.discount?.toLocaleString()}
              </span>
            </div>
          )}

          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-semibold">Total Paid</span>
            <span className="font-bold text-lg text-primary">
              EGP {payment.paidAmount.toLocaleString()}
            </span>
          </div>

          <div className="text-xs text-muted-foreground">
            Payment Date: {new Date(payment.paymentDate).toLocaleString()}
          </div>

          <Button variant="outline" className="w-full mt-4">
            <FileText className="mr-2 h-4 w-4" />
            View Invoice
          </Button>
        </div>
      </Card>
    </div>
  );
};
