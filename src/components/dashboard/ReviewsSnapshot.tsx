import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface Lab {
  id: string;
  name: string;
  rating: number;
  logo?: string;
}

const ReviewsSnapshot = () => {
  const topLabs: Lab[] = [
    { id: "1", name: "Precision Dental Lab", rating: 4.9 },
    { id: "2", name: "Elite Dental Works", rating: 4.8 },
    { id: "3", name: "SmileWorks Pro Lab", rating: 4.7 },
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Top Labs You Rated
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topLabs.map((lab, index) => (
            <div 
              key={lab.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {lab.name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${
                        i < Math.floor(lab.rating) 
                          ? "fill-amber-500 text-amber-500" 
                          : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {lab.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All My Reviews
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewsSnapshot;
