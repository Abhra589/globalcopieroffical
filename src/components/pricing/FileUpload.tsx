import React, { useState, useRef } from 'react';
import { UploadButton } from "./file-upload/UploadButton";
import { SelectedFile } from "./file-upload/SelectedFile";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { FileValidation } from "./file-upload/FileValidation";
import { FileUploadHandler } from "./file-upload/FileUploadHandler";
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
    event.preventDefault();
    const file = event.target.files?.[0] || null;
    
    if (!file) {
      setError("Please select a file");
      return;
    }

    setCurrentFile(file);
    setIsUploading(true);
    setError(null);
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleValidationComplete = (isValid: boolean, validationError?: string) => {
    if (!isValid) {
      setError(validationError || "Validation failed");
      setCurrentFile(null);
      setIsUploading(false);
      toast({
        title: "Error",
        description: validationError || "File validation failed",
        variant: "destructive",
      });
    }
  };

  const handleUploadComplete = (url: string, path: string) => {
    console.log("Upload completed successfully:", { url, path });
    if (currentFile) {
      onFileUpload(currentFile, url, path);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    }
    setIsUploading(false);
  };

  const handleUploadError = (uploadError: string) => {
    console.error("Upload error:", uploadError);
    setError(uploadError);
    setCurrentFile(null);
    setIsUploading(false);
    toast({
      title: "Error",
      description: uploadError || "Failed to upload file",
      variant: "destructive",
    });
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
      
      {currentFile && (
        <>
          <FileValidation
            file={currentFile}
            onValidationComplete={handleValidationComplete}
          />
          <FileUploadHandler
            file={currentFile}
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          />
          <SelectedFile
            fileName={currentFile.name}
            isUploading={isUploading}
          />
        </>
      )}
      
      {!currentFile && (
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