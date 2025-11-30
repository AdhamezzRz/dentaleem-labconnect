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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          <span className="text-lg sm:text-xl font-bold text-primary tracking-tight">DENTALEEM</span>
        </Link>
        
        {/* Center Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group cursor-pointer"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#marketplace" 
            onClick={(e) => { e.preventDefault(); document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group cursor-pointer"
          >
            Marketplace
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group cursor-pointer"
          >
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#for-dentists" 
            onClick={(e) => { e.preventDefault(); document.getElementById('for-dentists')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group cursor-pointer"
          >
            For Dentists
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#for-labs" 
            onClick={(e) => { e.preventDefault(); document.getElementById('for-labs')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group cursor-pointer"
          >
            For Labs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group cursor-pointer"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:border-primary transition-colors"
          >
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{language}</span>
          </button>
          <Link to="/lab/landing">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
              Join as Lab
            </Button>
          </Link>
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
          className="lg:hidden h-10 w-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border/50 shadow-lg animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="text-base font-medium text-foreground hover:text-primary transition-colors cursor-pointer py-2 px-2 rounded-lg hover:bg-accent/50"
            >
              Home
            </a>
            <a 
              href="#marketplace" 
              onClick={(e) => { e.preventDefault(); document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Marketplace
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <a 
              href="#for-dentists" 
              onClick={(e) => { e.preventDefault(); document.getElementById('for-dentists')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              For Dentists
            </a>
            <a 
              href="#for-labs" 
              onClick={(e) => { e.preventDefault(); document.getElementById('for-labs')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              For Labs
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Pricing
            </a>
            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border"
              >
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{language}</span>
              </button>
              <Link to="/lab/landing">
                <Button variant="ghost" size="sm" className="w-full">
                  Join as Lab
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
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
