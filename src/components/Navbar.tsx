import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">DENTALEEM</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#marketplace" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Marketplace
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#for-dentists" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            For Dentists
          </a>
          <a href="#for-labs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            For Labs
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
