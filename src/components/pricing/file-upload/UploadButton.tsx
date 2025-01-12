import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onClick: () => void;
  isUploading: boolean;
}

export const UploadButton = ({ onClick, isUploading }: UploadButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      disabled={isUploading}
      className="w-full h-12 text-lg flex items-center gap-2"
    >
      <Upload className="w-5 h-5" />
      Upload PDF
    </Button>
  );
};