import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Listing } from "@/lib/api";
import { XIcon } from "lucide-react";

// 🧠 Assume these are imported properly:
// import { updateListing, deleteMediaItem } from "@/lib/api";

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
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [media, setMedia] = useState<any[]>([]);

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
      });
      setMedia(listing.media || []);
    }
  }, [listing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.vehicle_title.trim()) newErrors.vehicle_title = "Title is required.";
    if (!formData.vehicle_make.trim()) newErrors.vehicle_make = "Make is required.";
    if (!formData.vehicle_model.trim()) newErrors.vehicle_model = "Model is required.";
    if (!formData.vehicle_year.trim()) newErrors.vehicle_year = "Year is required.";
    if (!formData.vehicle_price.trim()) newErrors.vehicle_price = "Price is required.";
    if (!formData.vehicle_mileage.trim()) newErrors.vehicle_mileage = "Mileage is required.";
    if (!formData.vehicle_descripition.trim()) newErrors.vehicle_descripition = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!listing || !validate()) return;

    try {
      await updateListing(listing.id, {
        ...listing,
        ...formData,
        vehicle_year: parseInt(formData.vehicle_year),
        vehicle_price: parseFloat(formData.vehicle_price),
      });
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to update listing", error);
    }
  };

  const handleDeleteImage = async (mediaId: number) => {
    try {
      await deleteMediaItem(mediaId);
      setMedia(prev => prev.filter(item => item.id !== mediaId));
    } catch (error) {
      console.error("Failed to delete media", error);
      alert("Could not delete image.");
    }
  };

  if (!listing) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["vehicle_title", "Title"],
            ["vehicle_make", "Make"],
            ["vehicle_model", "Model"],
            ["vehicle_year", "Year"],
            ["vehicle_price", "Price"],
            ["vehicle_mileage", "Mileage"],
            ["vehicle_descripition", "Description", "col-span-2"],
          ].map(([name, label, extraClass = ""]) => (
            <div key={name} className={extraClass}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <Input
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                type={
                  name.includes("year") || name.includes("price")
                    ? "number"
                    : "text"
                }
                placeholder={label}
              />
              {errors[name as string] && (
                <p className="text-red-500 text-sm mt-1">{errors[name as string]}</p>
              )}
            </div>
          ))}

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
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
