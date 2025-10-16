import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Star,
  MapPin,
  Clock,
  DollarSign,
  Crown,
  CheckCircle2,
  Award,
  Phone,
  Mail,
  Globe,
  Heart,
  MessageSquare,
} from "lucide-react";

const LabProfile = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock lab data - in real app, fetch based on URL param
  const lab = {
    id: 1,
    name: "Precision Dental Lab",
    rating: 4.9,
    reviews: 127,
    turnaround: "10-12 days",
    avgPrice: "$350",
    location: "Dubai, UAE",
    specialties: ["Zirconia", "E-max", "Implants", "Veneers"],
    verified: true,
    goldCertified: true,
    certifications: ["ISO 9001", "ISO 13485", "DAMAS", "CE Certified"],
    cases: 450,
    turnaroundDays: 11,
    description:
      "Leading dental laboratory with over 15 years of experience in high-quality prosthetic solutions. We specialize in digital workflows and premium materials.",
    phone: "+971 4 123 4567",
    email: "info@precisiondentallab.ae",
    website: "www.precisiondentallab.ae",
    gallery: [
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
      "https://images.unsplash.com/photo-1609840114035-3c981c6e46de?w=400",
    ],
  };

  const recentReviews = [
    {
      id: 1,
      dentist: "Dr. Sarah M.",
      rating: 5,
      comment: "Exceptional quality and fast turnaround. Highly recommend!",
      date: "2 days ago",
      tags: ["Excellent Quality", "Fast Communication", "On-Time Delivery"],
    },
    {
      id: 2,
      dentist: "Dr. Ahmed K.",
      rating: 5,
      comment: "Professional service and perfect fit every time.",
      date: "1 week ago",
      tags: ["Great Fit", "Professional", "Value for Money"],
    },
    {
      id: 3,
      dentist: "Dr. Layla H.",
      rating: 4,
      comment: "Good quality work, minor adjustments needed but overall satisfied.",
      date: "2 weeks ago",
      tags: ["Excellent Quality", "Professional"],
    },
  ];

  const services = [
    { name: "Zirconia Crowns", price: "$350", turnaround: "10-12 days" },
    { name: "E-max Veneers", price: "$400", turnaround: "8-10 days" },
    { name: "Implant Restorations", price: "$450", turnaround: "12-14 days" },
    { name: "Full Arch Solutions", price: "$3500", turnaround: "14-16 days" },
    { name: "PMMA Try-In", price: "$150", turnaround: "5-7 days" },
    { name: "Temporary Crowns", price: "$100", turnaround: "3-5 days" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <main className="flex-1">
          {/* Top Bar */}
          <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-bold text-foreground">Lab Profile</h1>
            </div>
            <Button onClick={() => navigate("/marketplace")} variant="ghost">
              ← Back to Marketplace
            </Button>
          </div>

          <div className="container mx-auto px-6 py-8">
            {/* Header Card */}
            <Card className="p-8 mb-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Lab Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {lab.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  {lab.goldCertified && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1 border border-yellow-400/30">
                      <Crown className="h-4 w-4" />
                      GOLD
                    </div>
                  )}
                </div>

                {/* Lab Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-foreground">
                          {lab.name}
                        </h1>
                        {lab.goldCertified && (
                          <Badge className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-yellow-400/30 shadow-md">
                            <Crown className="h-3 w-3 mr-1" />
                            Gold Certified
                          </Badge>
                        )}
                        {lab.verified && (
                          <CheckCircle2 className="h-6 w-6 text-secondary" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span className="font-medium text-foreground">
                            {lab.rating}
                          </span>
                          <span>({lab.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{lab.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant={isFavorite ? "default" : "outline"}
                        size="icon"
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isFavorite ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        onClick={() => navigate("/create-case")}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Start Case
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{lab.description}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Avg. Turnaround
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {lab.turnaroundDays} Days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Starting Price
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {lab.avgPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Completed Cases
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {lab.cases}+
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-sm font-medium text-secondary">
                          Verified Lab
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{lab.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{lab.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${lab.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {lab.website}
                  </a>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="services">Services & Pricing</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({lab.reviews})
                </TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              {/* Services Tab */}
              <TabsContent value="services">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Services & Pricing
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground">
                            {service.name}
                          </h3>
                          <span className="text-lg font-bold text-primary">
                            {service.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{service.turnaround}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Work Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {lab.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors"
                      >
                        <img
                          src={image}
                          alt={`Lab work ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Recent Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-secondary text-secondary" />
                      <span className="text-2xl font-bold text-foreground">
                        {lab.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                              {review.dentist}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-secondary text-secondary"
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-sm text-foreground mb-3">
                          {review.comment}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {review.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Certifications Tab */}
              <TabsContent value="certifications">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Certifications & Specialties
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Certifications
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {lab.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors"
                        >
                          <Award className="h-8 w-8 mx-auto mb-2 text-secondary" />
                          <p className="text-sm font-medium text-foreground">
                            {cert}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {lab.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="text-base px-4 py-2 border-primary/30"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* CTA Section */}
            <Card className="p-8 mt-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Ready to Work with {lab.name}?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start a new case and experience premium dental lab services
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate("/create-case")}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Start a Case
                  </Button>
                  <Button size="lg" variant="outline">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contact Lab
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LabProfile;
