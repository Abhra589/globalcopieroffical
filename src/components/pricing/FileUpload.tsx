import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Mail, MessageSquare } from "lucide-react";
import { sendWhatsAppMessage } from "./WhatsAppService";

interface FileUploadProps {
  onFileChange: (file: File | null, uploadedUrl: string, filePath?: string) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      onFileChange(null, "", "");
      return;
    }

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 50) {
      toast({
        title: "File too large",
        description: "Please contact admin for files larger than 50MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('print_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('print_files')
        .getPublicUrl(filePath);

      console.log('File uploaded successfully:', { filePath, publicUrl });
      
      onFileChange(file, publicUrl, filePath);
      
      toast({
        title: "File uploaded successfully",
        description: "Your document has been uploaded",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
      onFileChange(null, "", "");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdminWhatsApp = () => {
    const message = "Hello, I have a large file order to discuss.";
    sendWhatsAppMessage(message, "918777060249");
  };

  const handleAdminEmail = () => {
    window.location.href = "mailto:globalcopierkly@gmail.com?subject=Large File Order&body=Hello, I have a large file order to discuss.";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file" className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload PDF Document
        </Label>
        <p className="text-sm text-muted-foreground">
          Please upload a file within 50MB. For larger files, contact admin:
        </p>
        <p className="text-sm text-muted-foreground italic">
          We will be capable of receiving larger orders of your choice soon!
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdminWhatsApp}
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Contact via WhatsApp
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdminEmail}
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact via Email
          </Button>
        </div>
      </div>
      <Input
        id="file"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isUploading}
        className="cursor-pointer"
      />
      {isUploading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Uploading document...
        </p>
      )}
    </div>
  );
};