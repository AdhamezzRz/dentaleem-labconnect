import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, MapPin, Clock, DollarSign, MessageCircle, Heart } from "lucide-react";
import { useState } from "react";

interface Lab {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  turnaroundDays: number;
  avgPrice: string;
  location: string;
  specialties: string[];
  goldCertified: boolean;
  featured: boolean;
  certifications: string[];
  cases: number;
}

interface LabCardProps {
  lab: Lab;
  onViewProfile: (labId: number) => void;
  onStartCase: (labId: number) => void;
  onContact: (labId: number) => void;
}

const LabCard = ({ lab, onViewProfile, onStartCase, onContact }: LabCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card 
      className={`group relative hover:shadow-2xl transition-all duration-300 overflow-hidden ${
        lab.featured ? 'border-primary/50 shadow-lg' : ''
      }`}
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
      
      {/* Gold Certified Banner */}
      {lab.goldCertified && (
        <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 py-1.5 px-4 flex items-center justify-center gap-2 animate-pulse">
          <Crown className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wide">
            Gold Certified
          </span>
        </div>
      )}

      <div className="p-6 relative z-10">
        {/* Lab Avatar & Info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Lab Logo with Enhanced Shadow */}
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <span className="text-xl font-bold text-white">
                {lab.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
          </div>

          {/* Lab Name & Location */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {lab.name}
              </h3>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex-shrink-0 p-1 hover:scale-110 transition-transform"
              >
                <Heart 
                  className={`h-5 w-5 ${
                    isFavorite 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="font-medium text-foreground">{lab.rating}</span>
                <span>({lab.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{lab.location}</span>
              </div>
            </div>

            {/* Featured Badge */}
            {lab.featured && (
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-xs">
                Featured Lab
              </Badge>
            )}
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lab.specialties.slice(0, 3).map((specialty) => (
            <Badge 
              key={specialty} 
              variant="outline" 
              className="border-primary/30 text-xs"
            >
              {specialty}
            </Badge>
          ))}
          {lab.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{lab.specialties.length - 3} more
            </Badge>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 group/info">
            <div className="p-2 rounded-lg bg-primary/10 group-hover/info:bg-primary/20 transition-colors">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Turnaround</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {lab.turnaroundDays} Days
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 group/info">
            <div className="p-2 rounded-lg bg-accent/10 group-hover/info:bg-accent/20 transition-colors">
              <DollarSign className="h-4 w-4 text-accent-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">From</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {lab.avgPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications & Cases */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b">
          <span>
            <strong className="text-foreground">{lab.certifications.join(', ')}</strong>
          </span>
          <span>
            <strong className="text-foreground">{lab.cases}+</strong> cases
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={() => onStartCase(lab.id)}
            className="flex-1 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 shadow-md hover:shadow-lg transition-all"
            size="sm"
          >
            Start Case
          </Button>
          <Button 
            onClick={() => onViewProfile(lab.id)}
            variant="outline"
            className="flex-1 border-primary/30 hover:bg-primary/5 hover:border-primary/50"
            size="sm"
          >
            Profile
          </Button>
          <Button
            onClick={() => onContact(lab.id)}
            variant="outline"
            size="sm"
            className="px-3 border-accent/30 hover:bg-accent/5 hover:border-accent/50"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg pointer-events-none transition-colors" />
    </Card>
  );
};

export default LabCard;