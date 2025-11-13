import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditCategoryDialog = ({ isOpen, onClose, category, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    if (category) {
      setTitle(category.title || "");
      setDescription(category.description || "");
      setImage(category.image_url || "");
    }
  }, [category]);

  const handleSubmit = () => {
    onSave(category.slug, { 
      title, 
      description, 
      image_url: image,     // OLD image
      image_file: newImage  // NEW UPLOADED FILE
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            placeholder="Category Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}  // FIXED!
            rows={5}
            placeholder="Please describe the category..."
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
          />
        </div>

        {/* Image URL */}
         <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Add New Images</label>
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                    setNewImage(e.target.files[0]);
                    }
                }}
                />
        </div>
        <div className="col-span-2">
         <img src={image} alt="Logo" className="h-20 w-auto" />
        </div>

        <Button onClick={handleSubmit}>Update</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
