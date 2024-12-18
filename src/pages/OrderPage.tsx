import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const OrderPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    pages: 0,
    copies: 1,
    file: null as File | null,
  });

  const calculateCourierCharge = (pages: number) => {
    return pages <= 400 ? 80 : 150;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      toast({
        title: "Error",
        description: "Please upload a document",
        variant: "destructive",
      });
      return;
    }
    // Store order details in localStorage for demo
    const orderDetails = {
      ...formData,
      courierCharge: calculateCourierCharge(formData.pages),
      orderDate: new Date().toISOString(),
      status: "pending",
      orderId: Math.random().toString(36).substr(2, 9),
    };
    localStorage.setItem("currentOrder", JSON.stringify(orderDetails));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="organization">Organization Name</Label>
              <Input
                id="organization"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="pages">Number of Pages</Label>
              <Input
                id="pages"
                type="number"
                required
                min="1"
                value={formData.pages || ""}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="copies">Number of Copies</Label>
              <Input
                id="copies"
                type="number"
                required
                min="1"
                value={formData.copies}
                onChange={(e) => setFormData({ ...formData, copies: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="file">Upload Document</Label>
              <Input
                id="file"
                type="file"
                required
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
              />
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;