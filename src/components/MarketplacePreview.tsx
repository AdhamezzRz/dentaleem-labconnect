import { Star, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MarketplacePreview = () => {
  const labs = [
    {
      name: "Elite Dental Lab",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 127,
      turnaround: "3-5 days",
      materials: ["Zirconia", "E-max", "PMMA"],
      certified: "gold",
    },
    {
      name: "Precision Prosthetics",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 93,
      turnaround: "4-6 days",
      materials: ["Zirconia", "Metal-Ceramic"],
      certified: "gold",
    },
    {
      name: "Modern Smile Lab",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 64,
      turnaround: "5-7 days",
      materials: ["E-max", "Composite"],
      certified: "standard",
    },
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Verified Marketplace
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from certified labs with transparent ratings, turnaround times, and pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {labs.map((lab, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:shadow-2xl transition-all duration-500"
            >
              {/* Lab Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={lab.image} 
                  alt={lab.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Certification Badge */}
                {lab.certified === "gold" && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg">
                    <Award className="h-4 w-4 text-white" />
                    <span className="text-xs font-bold text-white">Gold Certified</span>
                  </div>
                )}
                {lab.certified === "standard" && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary shadow-lg">
                    <Award className="h-4 w-4 text-white" />
                    <span className="text-xs font-bold text-white">Standard</span>
                  </div>
                )}
              </div>

              {/* Lab Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground">{lab.name}</h3>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-foreground">{lab.rating}</span>
                    <span className="text-sm text-muted-foreground">({lab.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{lab.turnaround}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {lab.materials.map((material, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {material}
                    </span>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 group">
                  Start Case
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/marketplace">
            <Button size="lg" variant="outline" className="group">
              View All Labs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
