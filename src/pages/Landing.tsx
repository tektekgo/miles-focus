import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, BarChart3, FileText, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logoUrl from "@/assets/ai-focus-logo.png";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <img src={logoUrl} alt="AI-Focus Logo" className="h-24 w-24" />
            <div>
              <h1 className="text-4xl font-bold text-primary">MilesFocus</h1>
              <p className="text-base text-muted-foreground">by AI-Focus Technologies</p>
            </div>
          </div>
          <Link to="/app">
            <Button size="lg">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Turn Your Google Timeline Into
            <br />
            <span className="text-primary">IRS-Ready Mileage Reports</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Extract, organize, and export your driving mileage with professional reports ready for tax season.
            Simple, accurate, and completely private.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button size="lg" className="text-lg px-8">
                Start Tracking Mileage <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="https://www.ai-focus.org" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn About AI-Focus
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose MilesFocus?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20">
              <CardHeader>
                <FileUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Simple Upload</CardTitle>
                <CardDescription>
                  Export your Google Timeline JSON and upload it—no complex setup or installations required
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Categorization</CardTitle>
                <CardDescription>
                  Automatically extract driving trips and categorize by purpose: Business, Medical, Charitable, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Professional Reports</CardTitle>
                <CardDescription>
                  Generate IRS-ready PDF and Excel reports with calculated deductions based on official mileage rates
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Export Your Google Timeline</h4>
                <p className="text-muted-foreground">
                  Download your location history from Google Takeout as a JSON file
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Upload & Process</h4>
                <p className="text-muted-foreground">
                  Upload your file to MilesFocus—we'll automatically extract all driving trips and geocode addresses
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Categorize Your Trips</h4>
                <p className="text-muted-foreground">
                  Review and assign purposes (Business, Medical, Charitable, etc.) to each trip
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Export Your Reports</h4>
                <p className="text-muted-foreground">
                  Download professional PDF and Excel reports with estimated deductions ready for your tax professional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-12">Built for Tax Season</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  2025 IRS Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically calculates deductions using current IRS standard mileage rates (Business: 70¢, Medical: 21¢, Charitable: 14¢)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Custom Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Need different rates? Edit and save custom rates with side-by-side comparison to official IRS rates
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Privacy First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All processing happens in your browser. Your location data never leaves your device.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Professional Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Export beautiful, branded PDF and Excel reports with legal disclaimers and detailed trip logs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto max-w-3xl text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Ready to Simplify Your Mileage Tracking?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Start creating professional, IRS-ready mileage reports in minutes. Completely free to use.
          </p>
          <Link to="/app">
            <Button size="lg" className="text-lg px-12">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoUrl} alt="AI-Focus Logo" className="h-8 w-8" />
                <h4 className="font-bold text-lg">MilesFocus</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional mileage tracking made simple. Built by AI-Focus Technologies.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <div className="space-y-2 text-sm">
                <Link 
                  to="/how-it-works"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  How IRS Mileage Works
                </Link>
                <Link 
                  to="/faq"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
                <Link 
                  to="/about"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  About MilesFocus
                </Link>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <div className="space-y-2 text-sm">
                <a 
                  href="https://www.ai-focus.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  AI-Focus Technologies
                </a>
                <a 
                  href="https://www.sujitg.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  About the Developer
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="text-xs">
                  MilesFocus provides mileage calculations based on publicly available IRS rates. 
                  This tool does not provide tax, legal, or financial advice.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()}{" "}
              <a 
                href="https://www.ai-focus.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline"
              >
                AI-Focus Technologies
              </a>
              . All rights reserved. Built by{" "}
              <a 
                href="https://www.sujitg.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline"
              >
                Sujit Gangadharan
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
