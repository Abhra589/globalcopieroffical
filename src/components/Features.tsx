import { Printer, Truck, Clock, Building } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Printer className="w-12 h-12 text-secondary" />,
      title: "High-Quality Printing",
      description: "Professional grade printing for all your business needs",
    },
    {
      icon: <Truck className="w-12 h-12 text-secondary" />,
      title: "Pan-India Delivery",
      description: "Reliable delivery across all major cities in India",
    },
    {
      icon: <Clock className="w-12 h-12 text-secondary" />,
      title: "Quick Turnaround",
      description: "Fast processing and delivery of your bulk orders",
    },
    {
      icon: <Building className="w-12 h-12 text-secondary" />,
      title: "Corporate Solutions",
      description: "Specialized services for large organizations",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};