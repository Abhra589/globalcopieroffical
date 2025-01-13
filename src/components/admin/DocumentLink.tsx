import React from 'react';
import { FileText } from 'lucide-react';

interface DocumentLinkProps {
  fileUrl: string;
}

export const DocumentLink = ({ fileUrl }: DocumentLinkProps) => {
  if (!fileUrl) {
    return (
      <p className="text-sm text-gray-500">No document uploaded</p>
    );
  }
  
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 w-fit"
    >
      <FileText className="w-4 h-4" />
      View Document
    </a>
  );
};