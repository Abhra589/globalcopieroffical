import { ReactNode } from "react";

interface AdminContainerProps {
  children: ReactNode;
}

export const AdminContainer = ({ children }: AdminContainerProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow">
          {children}
        </div>
      </div>
    </div>
  );
};