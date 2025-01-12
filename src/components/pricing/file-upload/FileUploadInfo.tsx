import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { AdminContact } from "./AdminContact";

export const FileUploadInfo = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="file" className="flex items-center gap-2">
        <Upload className="w-4 h-4" />
        Upload PDF Document
      </Label>
      <p className="text-sm text-muted-foreground">
        Please upload a file within 50MB. For larger files, contact admin:
      </p>
      <p className="text-sm text-muted-foreground italic">
        We will be capable of receiving larger orders of your choice soon!
      </p>
      <AdminContact />
    </div>
  );
};