import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FileUploadError } from "./FileUploadError";

interface UploadButtonProps {
  onClick: (e: React.MouseEvent) => void;
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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (onClearError) {
      onClearError();
    }
    onClick(e);
  };

  return (
    <div className="relative">
      <Button 
        onClick={handleClick}
        disabled={isUploading}
        variant="default"
        className="w-full h-12 text-lg flex items-center gap-2 transition-all hover:bg-primary/90"
        type="button" // Explicitly set type to button to prevent form submission
      >
        <Upload className="w-5 h-5" />
        {isUploading ? 'Uploading...' : 'Upload PDF'}
      </Button>
      <FileUploadError error={error} showError={showError} />
    </div>
  );
};