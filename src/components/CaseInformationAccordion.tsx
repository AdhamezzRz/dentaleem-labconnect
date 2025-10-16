import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Crown, Calendar, User } from "lucide-react";
import TeethChart from "./TeethChart";

interface Restoration {
  id: string;
  type: string;
  material: string;
  teethNumbers: string[];
  isTryIn?: boolean;
  notes?: string;
}

interface CaseInformationAccordionProps {
  restorations: Restoration[];
  createdAt: string;
  lastUpdated: string;
  priority: "standard" | "urgent";
  assignedTechnician?: string;
}

export const CaseInformationAccordion = ({
  restorations,
  createdAt,
  lastUpdated,
  priority,
  assignedTechnician,
}: CaseInformationAccordionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Crown className="h-5 w-5 text-primary" />
        Case Information
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Created On</p>
            <p className="text-sm font-medium">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="text-sm font-medium">
              {new Date(lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Priority</p>
          <Badge variant={priority === "urgent" ? "destructive" : "outline"}>
            {priority.toUpperCase()}
          </Badge>
        </div>
        {assignedTechnician && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Assigned Technician</p>
              <p className="text-sm font-medium">{assignedTechnician}</p>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-3">Restorations</h3>
      <Accordion type="single" collapsible className="w-full">
        {restorations.map((restoration, index) => (
          <AccordionItem key={restoration.id} value={`item-${index}`}>
            <AccordionTrigger className={restoration.isTryIn ? "pl-6" : ""}>
              <div className="flex items-center gap-3">
                <Crown className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {restoration.type} ({restoration.material})
                </span>
                {restoration.isTryIn && (
                  <Badge variant="secondary" className="text-xs">
                    Try-In (PMMA)
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-7">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected Teeth
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {restoration.teethNumbers.map((tooth) => (
                      <Badge key={tooth} variant="outline">
                        Tooth #{tooth}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 bg-muted/50 p-4 rounded-lg">
                    <TeethChart
                      selectedTeeth={restoration.teethNumbers.map(Number)}
                      onTeethChange={() => {}}
                    />
                  </div>
                </div>
                {restoration.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm bg-muted p-3 rounded">
                      {restoration.notes}
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};
