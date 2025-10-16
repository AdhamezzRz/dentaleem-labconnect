import { Card } from "@/components/ui/card";
import { Building2, Award, Clock, Star } from "lucide-react";

interface StatsProps {
  totalLabs: number;
  goldCertified: number;
  avgTurnaround: number;
  avgRating: number;
  onStatClick?: (filterType: string) => void;
}

const MarketplaceStats = ({ 
  totalLabs, 
  goldCertified, 
  avgTurnaround, 
  avgRating,
  onStatClick 
}: StatsProps) => {
  const stats = [
    {
      label: "Labs Available",
      value: totalLabs,
      icon: Building2,
      color: "text-primary",
      bgColor: "bg-primary/10",
      filterType: "all"
    },
    {
      label: "Gold Certified Labs",
      value: goldCertified,
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-500/10",
      filterType: "gold"
    },
    {
      label: "Avg Turnaround",
      value: `${avgTurnaround.toFixed(1)} Days`,
      icon: Clock,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      filterType: "turnaround"
    },
    {
      label: "Avg Lab Rating",
      value: `${avgRating.toFixed(1)} / 5`,
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      filterType: "rating"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="p-6 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onStatClick?.(stat.filterType)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MarketplaceStats;