import { toast } from "@/hooks/use-toast";

export interface FileValidationOptions {
  maxSize?: number;
  allowedTypes?: string[];
  required?: boolean;
}

export const validateFile = (
  file: File | null,
  options: FileValidationOptions = {}
): { isValid: boolean; error?: string } => {
  const {
    maxSize = 50 * 1024 * 1024,
    allowedTypes = ['application/pdf'],
    required = false
  } = options;

  if (!file && required) {
    return {
      isValid: false,
      error: 'Please upload your document'
    };
  }

  if (!file) {
    return { isValid: true };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a PDF file'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size should be less than 50MB'
    };
  }

  return { isValid: true };
};

export const handleFileValidationError = (error: string) => {
  toast({
    title: "Error",
    description: error,
    variant: "destructive",
  });
};