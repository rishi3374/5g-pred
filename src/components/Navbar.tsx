
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Cog, Home, LineChart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Model Comparison", path: "/model-comparison", icon: BarChart3 },
  { name: "Features", path: "/features", icon: LineChart },
  { name: "Settings", path: "/settings", icon: Cog },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 bg-background border-b border-border z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-primary font-bold text-xl">
                5G Coverage Predictor
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
                onClick={closeMenu}
              >
                <link.icon className="mr-2 h-5 w-5" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
