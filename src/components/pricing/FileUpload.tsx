import React, { useState, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    if (file.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size should be less than 100MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const timestamp = new Date().getTime();
      const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
      const filePath = `${timestamp}-${sanitizedFileName}`;

      const { data, error } = await supabase.storage
        .from('print_files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      console.log('File uploaded successfully:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('print_files')
        .getPublicUrl(filePath);

      onFileChange(file, publicUrl, filePath);

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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