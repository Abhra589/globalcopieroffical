import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { UploadProgress } from "./file-upload/UploadProgress";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileChange: (file: File | null, uploadedUrl: string, filePath?: string) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      onFileChange(null, "", "");
      return;
    }

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 50) {
      toast({
        title: "File too large",
        description: "Please contact admin for files larger than 50MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('print_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('print_files')
        .getPublicUrl(filePath);

      console.log('File uploaded successfully:', { filePath, publicUrl });
      
      onFileChange(file, publicUrl, filePath);
      
      toast({
        title: "File uploaded successfully",
        description: "Your document has been uploaded",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
      onFileChange(null, "", "");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <FileUploadInfo />
      <div className="flex justify-center">
        <Button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="w-48 h-12 text-lg flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload PDF
        </Button>
        <Input
          ref={fileInputRef}
          id="file"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </div>
      <UploadProgress isUploading={isUploading} />
    </div>
  );
};