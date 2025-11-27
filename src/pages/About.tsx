import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Target, Users, AlertCircle } from "lucide-react";
import logoUrl from "@/assets/ai-focus-logo.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-6">
            <img src={logoUrl} alt="AI-Focus Logo" className="h-16 w-16" />
            <div>
              <h1 className="text-3xl font-bold text-primary">MilesFocus</h1>
              <p className="text-sm text-muted-foreground">by AI-Focus Technologies</p>
            </div>
          </Link>
          <Link to="/app">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-4">About MilesFocus</h1>
        <p className="text-xl text-muted-foreground mb-12">
          A mileage-tracking companion built by AI-Focus Technologies. Our goal is simple: take the friction out of 
          turning your real-world driving into clean, structured mileage records you can actually use.
        </p>

        <div className="space-y-12">
          {/* What is MilesFocus */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">What is MilesFocus?</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              MilesFocus is a focused, lightweight web app that converts your Google Maps Timeline export into a clear, 
              organized mileage log. Instead of manually typing every trip into a spreadsheet, you upload a JSON file, 
              review and tag your trips, and export a clean report in minutes.
            </p>
          </section>

          {/* Why we built it */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Why We Built It</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Many independent professionals, small business owners, and frequent drivers know they "should be tracking 
              mileage," but the process is tedious and confusing. We built MilesFocus to:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">Leverage data you already have</p>
                  <p className="text-sm text-muted-foreground">Google Timeline tracks where you go automatically</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">Remove manual data entry</p>
                  <p className="text-sm text-muted-foreground">No more typing addresses and miles by hand</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">Make categorizing trips fast</p>
                  <p className="text-sm text-muted-foreground">Visual interface to tag trips by purpose quickly</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold mb-2">Give you clear summaries</p>
                  <p className="text-sm text-muted-foreground">Reports you can use when meeting your tax professional</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Who is behind MilesFocus */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Who is Behind MilesFocus?</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-6">
              MilesFocus is created by{" "}
              <a 
                href="https://www.ai-focus.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                AI-Focus Technologies
              </a>
              , a boutique initiative focused on practical, real-world automation and AI-assisted tools.
            </p>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">We care about building tools that are:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold">Understandable</p>
                    <p className="text-sm text-muted-foreground">No black boxes, no magic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold">Useful</p>
                    <p className="text-sm text-muted-foreground">Solve one real problem well</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <div>
                    <p className="font-semibold">Responsible</p>
                    <p className="text-sm text-muted-foreground">
                      With clear disclosures about what the tool can and cannot do
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-muted-foreground">
              Built by{" "}
              <a 
                href="https://www.sujitg.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Sujit Gangadharan
              </a>
            </p>
          </section>

          {/* Privacy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">How We Think About Privacy</h2>
            </div>
            <p className="text-muted-foreground text-lg mb-6">
              Your mileage data is sensitive. MilesFocus is built with the mindset that:
            </p>

            <div className="space-y-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">You Should Stay in Control</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  You decide what you upload and when
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">You Should Know What We're Doing</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  The app processes your data in your browser for the current session
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">You Should Have Full Control</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Export and manage your data at any time (for hosted versions)
                </CardContent>
              </Card>
            </div>

            <p className="mt-6 text-sm bg-muted p-4 rounded-lg">
              If you're running MilesFocus yourself (for example, deployed to Vercel with your own GitHub repo), 
              your data stays entirely in your own infrastructure.
            </p>
          </section>

          {/* What MilesFocus is not */}
          <section className="bg-muted/50 border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">What MilesFocus is NOT</h2>
            <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto">
              MilesFocus is <strong>not a replacement for professional tax advice</strong>. We don't tell you what to 
              deduct, how to file, or what the "right" answer is for your situation. We give you clean mileage numbers 
              and structured logs so the humans (you and your tax pro) can make informed decisions.
            </p>
          </section>

          {/* Closing */}
          <section className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-8">
              MilesFocus is part of the broader{" "}
              <a 
                href="https://www.ai-focus.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                AI-Focus ecosystem
              </a>
              : tools and training that combine automation, AI, and practical engineering to make real work simpler.
            </p>
            <Link to="/app">
              <Button size="lg" className="text-lg px-12">
                Try MilesFocus Now
              </Button>
            </Link>
          </section>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 border rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-2">Disclaimer</p>
            <p>
              MilesFocus does not provide tax, legal, or financial advice. All mileage and deduction amounts are estimates only.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-8 px-4 mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
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
      </footer>
    </div>
  );
};

export default About;
