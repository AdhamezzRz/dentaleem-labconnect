import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface TimelineEvent {
  id: string;
  title: string;
  time: string;
  type: "design" | "delivery" | "review";
  caseId: string;
}

const TimelineWidget = () => {
  const events: TimelineEvent[] = [
    { id: "1", title: "PO-2024-001 Design Approval due", time: "in 8h", type: "design", caseId: "PO-2024-001" },
    { id: "2", title: "Crown Delivery Expected from SmileWorks Lab", time: "Wed", type: "delivery", caseId: "PO-2024-002" },
    { id: "3", title: "Patient review follow-up", time: "Fri", type: "review", caseId: "PO-2024-003" },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "design": return "bg-primary";
      case "delivery": return "bg-secondary";
      case "review": return "bg-accent";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {events.map((event) => (
            <Link 
              key={event.id} 
              to={`/case/${event.caseId}`}
              className="flex gap-3 group hover:bg-accent/5 p-2 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center pt-1">
                <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`} />
                <div className="w-0.5 h-full bg-border mt-1" />
              </div>
              <div className="flex-1 pb-2">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{event.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineWidget;
