import { useState } from "react";
import { Upload, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GoogleTimelineActivity } from "@/types/trip";

interface FileUploadProps {
  onDataLoaded: (data: GoogleTimelineActivity[]) => void;
}

export const FileUpload = ({ onDataLoaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.json')) {
      toast({
        title: "Invalid File",
        description: "Please upload a valid JSON file from Google Timeline.",
        variant: "destructive",
      });
      return;
    }

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!Array.isArray(data)) {
        throw new Error("Invalid format: Expected an array");
      }
      
      onDataLoaded(data);
      
      toast({
        title: "Success!",
        description: `Loaded ${data.length} timeline entries.`,
      });
    } catch (error) {
      toast({
        title: "Parse Error",
        description: "Could not parse JSON file. Please check the format.",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Card
      className={`p-12 border-2 border-dashed transition-all ${
        isDragging
          ? "border-accent bg-accent/5"
          : "border-border hover:border-accent/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-primary/10 p-6">
          <Upload className="h-12 w-12 text-primary" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Upload Your Google Timeline</h3>
          <p className="text-muted-foreground mb-4">
            Drop your <code className="px-2 py-1 bg-muted rounded text-sm">location-history.json</code> file here
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="default" size="lg">
            <label className="cursor-pointer">
              <FileJson className="mr-2 h-5 w-5" />
              Select File
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground max-w-md">
          Your data is processed locally in your browser. No information is uploaded to any server.
        </p>
      </div>
    </Card>
  );
};
