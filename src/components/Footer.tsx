import { Facebook, Instagram } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company Policies</h3>
            <ul className="space-y-2">
              <li>
                <Dialog>
                  <DialogTrigger className="hover:text-secondary">Privacy Policy</DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <div className="prose prose-sm dark:prose-invert mt-4">
                      <h2>Effective Date: December 27, 2024</h2>
                      
                      <h3>Introduction</h3>
                      <p>At Globalcopier, protecting your privacy is not just a policy—it's a principle. We are committed to safeguarding your personal information and ensuring transparency in how we handle your data. This Privacy Policy outlines our practices for collecting, using, and protecting your information.</p>
                      
                      {/* ... Additional privacy policy content */}
                      <h3>Information We Collect</h3>
                      <p>We collect information to provide better services and improve your experience. This includes:</p>
                      
                      <h4>Personal Information:</h4>
                      <ul>
                        <li>Name, email address, phone number, and shipping address collected during inquiries, registrations, or purchases.</li>
                        <li>Payment details (credit card information) for billing purposes.</li>
                      </ul>

                      <h4>Non-Personal Information:</h4>
                      <ul>
                        <li>Browser type, IP address, and website usage data collected through cookies and analytics tools to enhance your experience.</li>
                      </ul>

                      <h3>Contact Us</h3>
                      <p>If you have questions or concerns regarding this Privacy Policy, please contact us:</p>
                      <ul>
                        <li>Website: https://www.globalcopierofficial.com</li>
                        <li>Email: globalcopierkly@gmail.com</li>
                        <li>Phone: +91 87770 60249</li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger className="hover:text-secondary">Terms and Conditions</DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Terms and Conditions</DialogTitle>
                    </DialogHeader>
                    <div className="prose prose-sm dark:prose-invert mt-4">
                      <p>Welcome to Globalcopier!</p>
                      <p>These terms and conditions outline the rules and regulations for the use of Globalcopier's Website, located at https://www.globalcopierofficial.com.</p>
                      
                      {/* ... Additional terms and conditions content */}
                      <h3>Cookies</h3>
                      <p>The website uses cookies to help personalize your online experience. By accessing Globalcopier, you agreed to use the required cookies.</p>

                      <h3>License</h3>
                      <p>Unless otherwise stated, Globalcopier and/or its licensors own the intellectual property rights for all material on Globalcopier. All intellectual property rights are reserved.</p>

                      <h3>Payment Policies</h3>
                      <ul>
                        <li>Globalcopier accepts payments only through online methods such as PhonePe or Google Pay.</li>
                        <li>No cash payments are accepted.</li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger className="hover:text-secondary">Shipping Policy</DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Shipping Policy</DialogTitle>
                    </DialogHeader>
                    <div className="prose prose-sm dark:prose-invert mt-4">
                      <h2>Effective Date: December 27, 2024</h2>
                      
                      <h3>Introduction</h3>
                      <p>At Globalcopier, we strive to ensure a smooth and reliable delivery process for all our printing services, including color and black-and-white prints/pages.</p>
                      
                      {/* ... Additional shipping policy content */}
                      <h3>Delivery Methods and Timeframes</h3>
                      <p>We partner with India Post (Courier) for the delivery of all orders. The estimated delivery timeframe is subject to the courier service's operational efficiency and varies based on your location.</p>

                      <h4>Regions Covered:</h4>
                      <p>Delivery is available to all regions within India.</p>

                      <h4>Shipping Timeline:</h4>
                      <p>Standard processing and shipping times may range from 5-10 business days, depending on your location and order specifications.</p>

                      <h3>Contact Us</h3>
                      <p>For any queries or concerns regarding your shipment, please contact us:</p>
                      <ul>
                        <li>WhatsApp: +91 87770 60249</li>
                        <li>Email: globalcopierkly@gmail.com</li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
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