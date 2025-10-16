import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  caseId?: string;
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
    };
    secondary?: {
      label: string;
      onClick: () => void;
    };
  };
}

export const SuccessModal = ({
  open,
  onClose,
  title,
  description,
  caseId,
  actions,
}: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 animate-scale-in">
            <CheckCircle2 className="h-10 w-10 text-secondary" />
          </div>
          <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
          {caseId && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Case ID</p>
              <p className="font-mono font-semibold text-foreground">
                {caseId}
              </p>
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          {actions?.secondary && (
            <Button
              variant="outline"
              onClick={actions.secondary.onClick}
              className="w-full sm:w-auto"
            >
              {actions.secondary.label}
            </Button>
          )}
          {actions?.primary && (
            <Button
              onClick={actions.primary.onClick}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              {actions.primary.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
