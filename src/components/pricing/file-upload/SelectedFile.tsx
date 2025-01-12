interface SelectedFileProps {
  fileName: string | null;
  isUploading: boolean;
}

export const SelectedFile = ({ fileName, isUploading }: SelectedFileProps) => {
  if (!fileName) return null;
  
  return (
    <div className="space-y-2">
      <p className="text-sm text-green-600">
        Selected file: {fileName}
      </p>
      {isUploading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Uploading document...
        </p>
      )}
    </div>
  );
};