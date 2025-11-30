import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import MarketplaceFilters from "@/components/MarketplaceFilters";
import MarketplaceStats from "@/components/MarketplaceStats";
import LabCard from "@/components/LabCard";
import LabProfileModal from "@/components/LabProfileModal";
import { toast } from "sonner";

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filteredLabs, setFilteredLabs] = useState(labs);
  const [selectedLab, setSelectedLab] = useState<typeof labs[0] | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Calculate stats
  const totalLabs = labs.length;
  const goldCertified = labs.filter(lab => lab.goldCertified).length;
  const avgTurnaround = labs.reduce((sum, lab) => sum + lab.turnaroundDays, 0) / labs.length;
  const avgRating = labs.reduce((sum, lab) => sum + lab.rating, 0) / labs.length;

  const handleApplyFilters = (filters: any) => {
    let filtered = [...labs];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(lab => 
        lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lab.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply certification filter
    if (filters.certification !== "all") {
      if (filters.certification === "gold") {
        filtered = filtered.filter(lab => lab.goldCertified);
      } else if (filters.certification === "standard") {
        filtered = filtered.filter(lab => !lab.goldCertified && lab.verified);
      }
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(lab => lab.rating >= filters.rating);
    }

    setFilteredLabs(filtered);
    toast.success(`Filters applied! ${filtered.length} labs found`);
  };

  const handleResetFilters = () => {
    setFilteredLabs(labs);
    setSearchTerm("");
    setSortBy("recommended");
    toast.info("Filters reset");
  };

  const handleStatClick = (filterType: string) => {
    if (filterType === "gold") {
      const goldLabs = labs.filter(lab => lab.goldCertified);
      setFilteredLabs(goldLabs);
      toast.info(`Showing ${goldLabs.length} Gold Certified labs`);
    }
  };

  const handleViewProfile = (labId: number) => {
    const lab = labs.find(l => l.id === labId);
    if (lab) {
      setSelectedLab(lab);
      setProfileModalOpen(true);
    }
  };

  const handleStartCase = (labId: number) => {
    navigate(`/create-case?lab=${labId}`);
  };

  const handleContact = (labId: number) => {
    toast.info("Opening chat with lab...");
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredLabs];

    switch(value) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "turnaround":
        sorted.sort((a, b) => a.turnaroundDays - b.turnaroundDays);
        break;
      case "price-low":
        sorted.sort((a, b) => parseInt(a.avgPrice.replace(/\D/g, '')) - parseInt(b.avgPrice.replace(/\D/g, '')));
        break;
      case "price-high":
        sorted.sort((a, b) => parseInt(b.avgPrice.replace(/\D/g, '')) - parseInt(a.avgPrice.replace(/\D/g, '')));
        break;
      default:
        // Recommended keeps original order with featured first
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredLabs(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card sticky top-0 z-40">
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
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/marketplace" className="text-sm font-medium text-foreground">
              Marketplace
            </Link>
            <Button variant="ghost" size="sm">Dr. Sarah Ahmad</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Marketplace</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header with Gradient */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-br from-card to-primary/5 p-4 sm:p-6 rounded-xl border border-border/50 sticky top-16 z-10 backdrop-blur-md shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Discover Dental Labs</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Find the perfect lab for your restorations — verified, rated, and ready to deliver.
          </p>
        </div>

        {/* Stats */}
        <MarketplaceStats
          totalLabs={totalLabs}
          goldCertified={goldCertified}
          avgTurnaround={avgTurnaround}
          avgRating={avgRating}
          onStatClick={handleStatClick}
        />

        {/* Enhanced Search & Sort Bar */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search labs by name, city, or specialization..."
                className="pl-10 h-11 border-border focus:border-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-full md:w-[200px] h-11 border-border">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="turnaround">Fastest Delivery</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <MarketplaceFilters
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                />
              </SheetContent>
            </Sheet>
          </div>
        </Card>

        {/* Main Content: Filters + Labs Grid */}
        <div className="flex gap-6">
          {/* Left Sidebar - Filters (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <MarketplaceFilters
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            </Card>
          </aside>

          {/* Labs Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredLabs.length} of {totalLabs} labs
              </p>
            </div>

            {/* Enhanced Labs Grid with Animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredLabs.map((lab, index) => (
                <div 
                  key={lab.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <LabCard
                    lab={lab}
                    onViewProfile={handleViewProfile}
                    onStartCase={handleStartCase}
                    onContact={handleContact}
                  />
                </div>
              ))}
            </div>

            {/* Load More */}
            {filteredLabs.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Labs
                </Button>
              </div>
            )}

            {/* Enhanced Empty State */}
            {filteredLabs.length === 0 && (
              <Card className="p-12 text-center border-dashed border-2 border-muted-foreground/30 animate-fade-in">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No labs found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={handleResetFilters} variant="outline" className="min-w-[140px]">
                  Reset Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Lab Profile Modal */}
      <LabProfileModal
        lab={selectedLab}
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onStartCase={handleStartCase}
      />
    </div>
  );
};

export default Marketplace;
