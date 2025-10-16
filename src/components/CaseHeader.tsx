import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaseHeaderProps {
  caseId: string;
  patientName: string;
  internalPatientId?: string;
  patientType: string;
  caseType: string;
  labName?: string;
  isGoldCertified?: boolean;
  status: string;
  expectedDelivery?: string;
}

export const CaseHeader = ({
  caseId,
  patientName,
  internalPatientId,
  patientType,
  caseType,
  labName,
  isGoldCertified,
  status,
  expectedDelivery,
}: CaseHeaderProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caseId);
    toast({
      title: "Copied!",
      description: "Case ID copied to clipboard",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      draft: "bg-muted text-muted-foreground",
      design: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      production: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      delivery: "bg-primary/10 text-primary border-primary/20",
      completed: "bg-secondary/20 text-secondary-foreground border-secondary/30",
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">Case ID: #{caseId}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Patient:</span>
              <span>{patientName}</span>
            </div>
            {internalPatientId && (
              <>
                <span className="opacity-60">|</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">ID:</span>
                  <span>{internalPatientId}</span>
                </div>
              </>
            )}
            <span className="opacity-60">|</span>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              {patientType}
            </Badge>
            <span className="opacity-60">|</span>
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              <span className="capitalize">{caseType}</span>
            </div>
          </div>
        </div>
        <Badge className={getStatusColor(status) + " text-sm px-4 py-2"}>
          {status.replace("_", " ").toUpperCase()}
        </Badge>
      </div>

      <div className="flex items-center gap-6 text-sm pt-4 border-t border-primary-foreground/20">
        {labName && (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Assigned Lab:</span>
            <span>{labName}</span>
            {isGoldCertified && (
              <Badge className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-yellow-400/30 shadow-md text-xs">
                GOLD
              </Badge>
            )}
          </div>
        )}
        {expectedDelivery && (
          <>
            <span className="opacity-60">|</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Expected Delivery:</span>
              <span>{new Date(expectedDelivery).toLocaleDateString()}</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
