import { Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company Policies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-secondary">Refund Policy</a></li>
              <li><a href="#" className="hover:text-secondary">Shipping Policy</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61571243827233" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/globa_lcopier/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/22349649-e79d-4981-988f-12f058600d58.png" 
              alt="GlobalCopier Logo" 
              className="h-12 w-auto"
            />
            <p>Owned and managed by Global Copier ©2025</p>
            <p className="text-sm">Powered by Dizitup</p>
          </div>
        </div>
      </div>
    </footer>
  );
};