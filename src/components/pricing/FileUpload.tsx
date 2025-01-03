import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileChange: (file: File | null, uploadedUrl: string, pageCount: number) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const countPdfPages = async (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i] === 0x0A && data.slice(i - 6, i).toString() === "/Count") {
            let num = "";
            i++;
            while (data[i] >= 0x30 && data[i] <= 0x39) {
              num += String.fromCharCode(data[i]);
              i++;
            }
            count = parseInt(num);
            break;
          }
        }
        resolve(count || 1);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      onFileChange(null, "", 0);
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

    setIsUploading(true);
    try {
      const pageCount = await countPdfPages(file);
      console.log(`PDF has ${pageCount} pages`);

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

      onFileChange(file, publicUrl, pageCount);
      
      toast({
        title: "File uploaded successfully",
        description: `Document has ${pageCount} pages`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="file" className="flex items-center gap-2">
        <Upload className="w-4 h-4" />
        Upload PDF Document
      </Label>
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
          Uploading and analyzing document...
        </p>
      )}
    </div>
  );
};
