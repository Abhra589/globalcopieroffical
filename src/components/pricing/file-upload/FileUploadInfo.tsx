import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

export const FileUploadInfo = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="file" className="flex items-center gap-2 text-lg font-medium">
        <Upload className="w-5 h-5" />
        Upload PDF Document
      </Label>
      <p className="text-sm text-muted-foreground">
        Maximum file size: 10MB
      </p>
    </div>
  );
};