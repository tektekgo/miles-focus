import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ai-focus-logo.png";

export const Header = () => {
  return (
    <header className="bg-primary border-b border-primary/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Mobile back button */}
          <Link to="/" className="md:hidden">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>

          {/* Logo and title */}
          <Link to="/" className="flex items-center gap-6 hover:opacity-80 transition-opacity">
            <img src={logo} alt="AI-Focus Technologies" className="h-16 md:h-24 w-auto" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">MilesFocus</h1>
              <p className="text-sm md:text-base text-primary-foreground/80">Mileage Tracking Made Simple</p>
            </div>
          </Link>

          {/* Spacer for mobile to keep logo centered */}
          <div className="md:hidden w-10"></div>
        </div>
      </div>
    </header>
  );
};
