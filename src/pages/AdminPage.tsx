import { Navbar } from "@/components/Navbar";
import { AdminContainer } from "@/components/admin/AdminContainer";
import { AdminContent } from "@/components/admin/AdminContent";
import { useAdminAuth } from "@/components/admin/useAdminAuth";

const AdminPage = () => {
  const { handleLogout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AdminContainer>
        <AdminContent onLogout={handleLogout} />
      </AdminContainer>
    </div>
  );
};

export default AdminPage;