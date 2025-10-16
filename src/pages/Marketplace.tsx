import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, MapPin, Clock, DollarSign, Star, Filter, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const labs = [
  {
    id: 1,
    name: "Precision Dental Lab",
    rating: 4.9,
    reviews: 127,
    turnaround: "10-12 days",
    avgPrice: "$350",
    location: "Dubai, UAE",
    specialties: ["Zirconia", "E-max", "Implants"],
    verified: true,
    goldCertified: true,
    featured: true,
    certifications: ["ISO 9001", "DAMAS"],
    cases: 450,
    turnaroundDays: 11,
  },
  {
    id: 2,
    name: "Elite Dental Solutions",
    rating: 4.8,
    reviews: 98,
    turnaround: "8-10 days",
    avgPrice: "$380",
    location: "Abu Dhabi, UAE",
    specialties: ["Veneers", "Full Arch", "E-max"],
    verified: true,
    goldCertified: true,
    featured: true,
    certifications: ["ISO 13485", "CE"],
    cases: 380,
    turnaroundDays: 9,
  },
  {
    id: 3,
    name: "Pro Lab Technologies",
    rating: 4.7,
    reviews: 156,
    turnaround: "12-14 days",
    avgPrice: "$320",
    location: "Sharjah, UAE",
    specialties: ["Zirconia", "Metal Ceramic", "Temporary"],
    verified: true,
    goldCertified: false,
    featured: false,
    certifications: ["ISO 9001"],
    cases: 620,
    turnaroundDays: 13,
  },
  {
    id: 4,
    name: "Digital Smile Lab",
    rating: 4.9,
    reviews: 84,
    turnaround: "7-9 days",
    avgPrice: "$400",
    location: "Dubai, UAE",
    specialties: ["Digital Workflow", "E-max", "Zirconia"],
    verified: true,
    goldCertified: true,
    featured: false,
    certifications: ["ISO 13485", "DAMAS"],
    cases: 290,
    turnaroundDays: 8,
  },
  {
    id: 5,
    name: "Crown Master Lab",
    rating: 4.6,
    reviews: 203,
    turnaround: "10-12 days",
    avgPrice: "$340",
    location: "Ajman, UAE",
    specialties: ["Crowns", "Bridges", "Implants"],
    verified: true,
    goldCertified: false,
    featured: false,
    certifications: ["ISO 9001"],
    cases: 780,
    turnaroundDays: 11,
  },
  {
    id: 6,
    name: "Aesthetic Dental Lab",
    rating: 4.8,
    reviews: 112,
    turnaround: "9-11 days",
    avgPrice: "$360",
    location: "Dubai, UAE",
    specialties: ["Veneers", "E-max", "Aesthetic Cases"],
    verified: true,
    goldCertified: true,
    featured: false,
    certifications: ["ISO 13485", "CE"],
    cases: 440,
    turnaroundDays: 10,
  },
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [turnaroundFilter, setTurnaroundFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
            <span className="text-xl font-bold text-foreground">DENTALEEM</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/marketplace" className="text-sm font-medium text-foreground">Marketplace</Link>
            <Button variant="ghost" size="sm">Dr. Sarah Ahmad</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Laboratory Marketplace</h1>
          <p className="text-muted-foreground">Browse and connect with verified dental laboratories</p>
        </div>

        {/* Filters & Search */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search labs by name or specialty..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="zirconia">Zirconia</SelectItem>
                <SelectItem value="emax">E-max</SelectItem>
                <SelectItem value="veneers">Veneers</SelectItem>
                <SelectItem value="implants">Implants</SelectItem>
              </SelectContent>
            </Select>
            <Select value={turnaroundFilter} onValueChange={setTurnaroundFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Turnaround" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Turnaround</SelectItem>
                <SelectItem value="1-3">1-3 Days</SelectItem>
                <SelectItem value="4-7">4-7 Days</SelectItem>
                <SelectItem value="8-plus">8+ Days</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="turnaround">Fastest Turnaround</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Labs Grid */}
        <div className="space-y-6">
          {labs.map((lab) => (
            <Card 
              key={lab.id} 
              className={`p-6 hover:shadow-xl transition-all ${lab.featured ? 'border-primary/50' : ''}`}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Lab Logo/Avatar */}
                <div className="flex-shrink-0 relative">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {lab.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  {lab.goldCertified && (
                    <div 
                      className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-lg flex items-center gap-1 border border-yellow-400/30"
                      title="Gold Certified — Dentaleem-approved lab compliant with international policies and export standards"
                    >
                      <Crown className="h-3 w-3" />
                      GOLD
                    </div>
                  )}
                </div>

                {/* Lab Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{lab.name}</h3>
                        {lab.goldCertified && (
                          <Badge className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-yellow-400/30 shadow-md">
                            <Crown className="h-3 w-3 mr-1" />
                            Gold Certified
                          </Badge>
                        )}
                        {lab.featured && (
                          <Badge className="bg-secondary/10 text-secondary border-secondary/20">Featured</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span className="font-medium text-foreground">{lab.rating}</span>
                          <span>({lab.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{lab.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lab.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="border-primary/30">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Avg. Turnaround</p>
                        <p className="text-sm font-medium text-foreground">{lab.turnaroundDays} Days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Avg Price</p>
                        <p className="text-sm font-medium text-foreground">{lab.avgPrice}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Certifications</p>
                      <p className="text-sm font-medium text-foreground">{lab.certifications.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Completed Cases</p>
                      <p className="text-sm font-medium text-foreground">{lab.cases}+</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="bg-primary hover:bg-primary/90">View Profile</Button>
                    <Button variant="outline">Start Case</Button>
                    <Button variant="ghost">Contact Lab</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Labs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
