import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaseReviewSectionProps {
  labName: string;
  isGoldCertified?: boolean;
  onSubmitReview: (rating: number, comment: string, tags: string[]) => void;
  existingReview?: {
    rating: number;
    comment: string;
    tags: string[];
  };
}

export const CaseReviewSection = ({
  labName,
  isGoldCertified,
  onSubmitReview,
  existingReview,
}: CaseReviewSectionProps) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    existingReview?.tags || []
  );
  const [submitted, setSubmitted] = useState(!!existingReview);
  const { toast } = useToast();

  const availableTags = [
    "Excellent Quality",
    "Fast Communication",
    "On-Time Delivery",
    "Great Fit",
    "Professional",
    "Value for Money",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }

    onSubmitReview(rating, comment, selectedTags);
    setSubmitted(true);
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
  };

  if (submitted) {
    return (
      <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/5">
        <div className="text-center py-8">
          <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-secondary" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Thank You!
          </h2>
          <p className="text-muted-foreground mb-4">
            Your review has been submitted for {labName}
          </p>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Rate Your Experience with {labName}
      </h2>
      {isGoldCertified && (
        <Badge className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white mb-4">
          GOLD CERTIFIED
        </Badge>
      )}

      {/* Star Rating */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Overall Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground hover:text-yellow-500"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              {rating} / 5
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Select Tags (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Your Review (Optional)
        </label>
        <Textarea
          placeholder="Share your experience with this lab..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <Button onClick={handleSubmit} className="w-full" size="lg">
        Submit Review
      </Button>
    </Card>
  );
};
