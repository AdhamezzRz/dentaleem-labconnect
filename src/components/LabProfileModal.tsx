import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Crown, Star, MapPin, Phone, Mail, Building2, Clock, 
  DollarSign, MessageCircle, Heart, ExternalLink 
} from "lucide-react";
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
  certifications: string[];
  cases: number;
}

interface LabProfileModalProps {
  lab: Lab | null;
  open: boolean;
  onClose: () => void;
  onStartCase: (labId: number) => void;
}

const LabProfileModal = ({ lab, open, onClose, onStartCase }: LabProfileModalProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!lab) return null;

  const mockReviews = [
    {
      id: 1,
      dentistName: "Dr. Ahmed Hassan",
      rating: 5,
      comment: "Exceptional quality and fast turnaround. The zirconia crowns were perfect!",
      date: "2024-01-15"
    },
    {
      id: 2,
      dentistName: "Dr. Sarah Al-Mansoori",
      rating: 5,
      comment: "Professional communication and outstanding results. Highly recommended!",
      date: "2024-01-10"
    },
    {
      id: 3,
      dentistName: "Dr. Mohammed Ali",
      rating: 4,
      comment: "Great work overall. Minor adjustments needed but resolved quickly.",
      date: "2024-01-05"
    }
  ];

  const mockMaterials = [
    { name: "Emax", days: 5, price: "1200 EGP", country: "Egypt" },
    { name: "Zirconia", days: 4, price: "900 EGP", country: "Egypt" },
    { name: "PMMA Try-In", days: 3, price: "400 EGP", country: "Egypt" },
    { name: "Metal Ceramic", days: 6, price: "750 EGP", country: "Egypt" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Hero Banner */}
        <div className="relative -mx-6 -mt-6 mb-6">
          <div className={`h-32 bg-gradient-to-r ${
            lab.goldCertified 
              ? 'from-yellow-500 to-yellow-600' 
              : 'from-primary to-primary/60'
          }`}>
            {lab.goldCertified && (
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/30">
                <Crown className="h-5 w-5 text-white" />
                <span className="text-sm font-bold text-white">GOLD CERTIFIED</span>
              </div>
            )}
          </div>
          
          {/* Lab Avatar */}
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-xl border-4 border-background">
              <span className="text-3xl font-bold text-white">
                {lab.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
          </div>
        </div>

        {/* Lab Header Info */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pl-36">
            <DialogTitle className="text-2xl font-bold text-foreground mb-2">
              {lab.name}
            </DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="font-medium text-foreground">{lab.rating}</span>
                <span>({lab.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{lab.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{lab.cases}+ cases completed</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                +971 50 123 4567
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                contact@{lab.name.toLowerCase().replace(/ /g, '')}.com
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                className={`h-5 w-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specializations">Specializations</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({lab.reviews})</TabsTrigger>
            <TabsTrigger value="pricing">Turnaround & Pricing</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">About</h3>
              <p className="text-muted-foreground">
                {lab.name} is a leading dental laboratory specializing in high-quality dental restorations. 
                With over 15 years of experience and state-of-the-art technology, we deliver exceptional 
                results for dentists across the region. Our team of skilled technicians combines traditional 
                craftsmanship with cutting-edge digital workflows.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Key Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <Clock className="h-5 w-5 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold text-foreground">{lab.turnaroundDays}</p>
                  <p className="text-xs text-muted-foreground">Avg Days</p>
                </Card>
                <Card className="p-4">
                  <Star className="h-5 w-5 text-amber-500 mb-2" />
                  <p className="text-2xl font-bold text-foreground">{lab.rating}/5</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </Card>
                <Card className="p-4">
                  <Building2 className="h-5 w-5 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold text-foreground">{lab.cases}+</p>
                  <p className="text-xs text-muted-foreground">Cases</p>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {lab.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="border-primary/30">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Specializations Tab */}
          <TabsContent value="specializations" className="space-y-6 mt-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Materials Offered</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Zirconia</Badge>
                <Badge>Emax</Badge>
                <Badge>PMMA</Badge>
                <Badge>Metal Ceramic</Badge>
                <Badge>Lithium Disilicate</Badge>
                <Badge>Composite Resin</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">CAD/CAM</Badge>
                <Badge variant="outline">3D Printing</Badge>
                <Badge variant="outline">CNC Milling</Badge>
                <Badge variant="outline">Digital Wax-Up</Badge>
                <Badge variant="outline">AI-Assisted Design</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Specialties</h3>
              <div className="grid grid-cols-2 gap-4">
                {lab.specialties.map((specialty) => (
                  <Card key={specialty} className="p-4">
                    <p className="font-medium text-foreground">{specialty}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i}
                  className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center"
                >
                  <span className="text-muted-foreground">Gallery {i}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4 mt-6">
            {mockReviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {review.dentistName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground">{review.dentistName}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="mt-6">
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Material</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Avg Days</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Starting Price</th>
                      <th className="text-left p-3 text-sm font-medium text-foreground">Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockMaterials.map((material, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-3 text-sm text-foreground font-medium">{material.name}</td>
                        <td className="p-3 text-sm text-muted-foreground">{material.days}d</td>
                        <td className="p-3 text-sm text-foreground font-semibold">{material.price}</td>
                        <td className="p-3 text-sm text-muted-foreground">{material.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTAs */}
        <div className="flex gap-3 pt-6 border-t">
          <Button 
            onClick={() => onStartCase(lab.id)}
            className="flex-1 bg-secondary hover:bg-secondary/90"
          >
            Start Case with This Lab
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LabProfileModal;