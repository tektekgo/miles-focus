import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/ai-focus-logo.png";
import milesFocusLogo from "@/assets/miles-focus-logo-notext.png";

export const Header = () => {
  return (
    <header className="border-b border-white/10 sticky top-0 z-50 shadow-md" style={{ backgroundColor: 'hsl(208, 57%, 21%)' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Mobile back button */}
          <Link to="/" className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>

          {/* Logo and title */}
          <Link to="/" className="flex items-center gap-4 md:gap-6 hover:opacity-90 transition-opacity">
            <img src={milesFocusLogo} alt="MilesFocus" className="h-12 md:h-16 w-auto" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">MilesFocus</h1>
              <p className="text-sm md:text-base text-white/80">Mileage Tracking Made Simple</p>
            </div>
          </Link>

          {/* Theme toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle variant="header" />
            {/* Spacer for mobile to keep logo centered */}
            <div className="md:hidden w-2"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
