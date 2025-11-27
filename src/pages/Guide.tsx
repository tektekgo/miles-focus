import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Smartphone, 
  Cloud, 
  AlertCircle, 
  CheckCircle, 
  Download,
  MapPin,
  FileJson
} from "lucide-react";
import logoUrl from "@/assets/ai-focus-logo.png";

const Guide = () => {
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
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl relative">
        <Link to="/app" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to App
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <Download className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold">How to Download Your Google Timeline Data</h1>
        </div>
        
        <p className="text-lg text-muted-foreground mb-8">
          MilesFocus uses a file exported from Google Maps Timeline called <code className="bg-muted px-2 py-1 rounded">location-history.json</code>. 
          Follow the steps below to download it safely from your Google account.
        </p>

        <div className="space-y-8">
          {/* Before You Begin */}
          <section>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Before You Begin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold">You must have Google Maps Timeline (Location History) turned ON.</p>
                <div className="bg-background p-4 rounded-lg border">
                  <p className="font-semibold mb-2">To check:</p>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Open Google Maps</li>
                    <li>Tap your profile picture → <strong>Your Timeline</strong></li>
                    <li>If it says "Turn On", enable it</li>
                    <li>Drive for at least 24 hours to collect some data</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Method 1 - Mobile App */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Method 1 — Export From Google Maps App (Recommended)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Works on Android and iPhone and gives the cleanest export.
            </p>

            <Card className="shadow-elevated bg-card">
              <CardHeader>
                <CardTitle>Steps:</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</span>
                    <span className="pt-1">Open <strong>Google Maps</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</span>
                    <span className="pt-1">Tap your <strong>profile picture</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</span>
                    <span className="pt-1">Select <strong>Your Timeline</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</span>
                    <span className="pt-1">Tap the <strong>3-dot menu</strong> (or the settings gear)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">5</span>
                    <span className="pt-1">Choose <strong>Settings and privacy</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">6</span>
                    <span className="pt-1">Scroll down and tap <strong>Download a copy of your Timeline data</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">7</span>
                    <span className="pt-1">Tap <strong>Download</strong></span>
                  </li>
                </ol>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2">Your phone will download a file named:</p>
                  <div className="space-y-1">
                    <p className="font-mono text-sm bg-background px-3 py-2 rounded border">location-history.json</p>
                    <p className="text-center text-muted-foreground text-sm">or</p>
                    <p className="font-mono text-sm bg-background px-3 py-2 rounded border">timeline-&lt;date&gt;.json</p>
                  </div>
                  <p className="mt-3 text-sm">
                    <strong>Upload this file into MilesFocus.</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Method 2 - Google Takeout */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Method 2 — Export Using Google Takeout</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Works for accounts with cloud-synced Timeline data. Some accounts store Timeline only on-device, 
              in which case this method downloads only settings.
            </p>

            <Card className="shadow-elevated bg-card">
              <CardHeader>
                <CardTitle>Steps:</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</span>
                    <span className="pt-1">
                      Go to:{" "}
                      <a 
                        href="https://takeout.google.com"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                      >
                        https://takeout.google.com
                      </a>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</span>
                    <span className="pt-1">Click <strong>Deselect all</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</span>
                    <span className="pt-1">Scroll and enable <strong>Timeline</strong> or <strong>Location History</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</span>
                    <div className="pt-1">
                      <p>Click <strong>Next Step</strong></p>
                      <p className="mt-2">Choose:</p>
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-muted-foreground">
                        <li>Export once</li>
                        <li>File type: .zip</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">5</span>
                    <span className="pt-1">When ready, download the ZIP</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">6</span>
                    <div className="pt-1">
                      <p>Look inside for:</p>
                      <div className="mt-2 space-y-1">
                        <p className="font-mono text-sm bg-muted px-3 py-2 rounded">location-history.json</p>
                        <p className="text-center text-muted-foreground text-sm">or</p>
                        <p className="font-mono text-sm bg-muted px-3 py-2 rounded">Semantic Location History/YYYY/MM.json</p>
                      </div>
                    </div>
                  </li>
                </ol>

                <p className="mt-6 text-sm font-semibold">
                  Upload the relevant JSON(s) into MilesFocus.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Common Issues */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Common Issues & Fixes</h2>
            </div>

            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>
                  <p className="font-semibold mb-2">I only see Settings.json</p>
                  <p className="text-sm text-muted-foreground">
                    This means your Timeline data is stored on your phone only. Use <strong>Method 1</strong> in the Google Maps app.
                  </p>
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>
                  <p className="font-semibold mb-2">My file has no trips</p>
                  <p className="text-sm text-muted-foreground">
                    Timeline may have been off. Turn it on → wait 24 hours → try again.
                  </p>
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>
                  <p className="font-semibold mb-2">The file has many entries</p>
                  <p className="text-sm text-muted-foreground">
                    Normal. MilesFocus filters only driving segments automatically.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* What File to Upload */}
          <section>
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="h-6 w-6 text-primary" />
                  What File Should I Upload?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Upload one of the following:</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <code className="bg-background px-3 py-1 rounded border">location-history.json</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <code className="bg-background px-3 py-1 rounded border">timeline-YYYY-MM-DD.json</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <code className="bg-background px-3 py-1 rounded border">YYYY_MONTH.json</code>
                    <span className="text-sm text-muted-foreground">(from Semantic Location History)</span>
                  </div>
                </div>

                <div className="bg-background p-4 rounded-lg border">
                  <p className="font-semibold mb-2">MilesFocus will extract your:</p>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>✓ Trip dates</li>
                    <li>✓ Driving segments</li>
                    <li>✓ Distance</li>
                    <li>✓ Times</li>
                    <li>✓ Coordinates</li>
                    <li>✓ Addresses</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Quick Summary */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 text-center">Quick Summary (3 steps)</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  1
                </div>
                <p className="font-semibold mb-1">Open Google Maps</p>
                <p className="text-sm text-muted-foreground">Go to Your Timeline</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  2
                </div>
                <p className="font-semibold mb-1">Download Data</p>
                <p className="text-sm text-muted-foreground">Settings & Privacy → Download</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  3
                </div>
                <p className="font-semibold mb-1">Upload to MilesFocus</p>
                <p className="text-sm text-muted-foreground">Start tracking mileage</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link to="/app">
                <Button size="lg">
                  Upload Your Timeline Now
                </Button>
              </Link>
            </div>
          </section>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-muted/50 border rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This guide is for general informational purposes only. Google may change 
            features over time. If you cannot locate your Timeline export, please check Google Maps support for 
            the latest instructions.
          </p>
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

export default Guide;
