interface FileUploadErrorProps {
  error: string | null;
  showError?: boolean;
}

export const FileUploadError = ({ error, showError = false }: FileUploadErrorProps) => {
  if (!error || !showError) return null;
  
  return (
    <p className="text-sm text-red-500 mt-2">
      {error}
    </p>
  );
};