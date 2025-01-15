import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface FileValidationProps {
  file: File;
  onValidationComplete: (isValid: boolean, error?: string) => void;
}

export const FileValidation = ({ file, onValidationComplete }: FileValidationProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const validateFile = () => {
      console.log("Validating file:", file.name);

      if (!file) {
        onValidationComplete(false, "No file selected");
        return;
      }

      // Check file type
      if (file.type !== 'application/pdf') {
        onValidationComplete(false, "Please upload a PDF file");
        return;
      }

      // Check file size (50MB limit)
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (file.size > maxSize) {
        onValidationComplete(false, "File size should be less than 50MB");
        return;
      }

      console.log("File validation successful");
      onValidationComplete(true);
    };

    validateFile();
  }, [file]);

  return null;
};