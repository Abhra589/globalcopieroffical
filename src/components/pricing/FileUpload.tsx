import { useState, useRef } from "react";
import { uploadFile } from "@/utils/s3Config";
import { FileUploadError } from "./file-upload/FileUploadError";
import { UploadButton } from "./file-upload/UploadButton";
import { SelectedFile } from "./file-upload/SelectedFile";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { AdminContact } from "./file-upload/AdminContact";

interface FileUploadProps {
  onFileUpload: (file: File | null, url: string, path?: string) => void;
  isRequired?: boolean;
}

export const FileUpload = ({ onFileUpload, isRequired = false }: FileUploadProps) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }

    setCurrentFile(file);
    setIsUploading(true);

    try {
      const { url, path } = await uploadFile(file);
      onFileUpload(file, url, path);
      setError(null);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file. Please try again.');
      setCurrentFile(null);
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
      
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <UploadButton 
            onClick={handleUploadClick}
            isUploading={isUploading}
          />
          {error && <FileUploadError error={error} />}
        </div>
        <SelectedFile fileName={currentFile?.name || null} />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <AdminContact />
    </div>
  );
};