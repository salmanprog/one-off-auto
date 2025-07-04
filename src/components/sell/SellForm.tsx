  import React, { useState } from "react";
  import { Upload, Info, CheckCircle } from "lucide-react";
  import { Link } from "react-router-dom";
  import { useForm } from "react-hook-form";
  import { useFetch } from "../../hooks/request";
  import _ from "lodash";
  import Helper from "../../helpers";
  import HttpRequest from "../../repositories";
  import Autocomplete from "react-google-autocomplete";
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const SellForm = () => {
    const { data } = useFetch("get_vehicle_categories");
    const { data:vehicle_make } = useFetch("get_vehicle_make", "mount", '?limit=5000');
    const { data:vehicle_model } = useFetch("get_vehicle_model_list", "mount", '?limit=5000');
    const { data:vehicle_year } = useFetch("get_vehicle_year_list", "mount", '?limit=5000');
    const { data:vehicle_driver_type } = useFetch("vehicle_driver_type", "mount", '?limit=5000');
    const { data:vehicle_motor_size } = useFetch("vehicle_motor_size", "mount", '?limit=5000');
    const { data:vehicle_transmission_type } = useFetch("vehicle_transmission_type", "mount", '?limit=5000');
    const { data:vehicle_fuel_type } = useFetch("vehicle_fuel_type", "mount", '?limit=5000');
    const { data:vehicle_seller_type } = useFetch("vehicle_seller_type", "mount", '?limit=5000');
    const { data:vehicle_statues } = useFetch("vehicle_statues", "mount", '?limit=5000');
    const { data:vehicle_suspension_type } = useFetch("vehicle_suspension_type", "mount", '?limit=5000');
    const { data:vehicle_hp_output } = useFetch("vehicle_hp_output", "mount", '?limit=5000');
    const { data:vehicle_uses } = useFetch("vehicle_uses", "mount", '?limit=5000');
    const { data:vehicle_documentation_type } = useFetch("vehicle_documentation_type", "mount", '?limit=5000');
    const { loading, postData } = useFetch("create_vehicle", "submit");
    const currentYear = new Date().getFullYear();
    const currentUser = Helper.getStorageData("session");
    const [step, setStep] = useState(1);
    const [images, setImages] = useState<File[]>([]);
    const [vehicleModels, setVehicleModels] = useState([]);
    const { register, handleSubmit, trigger, formState: { errors }, watch, setValue } = useForm();
    const chassisReinforcement = watch("chassis_reinforcement");
    const audioUpgrade = watch("audio_upgrade");
    const cosmeticUpgrade = watch("cosmetic_upgrade");
    const interiorUpgrade = watch("interior_upgrade");
    const exteriorUpgrade = watch("exterior_upgrade");
    const motorUpgrade = watch("motor_upgrade");
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
      const requiredFields = [
        "vehicle_category_id", "vehicle_make", "vehicle_model", "vehicle_year",
        "vehicle_mileage", "vehicle_price", "vehicle_primarily_used", "vehicle_title",
        "vehicle_descripition", "vehicle_modification", "driver_type",
        "motor_size_cylinders", "transmition_types", "fuel_types", "seller_type",
        "vehicle_status", "suspension_type", "hp_output_rang", "vehicle_use", "number_of_doors"
      ];
    
      if (watch("chassis_reinforcement") === "1") {
        requiredFields.push("chassis_reinforcement_text");
      }
      if (watch("audio_upgrade") === "1") {
        requiredFields.push("audio_upgrade_text");
      }
      if (watch("cosmetic_upgrade") === "1") {
        requiredFields.push("cosmetic_upgrade_text");
      }
      if (watch("interior_upgrade") === "1") {
        requiredFields.push("interior_upgrade_text");
      }
      if (watch("exterior_upgrade") === "1") {
        requiredFields.push("exterior_upgrade_text");
      }
      if (watch("motor_upgrade") === "1") {
        requiredFields.push("motor_upgrade_text");
      }
    
      const valid = await trigger(requiredFields);
      if (valid) {
        setStep(2);
        window.scrollTo(0, 0);
      }
    };

    const prevStep = () => {
      setStep(1);
      window.scrollTo(0, 0);
    };

    const handleMakeChange = async (e) => {
      const selectedMakeId = e.target.value;
      const response = await HttpRequest.makeRequest('GET', baseUrl+'user/user-vehicle-model?make_id='+selectedMakeId).then(
        (response) => {
          if (response.code !== 200) {
            setVehicleModels();
          } else {
            setVehicleModels(response.data.data);
          }
        }
      );
    };

    const handlePlaceSelected = (place: any) => {
      // Extract the necessary details
      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      let country = "";
      let postalCode = "";

      // Extracting country and postal_code from the address components
      place.address_components.forEach((component: any) => {
        if (component.types.includes("country")) {
          country = component.long_name;
        }
        if (component.types.includes("postal_code")) {
          postalCode = component.long_name;
        }
      });

      // Store the full address and other details in the form fields
      setValue("vehicle_owner_address", address);
      setValue("formatted_address", address);
      setValue("latitude", lat);
      setValue("longitude", lng);
      setValue("country", country);   // Store country
      setValue("postal_code", postalCode); // Store postal code
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
      fd.append('status', '0');
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
              </div>
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
                      onChange={handleMakeChange} // Trigger the function when make changes
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Vehicle Make</option>
                      {!_.isEmpty(vehicle_make) &&
                        vehicle_make.map((item) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.vehicle_make && <p className="text-red-500 text-sm">Vehicle Make Required</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <select
                    name="vehicle_model"
                    id="vehicle_model"
                    {...register("vehicle_model", { required: true })}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Vehicle Model</option>
                    {!_.isEmpty(vehicleModels) &&
                      vehicleModels.map((item) => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                      ))}
                  </select>
                  {errors.vehicle_model && <p className="text-red-500 text-sm">Model Required</p>}
                </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <select
                      name="vehicle_year"
                      id="vehicle_year"
                      {...register("vehicle_year", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Vehicle Year</option>
                      {!_.isEmpty(vehicle_year) &&
                        vehicle_year.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.vehicle_year && 
                      <p className="text-red-500 text-sm">Vehicle Year Required</p>
                    }
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
                  <label className="block text-sm font-medium mb-1">Exterior Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      name="exterior_color"
                      id="exterior_color"
                      type="color"
                      {...register("exterior_color", { required: true })}
                      className="w-16 h-10 border border-gray-300 rounded-md p-1"
                    />
                    <span className="text-sm">{watch("exterior_color") || "#000000"}</span>
                  </div>
                  {errors.exterior_color && (
                    <p className="text-red-500 text-sm">Exterior Color Required</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Interior Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      name="interior_color"
                      id="interior_color"
                      type="color"
                      {...register("interior_color", { required: true })}
                      className="w-16 h-10 border border-gray-300 rounded-md p-1"
                    />
                    <span className="text-sm">{watch("interior_color") || "#000000"}</span>
                  </div>
                  {errors.interior_color && (
                    <p className="text-red-500 text-sm">Interior Color Required</p>
                  )}
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium mb-1">Suspension Size (inches)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={-8}
                    max={24}
                    step={0.5}
                    {...register("suspension_size", { required: true })}
                    className="w-full"
                    id="suspension_size"
                  />
                  <span className="min-w-[50px] text-center">
                    {watch("suspension_size") || "0"}
                  </span>
                </div>
                {errors.suspension_size && (
                  <p className="text-red-500 text-sm">Suspension size is required</p>
                )}
              </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Suspension Type</label>
                    <select
                      name="suspension_type"
                      id="suspension_type"
                      {...register("suspension_type", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Suspension Type</option>
                      {!_.isEmpty(vehicle_suspension_type) &&
                        vehicle_suspension_type.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.suspension_type && 
                      <p className="text-red-500 text-sm">Vehicle Suspension Type Required</p>
                    }
                  </div>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Chassis Reinforcement</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="1"
                          {...register("chassis_reinforcement", { required: true })}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="0"
                          defaultChecked
                          {...register("chassis_reinforcement", { required: true })}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {chassisReinforcement === "1" && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Reinforcement Details</label>
                        <input
                          name="chassis_reinforcement_text"
                          id="chassis_reinforcement_text"
                          type="text"
                          placeholder="Describe the reinforcement done"
                          {...register("chassis_reinforcement_text", { required: true })}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.chassis_reinforcement_text && (
                          <p className="text-red-500 text-sm">Details Required</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Audio Upgrades</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="1"
                          {...register("audio_upgrade", { required: true })}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="0"
                          defaultChecked
                          {...register("audio_upgrade", { required: true })}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {audioUpgrade === "1" && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium mb-1">Audio Upgrade Details</label>
                        <input
                          name="audio_upgrade_text"
                          id="audio_upgrade_text"
                          type="text"
                          placeholder="Describe the audio upgrades"
                          {...register("audio_upgrade_text", { required: true })}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.audio_upgrade_text && (
                          <p className="text-red-500 text-sm">Audio upgrade details required</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>     
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Wheel Width (inches):</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="1"
                      {...register("wheel_width", { required: true })}
                      className="w-full"
                      id="wheel_width"
                    />
                    <span className="min-w-[30px] text-center">
                      {watch("wheel_width") || "5"}
                    </span>
                  </div>
                  {errors.wheel_width && <p className="text-red-500 text-sm">Wheel width is required</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Wheel Diameter (inches):</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="12"
                      max="30"
                      step="1"
                      {...register("wheel_diameter", { required: true })}
                      className="w-full"
                      id="wheel_diameter"
                    />
                    <span className="min-w-[30px] text-center">
                      {watch("wheel_diameter") || "12"}
                    </span>
                  </div>
                  {errors.wheel_diameter && (
                    <p className="text-red-500 text-sm">Wheel diameter is required</p>
                  )}
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Exterior Cosmetic Upgrades</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="1"
                          {...register("cosmetic_upgrade", { required: true })}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="0"
                          defaultChecked
                          {...register("cosmetic_upgrade", { required: true })}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {cosmeticUpgrade === "1" && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium mb-1">Cosmetic Upgrade Details</label>
                        <input
                          name="cosmetic_upgrade_text"
                          id="cosmetic_upgrade_text"
                          type="text"
                          placeholder="Describe cosmetic upgrades (paint, body kits, etc.)"
                          {...register("cosmetic_upgrade_text", { required: true })}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.cosmetic_upgrade_text && (
                          <p className="text-red-500 text-sm">Details required for cosmetic upgrades</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Interior Upgrades</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="1"
                          {...register("interior_upgrade", { required: true })}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="0"
                          defaultChecked
                          {...register("interior_upgrade", { required: true })}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {interiorUpgrade === "1" && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium mb-1">Interior Upgrade Details</label>
                        <input
                          name="interior_upgrade_text"
                          id="interior_upgrade_text"
                          type="text"
                          placeholder="Describe interior upgrades (seats, dashboard, etc.)"
                          {...register("interior_upgrade_text", { required: true })}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.interior_upgrade_text && (
                          <p className="text-red-500 text-sm">Interior upgrade details required</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Exterior (body) Upgrades</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="1"
                          {...register("exterior_upgrade", { required: true })}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="0"
                          defaultChecked
                          {...register("exterior_upgrade", { required: true })}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {exteriorUpgrade === "1" && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium mb-1">Exterior Upgrade Details</label>
                        <input
                          name="exterior_upgrade_text"
                          id="exterior_upgrade_text"
                          type="text"
                          placeholder="Describe body kit, wrap, spoiler, etc."
                          {...register("exterior_upgrade_text", { required: true })}
                          className="w-full p-3 border border-gray-300 rounded-md"
                        />
                        {errors.exterior_upgrade_text && (
                          <p className="text-red-500 text-sm">Exterior upgrade details required</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Motor Upgrades</label>
                    <div className="flex items-center gap-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="1"
                          {...register("motor_upgrade", { required: true })}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="0"
                          defaultChecked
                          {...register("motor_upgrade", { required: true })}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {motorUpgrade === "1" && (
                        <div className="mt-2">
                          <label className="block text-sm font-medium mb-1">Motor Upgrade Details</label>
                          <input
                            name="motor_upgrade_text"
                            id="motor_upgrade_text"
                            type="text"
                            placeholder="Describe engine swaps, turbo kits, etc."
                            {...register("motor_upgrade_text", { required: true })}
                            className="w-full p-3 border border-gray-300 rounded-md"
                          />
                          {errors.motor_upgrade_text && (
                            <p className="text-red-500 text-sm">Motor upgrade details required</p>
                          )}
                        </div>
                      )}
                  </div>
                </div>   
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Drive Type</label>
                    <select
                      name="driver_type"
                      id="driver_type"
                      {...register("driver_type", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Drive Type</option>
                      {!_.isEmpty(vehicle_driver_type) &&
                        vehicle_driver_type.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.driver_type && 
                      <p className="text-red-500 text-sm">Drive Type Required</p>
                    }
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Motor Size (Cylinders)</label>
                    <select
                      name="motor_size_cylinders"
                      id="motor_size_cylinders"
                      {...register("motor_size_cylinders", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Motor Size</option>
                      {!_.isEmpty(vehicle_motor_size) &&
                        vehicle_motor_size.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.motor_size_cylinders && 
                      <p className="text-red-500 text-sm">Vehicle Motor Size Required</p>
                    }
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Transmission Type</label>
                    <select
                      name="transmition_types"
                      id="transmition_types"
                      {...register("transmition_types", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Transmission Type</option>
                      {!_.isEmpty(vehicle_transmission_type) &&
                        vehicle_transmission_type.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.transmition_types && 
                      <p className="text-red-500 text-sm">Vehicle Transmission Type Required</p>
                    }
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fuel Type</label>
                    <select
                      name="fuel_types"
                      id="fuel_types"
                      {...register("fuel_types", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Fuel Type</option>
                      {!_.isEmpty(vehicle_fuel_type) &&
                        vehicle_fuel_type.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.fuel_types && 
                      <p className="text-red-500 text-sm">Vehicle Fuel Type Required</p>
                    }
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Seller Type</label>
                    <select
                      name="seller_type"
                      id="seller_type"
                      {...register("seller_type", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Type</option>
                      {!_.isEmpty(vehicle_seller_type) &&
                        vehicle_seller_type.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.seller_type && 
                      <p className="text-red-500 text-sm">Vehicle Seller Type Required</p>
                    }
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Status</label>
                    <select
                      name="vehicle_status"
                      id="vehicle_status"
                      {...register("vehicle_status", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Vehicle Status</option>
                      {!_.isEmpty(vehicle_statues) &&
                        vehicle_statues.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.vehicle_status && 
                      <p className="text-red-500 text-sm">Vehicle Status Required</p>
                    }
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
                    <label className="block text-sm font-medium mb-1">HP Output Range</label>
                    <select
                      name="hp_output_rang"
                      id="hp_output_rang"
                      {...register("hp_output_rang", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select HP Output Range</option>
                      {!_.isEmpty(vehicle_hp_output) &&
                        vehicle_hp_output.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.hp_output_rang && 
                      <p className="text-red-500 text-sm">Vehicle HP Output Range Required</p>
                    }
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Use</label>
                    <select
                      name="vehicle_use"
                      id="vehicle_use"
                      {...register("vehicle_use", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Vehicle Use</option>
                      {!_.isEmpty(vehicle_uses) &&
                        vehicle_uses.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.vehicle_use && 
                      <p className="text-red-500 text-sm">Vehicle Use Required</p>
                    }
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Doors</label>
                    <select
                      name="number_of_doors"
                      id="number_of_doors"
                      {...register("number_of_doors", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Number of Doors</option>
                      <option key="2" value="2">2</option>
                      <option key="3" value="3">3</option>
                      <option key="4" value="4">4</option>
                      <option key="5" value="5">5</option>
                      <option key="6" value="6">6+</option>
                    </select>
                    {errors.number_of_doors && 
                      <p className="text-red-500 text-sm">Vehicle Number of Doors Required</p>
                    }
                  </div>
                </div>    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium mb-1">Documentation</label>
                    <select
                      name="documentation_type"
                      id="documentation_type"
                      {...register("documentation_type", { required: true })}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Documentation</option>
                      {!_.isEmpty(vehicle_documentation_type) &&
                        vehicle_documentation_type.map((item: any) => (
                          <option key={item.id} value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {errors.documentation_type && 
                      <p className="text-red-500 text-sm">Vehicle Documentation Required</p>
                    }
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
                <label className="block text-sm font-medium mb-1">Owner Address</label>
                <Autocomplete
                    className="w-full p-3 border border-gray-300 rounded-md"
                    apiKey="AIzaSyDtGUZeWBavRsRTTzKDgeuje_4iBu1vrWE"
                    onPlaceSelected={(place) => {
                      handlePlaceSelected(place)
                    }}
                    options={{ types: ['geocode'] }}
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
