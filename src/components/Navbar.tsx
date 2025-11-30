import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "AR" : "EN");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">DENTALEEM</span>
        </Link>
        
        {/* Center Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <a 
            href="#home" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#marketplace" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
          >
            Marketplace
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
          >
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#for-dentists" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
          >
            For Dentists
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#for-labs" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
          >
            For Labs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#pricing" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#about" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary transition-colors"
          >
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{language}</span>
          </button>
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button 
              size="sm" 
              className="bg-accent text-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transition-all"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#marketplace" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Marketplace
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#for-dentists" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              For Dentists
            </a>
            <a href="#for-labs" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              For Labs
            </a>
            <a href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About Us
            </a>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border"
              >
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{language}</span>
              </button>
              <Link to="/auth" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth" className="flex-1">
                <Button size="sm" className="w-full bg-accent text-foreground hover:bg-accent/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
