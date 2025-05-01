import React, { useState } from "react";
import { Upload, Info, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SellForm = () => {
  const [formData, setFormData] = useState({
    vehicleType: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    title: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    modifications: ""
  });

  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages([...images, ...selectedFiles]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sell form submitted:", formData);
    console.log("Images:", images);
    // Here you would typically send the data to an API
    setStep(3);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {step === 1 && (
        <div>
          <h3 className="text-2xl font-bold mb-6">Vehicle Information</h3>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium mb-1">
                  Vehicle Type
                </label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                  <option value="suv">SUV</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="make" className="block text-sm font-medium mb-1">
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="model" className="block text-sm font-medium mb-1">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium mb-1">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                  min="1900"
                  max="2099"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium mb-1">
                  Mileage
                </label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                  min="0"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Asking Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                  min="0"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Listing Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., 2015 Subaru WRX - Built Engine"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Please describe your vehicle in detail, including its history and condition."
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label htmlFor="modifications" className="block text-sm font-medium mb-1">
                Modifications
              </label>
              <textarea
                id="modifications"
                name="modifications"
                value={formData.modifications}
                onChange={handleChange}
                rows={5}
                placeholder="Please list all modifications (engine, suspension, wheels, body, etc.)"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Vehicle Photos
              </label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-oneoffautos-blue transition-colors"
                onClick={() => document.getElementById('photos')?.click()}
              >
                <input
                  type="file"
                  id="photos"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-oneoffautos-blue">
                    Click to upload
                  </span> or drag and drop
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </div>
            
            {images.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Uploaded Images ({images.length})</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              type="button"
              className="btn-primary w-full"
              onClick={nextStep}
            >
              Continue to Contact Information
            </button>
          </form>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Location (City, State)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  required
                />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex">
              <Info className="h-5 w-5 text-oneoffautos-blue shrink-0 mr-2" />
              <p className="text-sm">
                Your contact information will be used to communicate with potential buyers. We'll never share your details with third parties.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="button"
                className="btn-secondary order-2 sm:order-1"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-primary order-1 sm:order-2 flex-1"
              >
                Submit Listing
              </button>
            </div>
          </form>
        </div>
      )}
      
      {step === 3 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Listing Submitted!</h3>
          <p className="text-lg mb-6">
            Thank you for submitting your vehicle to One Off Autos. Our team will review your submission and contact you shortly.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Return to Homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default SellForm;
