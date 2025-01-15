interface SelectedFileProps {
  fileName: string | null;
  isUploading: boolean;
}

export const SelectedFile = ({ fileName, isUploading }: SelectedFileProps) => {
  if (!fileName) return null;
  
  return (
    <div className="space-y-2">
      <p className="text-sm text-green-600 flex items-center gap-2">
        <span className="font-medium">Selected file:</span> {fileName}
      </p>
      {isUploading && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Uploading document... Please wait
        </p>
      )}
    </div>
  );
};