import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, BookOpen, DollarSign, FileText, Users } from "lucide-react";
import logoUrl from "@/assets/ai-focus-logo.png";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
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

        <h1 className="text-4xl font-bold mb-4">How IRS Mileage Works (In Plain English)</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Many people use their personal vehicle for work, medical appointments, charitable activities, or moving. 
          In some situations, the IRS allows taxpayers to deduct certain miles on their tax return. This page gives 
          a high-level, non-expert overview of how mileage deductions typically work, so you understand what MilesFocus 
          is helping you track.
        </p>

        <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            <strong>Important:</strong> This is general information, not tax advice. Always confirm your specific 
            situation with a tax professional or directly from IRS publications.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Standard Mileage Rate vs. Actual Expenses</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              In general, taxpayers who qualify to deduct vehicle use often choose between two methods:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Mileage Rate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>• You track your qualifying miles (for example, business miles)</p>
                  <p>• You multiply those miles by the IRS standard mileage rate for the year (e.g., X¢ per mile)</p>
                  <p>• This method is simple and popular for many individuals and small businesses</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actual Expense Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>• You track your actual vehicle costs: fuel, maintenance, insurance, depreciation, etc.</p>
                  <p>• You determine what portion of those expenses is related to qualifying use (such as business)</p>
                  <p>• This method can be more complex but useful in some cases</p>
                </CardContent>
              </Card>
            </div>

            <p className="mt-6 text-sm bg-muted p-4 rounded-lg">
              <strong>MilesFocus is designed to support the Standard Mileage Rate method</strong> by helping you 
              build a clean, per-trip mileage log.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Common Types of Deductible Mileage</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Depending on your circumstances and IRS rules for the year, mileage may fall into categories like:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Business Miles</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Driving that is directly related to your trade or business (for example, visiting clients, traveling 
                  between work locations). <strong>Commuting from home to your main place of work is generally not 
                  considered business mileage.</strong>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Medical Miles</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Miles driven primarily for medical care for yourself or qualifying family members, subject to IRS 
                  rules and thresholds.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Charitable Miles</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Miles driven while performing services for qualified charitable organizations, often at a different 
                  (lower) fixed rate.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Moving Miles</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  In some years and situations (often for members of the Armed Forces on active duty), certain 
                  moving-related mileage may be deductible.
                </CardContent>
              </Card>
            </div>

            <p className="mt-6 text-sm bg-muted p-4 rounded-lg">
              MilesFocus lets you tag trips with these purposes, but only you and your tax advisor can determine what 
              actually qualifies under current IRS rules.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">What Kind of Records Does the IRS Expect?</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              The IRS generally expects taxpayers to keep contemporaneous, detailed records of their mileage. 
              A typical mileage log often includes:
            </p>

            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Date of the trip</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Starting point and destination</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Purpose of the trip (business, medical, charitable, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Number of miles driven</span>
                </li>
              </ul>
            </div>

            <p className="mt-6 text-sm bg-muted p-4 rounded-lg">
              Some people also record odometer readings at the start and end of each trip; others rely on mapping 
              tools and digital logs. <strong>MilesFocus helps you generate a structured record of your trips, so 
              you don't have to build that log manually.</strong>
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">How MilesFocus Fits Into This</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              MilesFocus is a record-keeping tool. It:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">What MilesFocus Does</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>✓ Reads mileage data from your Google Timeline export</p>
                  <p>✓ Lets you review and categorize each trip</p>
                  <p>✓ Summarizes miles by purpose and by month</p>
                  <p>✓ Helps you export a report that you can share with your tax professional</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">What MilesFocus Does NOT Do</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>✗ Decide which of your trips qualify under IRS rules</p>
                  <p>✗ File your taxes</p>
                  <p>✗ Guarantee that any particular deduction will be allowed</p>
                </CardContent>
              </Card>
            </div>

            <p className="mt-6 text-center text-lg font-semibold">
              Think of it as a calculator and organizer, not a tax advisor.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-gradient-to-b from-primary/5 to-background p-8 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 text-center">Where to Learn More</h2>
            <p className="text-center text-muted-foreground mb-6">
              For detailed, authoritative information, always refer to:
            </p>
            <div className="space-y-3 max-w-2xl mx-auto">
              <p className="text-center">
                • IRS publications (for example, the publication that covers business expenses and mileage)
              </p>
              <p className="text-center">
                • The current year's IRS standard mileage rate announcement
              </p>
              <p className="text-center">
                • A certified tax professional or accountant
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <a 
                href="https://www.irs.gov/tax-professionals/standard-mileage-rates" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  View Official IRS Mileage Rates
                </Button>
              </a>
            </div>
          </section>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 border rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-2">Disclaimer</p>
            <p>
              This page is for general informational purposes only and is not intended as tax, legal, or financial advice.
              Always consult the IRS and a qualified tax professional before making decisions about mileage deductions or tax filing.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t py-8 px-4 mt-12 backdrop-blur-sm">
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

export default HowItWorks;
