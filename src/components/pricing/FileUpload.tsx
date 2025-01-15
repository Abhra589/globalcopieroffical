import React, { useState, useRef } from 'react';
import { UploadButton } from "./file-upload/UploadButton";
import { SelectedFile } from "./file-upload/SelectedFile";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { validateFile } from '@/utils/fileUpload';
import { uploadFile } from '@/utils/s3Config';
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File | null, url: string, path?: string) => void;
  isRequired?: boolean;
  isSubmitting?: boolean;
  pageCount?: number;
}

export const FileUpload = ({ 
  onFileUpload, 
  isRequired = false, 
  isSubmitting = false,
  pageCount
}: FileUploadProps) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (!file) return;

    setCurrentFile(file);
    setIsUploading(true);
    setError(null);

    try {
      const { url, path } = await uploadFile(file);
      onFileUpload(file, url, path);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      setCurrentFile(null);
      setError("Failed to upload file. Please try again.");
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
    if (!pageCount || pageCount <= 0) {
      setError("Please enter the number of pages first");
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />
      
      <FileUploadInfo />
      
      {currentFile ? (
        <SelectedFile
          fileName={currentFile.name}
          isUploading={isUploading}
        />
      ) : (
        <UploadButton
          onClick={handleUploadClick}
          isUploading={isUploading}
          error={error}
          showError={!!error}
          onClearError={() => setError(null)}
        />
      )}
    </div>
  );
};