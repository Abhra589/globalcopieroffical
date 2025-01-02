import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onLogout: () => void;
}

export const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
      <Button
        onClick={onLogout}
        variant="outline"
        className="hover:bg-red-50 hover:text-red-600"
      >
        Logout
      </Button>
    </div>
  );
};