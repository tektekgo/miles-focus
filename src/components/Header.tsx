import logo from "@/assets/ai-focus-logo.png";

export const Header = () => {
  return (
    <header className="bg-primary border-b border-primary/10">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src={logo} alt="AI-Focus Technologies" className="h-24 w-auto" />
          <div>
            <h1 className="text-3xl font-bold text-primary-foreground">MilesFocus</h1>
            <p className="text-base text-primary-foreground/80">Mileage Tracking Made Simple</p>
          </div>
        </div>
      </div>
    </header>
  );
};
