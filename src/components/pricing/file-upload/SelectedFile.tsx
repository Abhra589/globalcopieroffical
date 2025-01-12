interface SelectedFileProps {
  fileName: string | null;
}

export const SelectedFile = ({ fileName }: SelectedFileProps) => {
  if (!fileName) return null;
  
  return (
    <p className="text-sm text-green-600">
      Selected file: {fileName}
    </p>
  );
};