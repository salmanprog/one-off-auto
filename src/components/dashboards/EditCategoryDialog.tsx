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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 sm:max-h-[85vh]">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b flex-shrink-0">
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
            <Input
              placeholder="Category Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Please describe the category..."
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Current Image */}
          {image && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Current Image</label>
              <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                <img src={image} alt="Current" className="h-32 w-auto rounded-md object-cover" />
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Add New Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setNewImage(e.target.files[0]);
                }
              }}
              className="cursor-pointer"
            />
            {newImage && (
              <div className="mt-3 p-3 border border-gray-200 rounded-md bg-gray-50">
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="Preview"
                  className="h-32 w-auto rounded-md object-cover"
                />
                <p className="text-xs text-gray-500 mt-2">{newImage.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Update Button */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t flex-shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
