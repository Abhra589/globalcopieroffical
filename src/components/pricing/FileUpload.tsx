import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader2 } from "lucide-react";
import { s3Client } from "@/utils/s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

interface FileUploadProps {
  onFileChange: (file: File | null, uploadedUrl: string) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB limit

  const uploadToS3 = async (file: File) => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const command = new PutObjectCommand({
        Bucket: "your-bucket-name",
        Key: fileName,
        Body: file,
        ContentType: file.type,
      });

      await s3Client.send(command);
      return `https://your-bucket-name.s3.ap-south-1.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setIsUploading(true);
      try {
        const s3Url = await uploadToS3(file);
        onFileChange(file, s3Url);
        toast({
          title: "File uploaded successfully",
          description: `Document uploaded: ${file.name}`,
        });

        // Send WhatsApp notification to admin
        const adminMessage = encodeURIComponent(
          `New file uploaded:\nFile: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(2)}MB\nDownload: ${s3Url}`
        );
        window.open(`https://wa.me/918777060249?text=${adminMessage}`, '_blank');
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "Failed to upload file. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
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
        {isUploading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Uploading...</span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};