import React from 'react';

interface DocumentLinkProps {
  fileUrl: string;
}

export const DocumentLink = ({ fileUrl }: DocumentLinkProps) => {
  if (!fileUrl) return null;
  
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline"
    >
      View Document
    </a>
  );
};