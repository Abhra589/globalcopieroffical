import { Navbar } from "@/components/Navbar";
import { UserProfileForm } from "@/components/auth/UserProfileForm";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
          <UserProfileForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;