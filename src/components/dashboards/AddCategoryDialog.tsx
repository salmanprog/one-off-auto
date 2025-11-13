import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddCategoryDialog = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleSubmit = () => {
    // Pass title, description, and newImage (file)
    onSave({
      title,
      description,
      image_file: newImage,  // Send the file (image)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
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
            onChange={(e) => setDescription(e.target.value)}  // Handle description change
            rows={5}
            placeholder="Please describe the category..."
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
          />
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Add New Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setNewImage(e.target.files[0]);  // Store the selected file
              }
            }}
          />
        </div>

        {/* Image Preview (optional) */}
        {newImage && (
          <div className="col-span-2 mt-3">
            <img
              src={URL.createObjectURL(newImage)}
              alt="Preview"
              className="h-20 w-auto object-cover rounded"
            />
          </div>
        )}

        <Button onClick={handleSubmit}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
