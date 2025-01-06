import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormContainer = ({ children, onSubmit }: FormContainerProps) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg animate-fade-in"
    >
      {children}
    </form>
  );
};