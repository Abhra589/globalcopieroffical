interface UploadProgressProps {
  isUploading: boolean;
}

export const UploadProgress = ({ isUploading }: UploadProgressProps) => {
  if (!isUploading) return null;

  return (
    <p className="text-sm text-muted-foreground animate-pulse">
      Uploading document...
    </p>
  );
};