import { useState } from 'react';
import { uploadFile } from '@/utils/s3Config';
import { useToast } from "@/hooks/use-toast";

interface FileUploadHandlerProps {
  file: File;
  onUploadComplete: (url: string, path: string) => void;
  onUploadError: (error: string) => void;
}

export const FileUploadHandler = ({ file, onUploadComplete, onUploadError }: FileUploadHandlerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const { url, path } = await uploadFile(file);
      onUploadComplete(url, path);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      onUploadError("Failed to upload file. Please try again.");
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return null;
};