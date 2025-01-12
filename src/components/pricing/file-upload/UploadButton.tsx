import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onClick: () => void;
  isUploading: boolean;
  error: string | null;
}

export const UploadButton = ({ onClick, isUploading, error }: UploadButtonProps) => {
  return (
    <div className="relative">
      <Button 
        onClick={onClick}
        disabled={isUploading}
        variant={error ? "destructive" : "default"}
        className="w-full h-12 text-lg flex items-center gap-2"
      >
        <Upload className="w-5 h-5" />
        Upload PDF
      </Button>
      {error && (
        <p className="absolute mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};