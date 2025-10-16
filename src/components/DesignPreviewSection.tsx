import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, RefreshCw, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  role: "dentist" | "lab";
  message: string;
  timestamp: string;
  attachment?: string;
}

interface DesignPreviewSectionProps {
  designImages?: string[];
  version: number;
  comments: Comment[];
  onApprove: () => void;
  onRequestEdit: (feedback: string) => void;
}

export const DesignPreviewSection = ({
  designImages = [],
  version,
  comments,
  onApprove,
  onRequestEdit,
}: DesignPreviewSectionProps) => {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleApprove = () => {
    onApprove();
    toast({
      title: "Design Approved",
      description: "The lab will proceed to production",
    });
  };

  const handleRequestEdit = () => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback for the design changes",
        variant: "destructive",
      });
      return;
    }
    onRequestEdit(feedback);
    setFeedback("");
    toast({
      title: "Edit Request Sent",
      description: "The lab has been notified of your feedback",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Design Preview & Feedback
        </h2>
        <Badge variant="outline">Version {version}</Badge>
      </div>

      {/* Design Images */}
      <div className="mb-6">
        {designImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {designImages.map((image, index) => (
              <div
                key={index}
                className="aspect-video bg-muted rounded-lg overflow-hidden border border-border"
              >
                <img
                  src={image}
                  alt={`Design ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No design preview available yet</p>
              <p className="text-xs mt-1">The lab will upload designs soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <Button onClick={handleApprove} className="flex-1">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Approve Design
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleRequestEdit}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Request Edit
        </Button>
      </div>

      {/* Feedback Input */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Feedback / Comments
        </label>
        <Textarea
          placeholder="Describe the changes you'd like to see..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="min-h-[100px]"
        />
        <Button variant="ghost" size="sm" className="mt-2">
          <Upload className="mr-2 h-4 w-4" />
          Attach File
        </Button>
      </div>

      {/* Comments Thread */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-semibold mb-3">Revision History</h3>
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`p-3 rounded-lg ${
                comment.role === "dentist"
                  ? "bg-primary/5 border-l-2 border-primary"
                  : "bg-muted"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">
                  {comment.author}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {comment.role}
                  </Badge>
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-foreground">{comment.message}</p>
              {comment.attachment && (
                <div className="mt-2 text-xs text-primary flex items-center gap-1">
                  <Upload className="h-3 w-3" />
                  Attachment: {comment.attachment}
                </div>
              )}
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No feedback yet
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
