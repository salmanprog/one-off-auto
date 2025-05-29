
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import ContactForm from "../components/contact/ContactForm";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <MainLayout>
      <div className="bg-oneoffautos-blue text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl">
              We'd love to hear from you. Reach out with any questions about our marketplace.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-12">
        <ContactForm />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Follow us on social media for the latest listings, automotive events, and community highlights.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center hover:text-oneoffautos-blue transition-colors"
            >
              <div className="bg-oneoffautos-blue text-white p-4 rounded-full mb-2">
                <Facebook size={24} />
              </div>
              <span>Facebook</span>
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center hover:text-oneoffautos-blue transition-colors"
            >
              <div className="bg-oneoffautos-blue text-white p-4 rounded-full mb-2">
                <Instagram size={24} />
              </div>
              <span>Instagram</span>
            </a>
            
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center hover:text-oneoffautos-blue transition-colors"
            >
              <div className="bg-oneoffautos-blue text-white p-4 rounded-full mb-2">
                <Youtube size={24} />
              </div>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
