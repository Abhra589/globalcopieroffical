interface FileUploadErrorProps {
  error: string | null;
}

export const FileUploadError = ({ error }: FileUploadErrorProps) => {
  if (!error) return null;
  
  return (
    <p className="absolute -right-32 top-1/2 -translate-y-1/2 text-sm text-red-500">
      {error}
    </p>
  );
};