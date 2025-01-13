import React, { useState, useRef } from 'react';
import { UploadButton } from "./file-upload/UploadButton";
import { SelectedFile } from "./file-upload/SelectedFile";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { validateFile, handleFileValidationError } from '@/utils/fileUpload';
import { uploadFile } from '@/utils/s3Config';
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File | null, url: string, path?: string) => void;
  isRequired?: boolean;
  isSubmitting?: boolean;
}

export const FileUpload = ({ onFileUpload, isRequired = false, isSubmitting = false }: FileUploadProps) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setError(null);
    
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.isValid) {
      if (isSubmitting) {
        setError(validation.error);
        handleFileValidationError(validation.error!);
      }
      return;
    }

    setCurrentFile(file);
    setIsUploading(true);

    try {
      const { url, path } = await uploadFile(file);
      onFileUpload(file, url, path);
      setError(null);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (err) {
      console.error('Error uploading file:', err);
      if (isSubmitting) {
        setError('Failed to upload file. Please try again.');
        handleFileValidationError('Failed to upload file. Please try again.');
      }
      setCurrentFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
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
          showError={false}
          onClearError={handleClearError}
        />
      )}
    </div>
  );
};