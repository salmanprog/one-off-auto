import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Listing } from "@/lib/api";
import { XIcon } from "lucide-react";
import { useFetch } from "../../hooks/request";
import { useNavigate } from 'react-router-dom';
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
    status:"",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [media, setMedia] = useState<any[]>([]);
  const { postData } = useFetch("update_vehicle", "submit");
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  
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
        status: listing.status === "1" ? "Approved" : "Expired",
      });
      setMedia(listing.media || []);
      setDeletedImageIds([]);
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
      
      if (deletedImageIds.length > 0) {
        // You can send as JSON string
        fd.append("deleted_image_ids", JSON.stringify(deletedImageIds));
        // OR as comma separated string:
        // fd.append("deleted_image_ids", deletedImageIds.join(","));
      }
      if (newImages.length > 0) {
        newImages.forEach((file) => {
          fd.append("vehicle_images", file);
        });
      }

      const callback = (receivedData: any) => {
        //navigate("/user-dashboard/listings");
        window.location.reload();
      };
  
      postData(fd, callback, listing.slug);
      // await updateListing(listing.id, {
      //   ...listing,
      //   ...formData,
      //   vehicle_year: parseInt(formData.vehicle_year),
      //   vehicle_price: parseFloat(formData.vehicle_price),
      // });
      // onSave();
      onClose();
    } catch (error) {
      console.error("Failed to update listing", error);
    }
  };

  const handleDeleteImage = (mediaId: number) => {
    // Add to deletedImageIds
    setDeletedImageIds(prev => [...prev, mediaId]);
    // Remove image from media state to update UI immediately
    setMedia(prev => prev.filter(item => item.id !== mediaId));
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
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="2">Expired</option>
            <option value="1">Approved</option>
          </select>
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
