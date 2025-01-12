import { useState, useRef } from "react";
import { uploadFile } from "@/utils/s3Config";
import { FileUploadError } from "./file-upload/FileUploadError";
import { UploadButton } from "./file-upload/UploadButton";
import { SelectedFile } from "./file-upload/SelectedFile";
import { FileUploadInfo } from "./file-upload/FileUploadInfo";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (file: File | null, url: string, path?: string) => void;
  isRequired?: boolean;
}

export const FileUpload = ({ onFileUpload, isRequired = false }: FileUploadProps) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (!event.target.files || event.target.files.length === 0) {
      setError('Please select a file to upload');
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    const file = event.target.files[0];
    
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    // Update file size limit to 50MB
    if (file.size > 50 * 1024 * 1024) {
      setError('File size should be less than 50MB');
      toast({
        title: "Error",
        description: "File size should be less than 50MB",
        variant: "destructive",
      });
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
      setError('Failed to upload file. Please try again.');
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
      setCurrentFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (!currentFile && isRequired) {
      setError('Please upload your document');
      toast({
        title: "Error",
        description: "Please upload your document",
        variant: "destructive",
      });
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <FileUploadInfo />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-md relative">
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
    </div>
  );
};