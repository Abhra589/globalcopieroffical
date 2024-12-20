import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { s3Client } from "@/utils/s3Config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

interface FileUploadProps {
  onFileChange: (file: File | null, uploadedUrl: string) => void;
}

export const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadToS3 = async (file: File) => {
    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const command = new PutObjectCommand({
      Bucket: "your-bucket-name",
      Key: fileName,
      Body: file,
      ContentType: file.type,
    });

    try {
      await s3Client.send(command);
      return `https://your-bucket-name.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      onFileChange(null, "");
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
      const s3Url = await uploadToS3(file);
      onFileChange(file, s3Url);
      toast({
        title: "File uploaded successfully",
        description: `Document uploaded: ${file.name}`,
      });
    } catch (error) {
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
      <Label htmlFor="file">Upload PDF Document</Label>
      <Input
        id="file"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
    </div>
  );
};