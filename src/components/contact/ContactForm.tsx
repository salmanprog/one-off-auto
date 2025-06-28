import React, { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { useFetch } from "../../hooks/request";

const ContactForm = () => {
  const { data, loading: fetchLoading } = useFetch("get_application_setting");
  const { loading, postData } = useFetch("contact_us", "submit");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("message", formData.message);
    const callback = (receivedData) => {
    };
    postData(fd, callback);
    console.log("Contact form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Contact Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-oneoffautos-blue p-3 rounded-full mr-4">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Phone</h4>
              <a href={`tel:${data?.phone_number}`} className="text-oneoffautos-blue hover:underline">
              {data?.phone_number}
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-oneoffautos-blue p-3 rounded-full mr-4">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Email</h4>
              <a href={`mailto:${data?.email}`} className="text-oneoffautos-blue hover:underline">
              {data?.email}
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-oneoffautos-blue p-3 rounded-full mr-4">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold">Office</h4>
              <p>{data?.office_address}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a 
              href={data?.fb_link} 
              rel="noopener noreferrer" 
              className="bg-oneoffautos-blue text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <Facebook size={20} />
            </a>
            <a 
              href={data?.insta_link}
              rel="noopener noreferrer" 
              className="bg-oneoffautos-blue text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <Instagram size={20} />
            </a>
            <a 
              href={data?.youtube_link} 
              rel="noopener noreferrer" 
              className="bg-oneoffautos-blue text-white p-3 rounded-full hover:bg-blue-800 transition-colors"
            >
              <span className="sr-only">Youtube</span>
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
