import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FileUploadError } from "./FileUploadError";

interface UploadButtonProps {
  onClick: () => void;
  isUploading: boolean;
  error: string | null;
  showError?: boolean;
  onClearError?: () => void;
}

export const UploadButton = ({ 
  onClick, 
  isUploading, 
  error, 
  showError = false,
  onClearError 
}: UploadButtonProps) => {
  const handleClick = () => {
    if (onClearError) {
      onClearError();
    }
    onClick();
  };

  return (
    <div className="relative">
      <Button 
        onClick={handleClick}
        disabled={isUploading}
        variant="default"
        className="w-full h-12 text-lg flex items-center gap-2 transition-all hover:bg-primary/90"
      >
        <Upload className="w-5 h-5" />
        {isUploading ? 'Uploading...' : 'Upload PDF'}
      </Button>
      <FileUploadError error={error} showError={showError} />
    </div>
  );
};