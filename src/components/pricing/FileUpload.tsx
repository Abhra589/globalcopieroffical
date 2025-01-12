import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { UploadButton } from "./file-upload/UploadButton";
import { FileUploadError } from "./file-upload/FileUploadError";
import { SelectedFile } from "./file-upload/SelectedFile";

interface FileUploadProps {
  onFileChange: (file: File, url: string, path: string) => void;
  isRequired?: boolean;
}

export const FileUpload = ({ onFileChange, isRequired = true }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setError(null);
    
    if (!file) {
      if (isRequired) {
        setError("Please upload a file");
      }
      return;
    }

    if (file.type !== 'application/pdf') {
      setError("Please upload a PDF file");
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size should be less than 100MB");
      toast({
        title: "Error",
        description: "File size should be less than 100MB",
        variant: "destructive",
      });
      return;
    }

    setCurrentFile(file);
    setIsUploading(true);

    try {
      const timestamp = Date.now();
      const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
      const filePath = `${timestamp}-${sanitizedFileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('print_files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      console.log('File uploaded successfully:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('print_files')
        .getPublicUrl(filePath);

      onFileChange(file, publicUrl, filePath);
      setError(null);

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      setCurrentFile(null);
      setError("Failed to upload file");
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
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
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-full max-w-md">
          <UploadButton 
            onClick={handleUploadClick}
            isUploading={isUploading}
          />
          <FileUploadError error={error} />
        </div>
        <SelectedFile fileName={currentFile?.name || null} />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />
      </div>
    </div>
  );
};