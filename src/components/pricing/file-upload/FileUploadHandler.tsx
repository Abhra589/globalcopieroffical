import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FileUploadHandlerProps {
  file: File;
  onUploadComplete: (url: string, path: string) => void;
  onUploadError: (error: string) => void;
}

export const FileUploadHandler = ({ file, onUploadComplete, onUploadError }: FileUploadHandlerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const uploadFile = async () => {
      if (!file || isUploading) return;

      setIsUploading(true);
      console.log("Starting file upload...");

      try {
        // Sanitize the filename to remove non-ASCII characters
        const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
        const fileExt = sanitizedFileName.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        console.log("Uploading file to Supabase storage...", {
          bucket: 'print_files',
          path: filePath,
          type: file.type
        });

        const { data, error: uploadError } = await supabase.storage
          .from('print_files')
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false
          });

        if (uploadError) {
          console.error("Supabase upload error:", uploadError);
          throw new Error(uploadError.message);
        }

        console.log("File uploaded successfully:", data);

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from('print_files')
          .getPublicUrl(filePath);

        console.log("File public URL:", publicUrl);

        onUploadComplete(publicUrl, filePath);
        
      } catch (err) {
        console.error("Error in file upload:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to upload file";
        onUploadError(errorMessage);
        toast({
          title: "Upload Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    };

    uploadFile();
  }, [file]);

  return null;
};