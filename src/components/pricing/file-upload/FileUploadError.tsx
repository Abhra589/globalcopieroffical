interface FileUploadErrorProps {
  error: string | null;
  showError?: boolean;
}

export const FileUploadError = ({ error, showError = false }: FileUploadErrorProps) => {
  if (!error || !showError) return null;
  
  return (
    <p className="absolute -right-32 top-1/2 -translate-y-1/2 text-sm text-red-500">
      {error}
    </p>
  );
};