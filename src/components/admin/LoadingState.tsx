import { Navbar } from "@/components/Navbar";

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-center text-gray-500">Loading orders...</p>
        </div>
      </div>
    </div>
  );
};