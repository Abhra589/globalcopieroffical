import React, { useState, useRef } from 'react';
import { UploadButton } from "./file-upload/UploadButton";
import { SelectedFile } from "./file-upload/SelectedFile";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { validateFile } from '@/utils/fileUpload';
import { uploadFile } from '@/utils/s3Config';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent form submission
    const file = event.target.files?.[0] || null;
    
    if (!file) {
      setError("Please select a file");
      return;
    }

    // Validate file type and size
    const validation = validateFile(file, {
      maxSize: 50 * 1024 * 1024, // 50MB
      allowedTypes: ['application/pdf'],
      required: true
    });

    if (!validation.isValid) {
      setError(validation.error || "Invalid file");
      toast({
        title: "Error",
        description: validation.error || "Invalid file",
        variant: "destructive",
      });
      return;
    }

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

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!pageCount || pageCount <= 0) {
      setError("Please enter the number of pages first");
      toast({
        title: "Error",
        description: "Please enter the number of pages first",
        variant: "destructive",
      });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleClearError = () => {
    setError(null);
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
          onClearError={handleClearError}
        />
      )}
    </div>
  );
};