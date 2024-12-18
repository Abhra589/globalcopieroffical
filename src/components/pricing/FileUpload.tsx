import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const { toast } = useToast();
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB limit

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 100MB. Please compress your PDF or contact us for larger files.",
        variant: "destructive",
      });
      return;
    }

    if (file.type === "application/pdf") {
      onFileChange(file);
      toast({
        title: "File uploaded successfully",
        description: `Document uploaded: ${file.name}`,
      });
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Label htmlFor="file" className="flex items-center gap-2">
        <Upload className="w-5 h-5" />
        Upload PDF Document (Max 100MB)
      </Label>
      <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors">
        <Input
          id="file"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
        />
        <p className="text-sm text-gray-500 mt-2">
          Drag and drop your PDF here or click to browse
        </p>
      </div>
    </div>
  );
};