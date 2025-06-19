import React, { useState } from "react";
import { Upload, Info, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetch } from "../../hooks/request";
import _ from "lodash";
import Helper from "../../helpers";

const SellForm = () => {
  const { data } = useFetch("get_vehicle_categories");
  const { data:vehicle_make } = useFetch("get_vehicle_make");
  const { loading, postData } = useFetch("create_vehicle", "submit");
  const currentYear = new Date().getFullYear();
  const currentUser = Helper.getStorageData("session");
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages([...images, ...selectedFiles]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const nextStep = async () => {
    // Validate current step fields before proceeding
    const valid = await trigger([
      "vehicle_category_id", "vehicle_make", "vehicle_model", "vehicle_year", "vehicle_mileage", "vehicle_price", "vehicle_primarily_used", "vehicle_title", "vehicle_descripition", "vehicle_modification"
    ]);
    if (valid) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const onSubmit = (data: any) => {
    const fd = new FormData();
    for (const key in data) {
      fd.append(key, data[key]);
    }
    if (images.length > 0) {
      images.forEach((image) => {
        fd.append("vehicle_images", image); // this creates an array-like entry
      });
    }
    const callback = (receivedData) => {
    };
    postData(fd, callback);

    console.log("Full form submitted:", data);
    console.log("Uploaded Images:", images);
    setStep(3);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {step !== 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <h3 className="text-2xl font-bold mb-6">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Vehicle Type</label>
                  <select
                    name="vehicle_category_id"
                    id="vehicle_category_id"
                    {...register("vehicle_category_id", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Type</option>
                    {!_.isEmpty(data) &&
                      data.map((item: any) => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                      ))}
                  </select>
                  {errors.vehicle_category_id && 
                    <p className="text-red-500 text-sm">Vehicle Type Required</p>
                  }
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Make</label>
                  <select
                    name="vehicle_make"
                    id="vehicle_make"
                    {...register("vehicle_make", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Vehicle Make</option>
                    {!_.isEmpty(vehicle_make) &&
                      vehicle_make.map((item: any) => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                      ))}
                  </select>
                  {errors.vehicle_make && 
                    <p className="text-red-500 text-sm">Vehicle Make Required</p>
                  }
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <input
                    name="vehicle_model"
                    id="vehicle_model"
                    type="text"
                    autoComplete="vehicle_model"
                    {...register("vehicle_model", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_model && <p className="text-red-500 text-sm">Model Required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <input
                    name="vehicle_year"
                    id="vehicle_year"
                    type="text"
                    autoComplete="vehicle_year"
                    {...register("vehicle_year", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_year && <p className="text-red-500 text-sm">Year Required</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mileage</label>
                  <input
                    name="vehicle_mileage"
                    id="vehicle_mileage"
                    type="text"
                    autoComplete="vehicle_mileage"
                    {...register("vehicle_mileage", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_mileage && <p className="text-red-500 text-sm">Mileage Required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    name="vehicle_price"
                    id="vehicle_price"
                    type="text"
                    autoComplete="vehicle_price"
                    {...register("vehicle_price", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_price && <p className="text-red-500 text-sm">Price Required</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">What the vehicle is primarily used for?</label>
                  <select
                    name="vehicle_primarily_used"
                    id="vehicle_primarily_used"
                    {...register("vehicle_primarily_used", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Primarily Use</option>
                    <option key="daily_driver" value="Daily Driver">Daily Driver</option>
                    <option key="straight_line_racing" value="Straight line racing (1/8 mile, 1/4 mile, etc.)">Straight line racing (1/8 mile, 1/4 mile, etc.)</option>
                    <option key="drift_racing" value="Drift Racing">Drift Racing</option>
                    <option key="mud_bogging" value="Mud Bogging">Mud Bogging</option>
                  </select>
                  {errors.vehicle_primarily_used && 
                    <p className="text-red-500 text-sm">Vehicle Primarily Use Required</p>
                  }
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Do you still have any of the stock parts?</label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="yes"
                        defaultChecked
                        {...register("vehicle_stock_parts", { required: true })}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="no"
                        {...register("vehicle_stock_parts", { required: true })}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                  {errors.vehicle_stock_parts && (
                    <p className="text-red-500 text-sm">Please select Yes or No</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Listing Title</label>
                  <input
                    name="vehicle_title"
                    id="vehicle_title"
                    type="text"
                    autoComplete="vehicle_title"
                    {...register("vehicle_title", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />  
                  {errors.vehicle_title && <p className="text-red-500 text-sm">Title Required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="vehicle_descripition"
                    id="vehicle_descripition"
                    {...register("vehicle_descripition", { required: true })}
                    rows={5}
                    placeholder="Please describe your vehicle in detail, including its history and condition."
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Modifications</label>
                  <textarea
                    name="vehicle_modification"
                    id="vehicle_modification"
                    {...register("vehicle_modification", { required: true })}
                    rows={5}
                    placeholder="Please list all modifications (engine, suspension, wheels, body, etc.)"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

              {/* Other Step 1 fields like model, year, mileage, price, title, description, modifications go here */}
              {/* Use the same pattern: register + show errors */}

              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Photos</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-oneoffautos-blue transition-colors"
                  onClick={() => document.getElementById("photos")?.click()}
                >
                  <input
                    type="file"
                    id="photos"
                    name="photos"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-oneoffautos-blue">Click to upload</span> or drag and drop
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
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    name="vehicle_owner_name"
                    id="vehicle_owner_name"
                    {...register("vehicle_owner_name", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_owner_name && <p className="text-red-500 text-sm">Name Required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location (City, State)</label>
                  <input
                    name="vehicle_owner_address"
                    id="vehicle_owner_address"
                    {...register("vehicle_owner_address", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_owner_address && <p className="text-red-500 text-sm">Location Required</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    name="vehicle_owner_email"
                    id="vehicle_owner_email"
                    {...register("vehicle_owner_email", { required: true })}
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_owner_email && <p className="text-red-500 text-sm">Email Required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    name="vehicle_owner_phone"
                    id="vehicle_owner_phone"
                    {...register("vehicle_owner_phone", { required: true })}
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  {errors.vehicle_owner_phone && <p className="text-red-500 text-sm">Phone Number Required</p>}
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
            </>
          )}
        </form>
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
