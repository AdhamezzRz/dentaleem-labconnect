import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Download, Printer } from "lucide-react";

interface InvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoice: {
    id: string;
    caseId: string;
    patientName: string;
    labName: string;
    items: Array<{
      description: string;
      quantity: number;
      unitPrice: number;
      total: number;
    }>;
    subtotal: number;
    discount?: number;
    promoCode?: string;
    total: number;
    paymentType: string;
    paymentDate: string;
    status: string;
  };
}

export const InvoiceModal = ({ open, onClose, invoice }: InvoiceModalProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In real app, generate PDF
    alert("PDF download functionality would be implemented here");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Invoice</DialogTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">DENTALEEM</h1>
              <p className="text-sm text-muted-foreground">
                Dental Marketplace Platform
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Invoice Number</p>
              <p className="font-mono font-semibold text-foreground">
                {invoice.id}
              </p>
              <p className="text-sm text-muted-foreground mt-2">Date</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(invoice.paymentDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Separator />

          {/* Bill To / Lab Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Bill To:
              </p>
              <p className="text-sm text-foreground">{invoice.patientName}</p>
              <p className="text-sm text-muted-foreground">
                Case ID: {invoice.caseId}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Lab:
              </p>
              <p className="text-sm text-foreground">{invoice.labName}</p>
            </div>
          </div>

          <Separator />

          {/* Items Table */}
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-sm font-semibold text-foreground">
                    Description
                  </th>
                  <th className="text-center py-2 text-sm font-semibold text-foreground">
                    Qty
                  </th>
                  <th className="text-right py-2 text-sm font-semibold text-foreground">
                    Unit Price
                  </th>
                  <th className="text-right py-2 text-sm font-semibold text-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 text-sm text-foreground">
                      {item.description}
                    </td>
                    <td className="py-3 text-sm text-center text-foreground">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-sm text-right text-foreground">
                      EGP {item.unitPrice.toLocaleString()}
                    </td>
                    <td className="py-3 text-sm text-right font-medium text-foreground">
                      EGP {item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium text-foreground">
                  EGP {invoice.subtotal.toLocaleString()}
                </span>
              </div>
              {invoice.discount && invoice.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Discount {invoice.promoCode && `(${invoice.promoCode})`}:
                  </span>
                  <span className="font-medium text-secondary">
                    -EGP {invoice.discount.toLocaleString()}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="text-lg font-bold text-primary">
                  EGP {invoice.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Payment Method:</p>
                <p className="font-medium text-foreground capitalize">
                  {invoice.paymentType}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Status:</p>
                <p className="font-medium text-secondary capitalize">
                  {invoice.status}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6">
            <p className="text-xs text-muted-foreground">
              Thank you for using Dentaleem!
            </p>
            <p className="text-xs text-muted-foreground">
              For any questions, contact support@dentaleem.com
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
