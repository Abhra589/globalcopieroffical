import { validateFile } from '@/utils/fileUpload';
import { useToast } from "@/hooks/use-toast";

interface FileValidationProps {
  file: File;
  onValidationComplete: (isValid: boolean, error?: string) => void;
}

export const FileValidation = ({ file, onValidationComplete }: FileValidationProps) => {
  const { toast } = useToast();

  const validateUploadedFile = () => {
    const validation = validateFile(file, {
      maxSize: 50 * 1024 * 1024,
      allowedTypes: ['application/pdf'],
      required: true
    });

    if (!validation.isValid) {
      toast({
        title: "Error",
        description: validation.error || "Invalid file",
        variant: "destructive",
      });
      onValidationComplete(false, validation.error);
      return false;
    }

    onValidationComplete(true);
    return true;
  };

  return null;
};