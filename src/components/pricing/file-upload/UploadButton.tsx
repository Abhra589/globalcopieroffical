import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FileUploadError } from "./FileUploadError";

interface UploadButtonProps {
  onClick: () => void;
  isUploading: boolean;
  error: string | null;
  showError?: boolean;
}

export const UploadButton = ({ onClick, isUploading, error, showError = false }: UploadButtonProps) => {
  return (
    <div className="relative">
      <Button 
        onClick={onClick}
        disabled={isUploading}
        variant={error && showError ? "destructive" : "default"}
        className="w-full h-12 text-lg flex items-center gap-2"
      >
        <Upload className="w-5 h-5" />
        Upload PDF
      </Button>
      <FileUploadError error={error} showError={showError} />
    </div>
  );
};