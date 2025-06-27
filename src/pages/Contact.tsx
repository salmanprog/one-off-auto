
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
        
      </div>
    </MainLayout>
  );
};

export default Contact;
