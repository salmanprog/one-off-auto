import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Listing } from "@/lib/api";
import { XIcon } from "lucide-react";
import { useFetch } from "../../hooks/request";
import { useNavigate } from 'react-router-dom';

interface EditListingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  listing: Listing | null;
}

const EditListingDialog: React.FC<EditListingDialogProps> = ({ isOpen, onClose, onSave, listing }) => {
  const [formData, setFormData] = useState({
    vehicle_title: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    vehicle_price: "",
    vehicle_mileage: "",
    vehicle_descripition: "",
    status: "",
    vehicle_category_id: "",
    exterior_color: "",
    interior_color: "",
    suspension_size: "",
    suspension_type: "",
    wheel_width: "",
    wheel_diameter: "",
    chassis_reinforcement: "",
    chassis_reinforcement_text: "",
    audio_upgrade: "",
    audio_upgrade_text: "",
    cosmetic_upgrade: "",
    cosmetic_upgrade_text: "",
    interior_upgrade: "",
    interior_upgrade_text: "",
    exterior_upgrade: "",
    exterior_upgrade_text: "",
    motor_upgrade: "",
    motor_upgrade_text: "",
    driver_type: "",
    motor_size_cylinders: "",
    transmition_types: "",
    fuel_types: "",
    seller_type: "",
    vehicle_status: "",
    vehicle_primarily_used: "",
    hp_output_rang: "",
    vehicle_use: "",
    number_of_doors: "",
    vehicle_stock_parts: "",
    documentation_type: "",
    vehicle_modification: "",
    vehicle_owner_name: "",
    vehicle_owner_address: "",
    vehicle_owner_email: "",
    vehicle_owner_phone: "",
    latitude: "",
    longitude: "",
    country: "",
    postal_code: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [media, setMedia] = useState<any[]>([]);
  const { postData } = useFetch("update_vehicle", "submit");
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  // Fetch dropdown data as in SellForm
  const { data: vehicleCategories } = useFetch("get_vehicle_categories");
  const { data: vehicleMakes } = useFetch("get_vehicle_make", "mount", '?limit=5000');
  const { data: vehicleModels } = useFetch("get_vehicle_model_list", "mount", '?limit=5000');
  const { data: vehicleYears } = useFetch("get_vehicle_year_list", "mount", '?limit=5000');
  const { data: vehicleDriverTypes } = useFetch("vehicle_driver_type", "mount", '?limit=5000');
  const { data: vehicleMotorSizes } = useFetch("vehicle_motor_size", "mount", '?limit=5000');
  const { data: vehicleTransmissionTypes } = useFetch("vehicle_transmission_type", "mount", '?limit=5000');
  const { data: vehicleFuelTypes } = useFetch("vehicle_fuel_type", "mount", '?limit=5000');
  const { data: vehicleSellerTypes } = useFetch("vehicle_seller_type", "mount", '?limit=5000');
  const { data: vehicleStatuses } = useFetch("vehicle_statues", "mount", '?limit=5000');
  const { data: vehicleSuspensionTypes } = useFetch("vehicle_suspension_type", "mount", '?limit=5000');
  const { data: vehicleHpOutputs } = useFetch("vehicle_hp_output", "mount", '?limit=5000');
  const { data: vehicleUses } = useFetch("vehicle_uses", "mount", '?limit=5000');
  const { data: vehicleDocumentationTypes } = useFetch("vehicle_documentation_type", "mount", '?limit=5000');

  useEffect(() => {
    if (listing) {
      setFormData({
        vehicle_title: listing.vehicle_title ?? "",
        vehicle_make: listing.vehicle_make ?? "",
        vehicle_model: listing.vehicle_model ?? "",
        vehicle_year: listing.vehicle_year?.toString() ?? "",
        vehicle_price: listing.vehicle_price?.toString() ?? "",
        vehicle_mileage: listing.vehicle_mileage ?? "",
        vehicle_descripition: listing.vehicle_descripition ?? "",
        status: listing.status ?? "",
        vehicle_category_id: listing.vehicle_category_id ?? "",
        exterior_color: listing.exterior_color ?? "",
        interior_color: listing.interior_color ?? "",
        suspension_size: listing.suspension_size ?? "",
        suspension_type: listing.suspension_type ?? "",
        wheel_width: listing.wheel_width ?? "",
        wheel_diameter: listing.wheel_diameter ?? "",
        chassis_reinforcement: listing.chassis_reinforcement ?? "",
        chassis_reinforcement_text: listing.chassis_reinforcement_text ?? "",
        audio_upgrade: listing.audio_upgrade ?? "",
        audio_upgrade_text: listing.audio_upgrade_text ?? "",
        cosmetic_upgrade: listing.cosmetic_upgrade ?? "",
        cosmetic_upgrade_text: listing.cosmetic_upgrade_text ?? "",
        interior_upgrade: listing.interior_upgrade ?? "",
        interior_upgrade_text: listing.interior_upgrade_text ?? "",
        exterior_upgrade: listing.exterior_upgrade ?? "",
        exterior_upgrade_text: listing.exterior_upgrade_text ?? "",
        motor_upgrade: listing.motor_upgrade ?? "",
        motor_upgrade_text: listing.motor_upgrade_text ?? "",
        driver_type: listing.driver_type ?? "",
        motor_size_cylinders: listing.motor_size_cylinders ?? "",
        transmition_types: listing.transmition_types ?? "",
        fuel_types: listing.fuel_types ?? "",
        seller_type: listing.seller_type ?? "",
        vehicle_status: listing.vehicle_status ?? "",
        vehicle_primarily_used: listing.vehicle_primarily_used ?? "",
        hp_output_rang: listing.hp_output_rang ?? "",
        vehicle_use: listing.vehicle_use ?? "",
        number_of_doors: listing.number_of_doors ?? "",
        vehicle_stock_parts: listing.vehicle_stock_parts ?? "",
        documentation_type: listing.documentation_type ?? "",
        vehicle_modification: listing.vehicle_modification ?? "",
        vehicle_owner_name: listing.vehicle_owner_name ?? "",
        vehicle_owner_address: listing.vehicle_owner_address ?? "",
        vehicle_owner_email: listing.vehicle_owner_email ?? "",
        vehicle_owner_phone: listing.vehicle_owner_phone ?? "",
        latitude: listing.latitude ?? "",
        longitude: listing.longitude ?? "",
        country: listing.country ?? "",
        postal_code: listing.postal_code ?? "",
      });
      setMedia(listing.media || []);
      setDeletedImageIds([]);
    }
  }, [listing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For numeric fields, validate the input to allow only numbers
    if (["vehicle_year", "vehicle_price", "vehicle_mileage"].includes(name) && !/^\d*\.?\d*$/.test(value)) {
      return; // Prevent invalid input
    }

    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.vehicle_title.trim()) newErrors.vehicle_title = "Title is required.";
    if (!formData.vehicle_make) newErrors.vehicle_make = "Make is required.";
    if (!formData.vehicle_model) newErrors.vehicle_model = "Model is required.";
    if (!formData.vehicle_year) newErrors.vehicle_year = "Year is required.";
    if (!formData.vehicle_price) newErrors.vehicle_price = "Price is required.";
    if (!formData.vehicle_mileage) newErrors.vehicle_mileage = "Mileage is required.";
    if (!formData.vehicle_descripition.trim()) newErrors.vehicle_descripition = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!listing || !validate()) return;

    try {
      const fd = new FormData();
      // Append updated formData to fd
      fd.append("vehicle_title", formData.vehicle_title);
      fd.append("vehicle_make", formData.vehicle_make);
      fd.append("vehicle_model", formData.vehicle_model);
      fd.append("vehicle_year", formData.vehicle_year);
      fd.append("vehicle_price", formData.vehicle_price);
      fd.append("vehicle_mileage", formData.vehicle_mileage);
      fd.append("vehicle_descripition", formData.vehicle_descripition);
      fd.append("status", formData.status);
      fd.append("vehicle_category_id",formData.vehicle_category_id);
      fd.append("exterior_color",formData.exterior_color);
      fd.append("interior_color",formData.interior_color);
      fd.append("suspension_size",formData.suspension_size);
      fd.append("suspension_type",formData.suspension_type);
      fd.append("wheel_width",formData.wheel_width);
      fd.append("wheel_diameter",formData.wheel_diameter);
      fd.append("chassis_reinforcement",formData.chassis_reinforcement);
      fd.append("chassis_reinforcement_text",formData.chassis_reinforcement_text);
      fd.append("audio_upgrade",formData.audio_upgrade);
      fd.append("audio_upgrade_text",formData.audio_upgrade_text);
      fd.append("cosmetic_upgrade",formData.cosmetic_upgrade);
      fd.append("cosmetic_upgrade_text",formData.cosmetic_upgrade_text);
      fd.append("interior_upgrade",formData.interior_upgrade);
      fd.append("interior_upgrade_text",formData.interior_upgrade_text);
      fd.append("exterior_upgrade",formData.exterior_upgrade);
      fd.append("exterior_upgrade_text",formData.exterior_upgrade_text);
      fd.append("motor_upgrade",formData.motor_upgrade);
      fd.append("motor_upgrade_text",formData.motor_upgrade_text);
      fd.append("driver_type",formData.driver_type);
      fd.append("motor_size_cylinders",formData.motor_size_cylinders);
      fd.append("transmition_types",formData.transmition_types);
      fd.append("fuel_types",formData.fuel_types);
      fd.append("seller_type",formData.seller_type);
      fd.append("vehicle_status",formData.vehicle_status);
      fd.append("vehicle_primarily_used",formData.vehicle_primarily_used);
      fd.append("hp_output_rang",formData.hp_output_rang);
      fd.append("vehicle_use",formData.vehicle_use);
      fd.append("number_of_doors",formData.number_of_doors);
      fd.append("vehicle_stock_parts",formData.vehicle_stock_parts);
      fd.append("documentation_type",formData.documentation_type);
      fd.append("vehicle_modification",formData.vehicle_modification);
      fd.append("vehicle_owner_name",formData.vehicle_owner_name);
      fd.append("vehicle_owner_address",formData.vehicle_owner_address);
      fd.append("vehicle_owner_email",formData.vehicle_owner_email);
      fd.append("vehicle_owner_phone",formData.vehicle_owner_phone);
      fd.append("latitude",formData.latitude);
      fd.append("longitude",formData.longitude);
      fd.append("country",formData.country);
      fd.append("postal_code",formData.postal_code);

      if (deletedImageIds.length > 0) {
        fd.append("deleted_image_ids", JSON.stringify(deletedImageIds));
      }
      if (newImages.length > 0) {
        newImages.forEach((file) => {
          fd.append("vehicle_images", file);
        });
      }

      const callback = (receivedData: any) => {
        window.location.reload();
      };

      postData(fd, callback, listing.slug);
      onClose();
    } catch (error) {
      console.error("Failed to update listing", error);
    }
  };

  const handleDeleteImage = (mediaId: number) => {
    setDeletedImageIds((prev) => [...prev, mediaId]);
    setMedia((prev) => prev.filter((item) => item.id !== mediaId));
  };

  if (!listing) return null;
  console.log('listing...........................',listing)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vehicle Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Type</label>
              <select
                name="vehicle_category_id"
                value={formData.vehicle_category_id}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Type</option>
                {vehicleCategories && vehicleCategories.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.vehicle_category_id && <p className="text-red-500 text-sm">{errors.vehicle_category_id}</p>}
            </div>
            {/* Make */}
            <div>
              <label className="block text-sm font-medium mb-1">Make</label>
              <select
                name="vehicle_make"
                value={formData.vehicle_make}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Vehicle Make</option>
                {vehicleMakes && vehicleMakes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.vehicle_make && <p className="text-red-500 text-sm">{errors.vehicle_make}</p>}
            </div>
            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-1">Model</label>
              <select
                name="vehicle_model"
                value={formData.vehicle_model}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Vehicle Model</option>
                {vehicleModels && vehicleModels.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.vehicle_model && <p className="text-red-500 text-sm">{errors.vehicle_model}</p>}
            </div>
            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <select
                name="vehicle_year"
                value={formData.vehicle_year}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Vehicle Year</option>
                {vehicleYears && vehicleYears.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.vehicle_year && <p className="text-red-500 text-sm">{errors.vehicle_year}</p>}
            </div>
            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium mb-1">Mileage</label>
              <Input
                name="vehicle_mileage"
                value={formData.vehicle_mileage}
                onChange={handleChange}
                type="text"
                placeholder="Mileage"
              />
              {errors.vehicle_mileage && <p className="text-red-500 text-sm">{errors.vehicle_mileage}</p>}
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input
                name="vehicle_price"
                value={formData.vehicle_price}
                onChange={handleChange}
                type="text"
                placeholder="Price"
              />
              {errors.vehicle_price && <p className="text-red-500 text-sm">{errors.vehicle_price}</p>}
            </div>
            {/* Exterior Color */}
            <div>
              <label className="block text-sm font-medium mb-1">Exterior Color</label>
              <input
                name="exterior_color"
                type="color"
                value={formData.exterior_color || "#000000"}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 rounded-md p-1"
              />
              <span className="text-sm ml-2">{formData.exterior_color || "#000000"}</span>
              {errors.exterior_color && <p className="text-red-500 text-sm">{errors.exterior_color}</p>}
            </div>
            {/* Interior Color */}
            <div>
              <label className="block text-sm font-medium mb-1">Interior Color</label>
              <input
                name="interior_color"
                type="color"
                value={formData.interior_color || "#000000"}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 rounded-md p-1"
              />
              <span className="text-sm ml-2">{formData.interior_color || "#000000"}</span>
              {errors.interior_color && <p className="text-red-500 text-sm">{errors.interior_color}</p>}
            </div>
            {/* Suspension Size */}
            <div>
              <label className="block text-sm font-medium mb-1">Suspension Size (inches)</label>
              <input
                name="suspension_size"
                type="range"
                min={-8}
                max={24}
                step={0.5}
                value={formData.suspension_size || 0}
                onChange={handleChange}
                className="w-full"
              />
              <span className="min-w-[50px] text-center">{formData.suspension_size || "0"}</span>
              {errors.suspension_size && <p className="text-red-500 text-sm">{errors.suspension_size}</p>}
            </div>
            {/* Suspension Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Suspension Type</label>
              <select
                name="suspension_type"
                value={formData.suspension_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Suspension Type</option>
                {vehicleSuspensionTypes && vehicleSuspensionTypes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.suspension_type && <p className="text-red-500 text-sm">{errors.suspension_type}</p>}
            </div>
            {/* Wheel Width */}
            <div>
              <label className="block text-sm font-medium mb-1">Wheel Width (inches)</label>
              <input
                name="wheel_width"
                type="range"
                min={5}
                max={20}
                step={1}
                value={formData.wheel_width || 5}
                onChange={handleChange}
                className="w-full"
              />
              <span className="min-w-[30px] text-center">{formData.wheel_width || "5"}</span>
              {errors.wheel_width && <p className="text-red-500 text-sm">{errors.wheel_width}</p>}
            </div>
            {/* Wheel Diameter */}
            <div>
              <label className="block text-sm font-medium mb-1">Wheel Diameter (inches)</label>
              <input
                name="wheel_diameter"
                type="range"
                min={12}
                max={30}
                step={1}
                value={formData.wheel_diameter || 12}
                onChange={handleChange}
                className="w-full"
              />
              <span className="min-w-[30px] text-center">{formData.wheel_diameter || "12"}</span>
              {errors.wheel_diameter && <p className="text-red-500 text-sm">{errors.wheel_diameter}</p>}
            </div>
            {/* Chassis Reinforcement */}
            <div>
              <label className="block text-sm font-medium mb-1">Chassis Reinforcement</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chassis_reinforcement"
                    value="1"
                    checked={formData.chassis_reinforcement === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chassis_reinforcement"
                    value="0"
                    checked={formData.chassis_reinforcement === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {formData.chassis_reinforcement === "1" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Reinforcement Details</label>
                  <Input
                    name="chassis_reinforcement_text"
                    value={formData.chassis_reinforcement_text}
                    onChange={handleChange}
                    placeholder="Describe the reinforcement done"
                  />
                  {errors.chassis_reinforcement_text && <p className="text-red-500 text-sm">{errors.chassis_reinforcement_text}</p>}
                </div>
              )}
            </div>
            {/* Audio Upgrade */}
            <div>
              <label className="block text-sm font-medium mb-1">Audio Upgrades</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="audio_upgrade"
                    value="1"
                    checked={formData.audio_upgrade === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="audio_upgrade"
                    value="0"
                    checked={formData.audio_upgrade === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {formData.audio_upgrade === "1" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Audio Upgrade Details</label>
                  <Input
                    name="audio_upgrade_text"
                    value={formData.audio_upgrade_text}
                    onChange={handleChange}
                    placeholder="Describe the audio upgrades"
                  />
                  {errors.audio_upgrade_text && <p className="text-red-500 text-sm">{errors.audio_upgrade_text}</p>}
                </div>
              )}
            </div>
            {/* Cosmetic Upgrade */}
            <div>
              <label className="block text-sm font-medium mb-1">Exterior Cosmetic Upgrades</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="cosmetic_upgrade"
                    value="1"
                    checked={formData.cosmetic_upgrade === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="cosmetic_upgrade"
                    value="0"
                    checked={formData.cosmetic_upgrade === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {formData.cosmetic_upgrade === "1" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Cosmetic Upgrade Details</label>
                  <Input
                    name="cosmetic_upgrade_text"
                    value={formData.cosmetic_upgrade_text}
                    onChange={handleChange}
                    placeholder="Describe cosmetic upgrades (paint, body kits, etc.)"
                  />
                  {errors.cosmetic_upgrade_text && <p className="text-red-500 text-sm">{errors.cosmetic_upgrade_text}</p>}
                </div>
              )}
            </div>
            {/* Interior Upgrade */}
            <div>
              <label className="block text-sm font-medium mb-1">Interior Upgrades</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="interior_upgrade"
                    value="1"
                    checked={formData.interior_upgrade === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="interior_upgrade"
                    value="0"
                    checked={formData.interior_upgrade === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {formData.interior_upgrade === "1" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Interior Upgrade Details</label>
                  <Input
                    name="interior_upgrade_text"
                    value={formData.interior_upgrade_text}
                    onChange={handleChange}
                    placeholder="Describe interior upgrades (seats, dashboard, etc.)"
                  />
                  {errors.interior_upgrade_text && <p className="text-red-500 text-sm">{errors.interior_upgrade_text}</p>}
                </div>
              )}
            </div>
            {/* Exterior Upgrade */}
            <div>
              <label className="block text-sm font-medium mb-1">Exterior (body) Upgrades</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exterior_upgrade"
                    value="1"
                    checked={formData.exterior_upgrade === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exterior_upgrade"
                    value="0"
                    checked={formData.exterior_upgrade === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {formData.exterior_upgrade === "1" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Exterior Upgrade Details</label>
                  <Input
                    name="exterior_upgrade_text"
                    value={formData.exterior_upgrade_text}
                    onChange={handleChange}
                    placeholder="Describe body kit, wrap, spoiler, etc."
                  />
                  {errors.exterior_upgrade_text && <p className="text-red-500 text-sm">{errors.exterior_upgrade_text}</p>}
                </div>
              )}
            </div>
            {/* Motor Upgrade */}
            <div>
              <label className="block text-sm font-medium mb-1">Motor Upgrades</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motor_upgrade"
                    value="1"
                    checked={formData.motor_upgrade === "1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="motor_upgrade"
                    value="0"
                    checked={formData.motor_upgrade === "0"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {formData.motor_upgrade === "1" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Motor Upgrade Details</label>
                  <Input
                    name="motor_upgrade_text"
                    value={formData.motor_upgrade_text}
                    onChange={handleChange}
                    placeholder="Describe engine swaps, turbo kits, etc."
                  />
                  {errors.motor_upgrade_text && <p className="text-red-500 text-sm">{errors.motor_upgrade_text}</p>}
                </div>
              )}
            </div>
            {/* Drive Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Drive Type</label>
              <select
                name="driver_type"
                value={formData.driver_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Drive Type</option>
                {vehicleDriverTypes && vehicleDriverTypes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.driver_type && <p className="text-red-500 text-sm">{errors.driver_type}</p>}
            </div>
            {/* Motor Size (Cylinders) */}
            <div>
              <label className="block text-sm font-medium mb-1">Motor Size (Cylinders)</label>
              <select
                name="motor_size_cylinders"
                value={formData.motor_size_cylinders}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Motor Size</option>
                {vehicleMotorSizes && vehicleMotorSizes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.motor_size_cylinders && <p className="text-red-500 text-sm">{errors.motor_size_cylinders}</p>}
            </div>
            {/* Transmission Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Transmission Type</label>
              <select
                name="transmition_types"
                value={formData.transmition_types}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Transmission Type</option>
                {vehicleTransmissionTypes && vehicleTransmissionTypes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.transmition_types && <p className="text-red-500 text-sm">{errors.transmition_types}</p>}
            </div>
            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Fuel Type</label>
              <select
                name="fuel_types"
                value={formData.fuel_types}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Fuel Type</option>
                {vehicleFuelTypes && vehicleFuelTypes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.fuel_types && <p className="text-red-500 text-sm">{errors.fuel_types}</p>}
            </div>
            {/* Seller Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Seller Type</label>
              <select
                name="seller_type"
                value={formData.seller_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Seller Type</option>
                {vehicleSellerTypes && vehicleSellerTypes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.seller_type && <p className="text-red-500 text-sm">{errors.seller_type}</p>}
            </div>
            {/* Vehicle Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Status</label>
              <select
                name="vehicle_status"
                value={formData.vehicle_status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Vehicle Status</option>
                {vehicleStatuses && vehicleStatuses.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.vehicle_status && <p className="text-red-500 text-sm">{errors.vehicle_status}</p>}
            </div>
            {/* Vehicle Primarily Used */}
            <div>
              <label className="block text-sm font-medium mb-1">What the vehicle is primarily used for?</label>
              <select
                name="vehicle_primarily_used"
                value={formData.vehicle_primarily_used}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Primarily Use</option>
                <option value="Daily Driver">Daily Driver</option>
                <option value="Straight line racing (1/8 mile, 1/4 mile, etc.)">Straight line racing (1/8 mile, 1/4 mile, etc.)</option>
                <option value="Drift Racing">Drift Racing</option>
                <option value="Mud Bogging">Mud Bogging</option>
              </select>
              {errors.vehicle_primarily_used && <p className="text-red-500 text-sm">{errors.vehicle_primarily_used}</p>}
            </div>
            {/* HP Output Range */}
            <div>
              <label className="block text-sm font-medium mb-1">HP Output Range</label>
              <select
                name="hp_output_rang"
                value={formData.hp_output_rang}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select HP Output Range</option>
                {vehicleHpOutputs && vehicleHpOutputs.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.hp_output_rang && <p className="text-red-500 text-sm">{errors.hp_output_rang}</p>}
            </div>
            {/* Vehicle Use */}
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Use</label>
              <select
                name="vehicle_use"
                value={formData.vehicle_use}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Vehicle Use</option>
                {vehicleUses && vehicleUses.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.vehicle_use && <p className="text-red-500 text-sm">{errors.vehicle_use}</p>}
            </div>
            {/* Number of Doors */}
            <div>
              <label className="block text-sm font-medium mb-1">Number of Doors</label>
              <select
                name="number_of_doors"
                value={formData.number_of_doors}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Number of Doors</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6+</option>
              </select>
              {errors.number_of_doors && <p className="text-red-500 text-sm">{errors.number_of_doors}</p>}
            </div>
            {/* Stock Parts */}
            <div>
              <label className="block text-sm font-medium mb-1">Do you still have any of the stock parts?</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="vehicle_stock_parts"
                    value="yes"
                    checked={formData.vehicle_stock_parts === "yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="vehicle_stock_parts"
                    value="no"
                    checked={formData.vehicle_stock_parts === "no"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
              {errors.vehicle_stock_parts && <p className="text-red-500 text-sm">{errors.vehicle_stock_parts}</p>}
            </div>
            {/* Documentation Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Documentation</label>
              <select
                name="documentation_type"
                value={formData.documentation_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Documentation</option>
                {vehicleDocumentationTypes && vehicleDocumentationTypes.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              {errors.documentation_type && <p className="text-red-500 text-sm">{errors.documentation_type}</p>}
            </div>
            {/* Listing Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Listing Title</label>
              <Input
                name="vehicle_title"
                value={formData.vehicle_title}
                onChange={handleChange}
                placeholder="Title"
              />
              {errors.vehicle_title && <p className="text-red-500 text-sm">{errors.vehicle_title}</p>}
            </div>
            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="vehicle_descripition"
                value={formData.vehicle_descripition}
                onChange={handleChange}
                rows={5}
                placeholder="Please describe your vehicle in detail, including its history and condition."
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {errors.vehicle_descripition && <p className="text-red-500 text-sm">{errors.vehicle_descripition}</p>}
            </div>
            {/* Modifications */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Modifications</label>
              <textarea
                name="vehicle_modification"
                value={formData.vehicle_modification}
                onChange={handleChange}
                rows={5}
                placeholder="Please list all modifications (engine, suspension, wheels, body, etc.)"
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
              {errors.vehicle_modification && <p className="text-red-500 text-sm">{errors.vehicle_modification}</p>}
            </div>
            {/* Images (upload and preview) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Add New Images</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setNewImages(Array.from(e.target.files));
                }
              }}
            />
          </div>
          {media.length > 0 && (
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Images</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {media.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.file_url}
                      alt="Listing"
                      className="w-full h-40 object-cover rounded border"
                    />
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-100"
                      title="Delete image"
                    >
                      <XIcon className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
            {/* Contact Information */}
            <div className="col-span-2">
              <h3 className="text-lg font-bold mt-4 mb-2">Contact Information</h3>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <Input
                name="vehicle_owner_name"
                value={formData.vehicle_owner_name}
                onChange={handleChange}
                placeholder="Owner Name"
              />
              {errors.vehicle_owner_name && <p className="text-red-500 text-sm">{errors.vehicle_owner_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Owner Address</label>
              <Input
                name="vehicle_owner_address"
                value={formData.vehicle_owner_address}
                onChange={handleChange}
                placeholder="Owner Address"
              />
              {errors.vehicle_owner_address && <p className="text-red-500 text-sm">{errors.vehicle_owner_address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input
                name="vehicle_owner_email"
                value={formData.vehicle_owner_email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
              {errors.vehicle_owner_email && <p className="text-red-500 text-sm">{errors.vehicle_owner_email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                name="vehicle_owner_phone"
                value={formData.vehicle_owner_phone}
                onChange={handleChange}
                placeholder="Phone Number"
                type="tel"
              />
              {errors.vehicle_owner_phone && <p className="text-red-500 text-sm">{errors.vehicle_owner_phone}</p>}
            </div>
            {/* Advanced address fields (latitude, longitude, country, postal_code) */}
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <Input
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <Input
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <Input
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="Postal Code"
              />
            </div>
            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Sold</option>
              </select>
            </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
            <Button type="submit">Save Changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
