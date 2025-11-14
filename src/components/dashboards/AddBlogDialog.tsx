import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddBlogDialog = ({ isOpen, onClose, onSave, categories }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [metatitle, setMetaTitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleSubmit = () => {
    onSave({
      title,
      slug,
      description,
      cat_id: categoryId,
      image_file: newImage,
      metatitle,
      metadescription
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Blog</DialogTitle>
        </DialogHeader>

        {/* Title */}
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          placeholder="Blog Title"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            setSlug(value.toLowerCase().replace(/ /g, "-"));
          }}
          className="mb-3"
        />

        {/* Category Dropdown */}
        <label className="block text-sm font-medium mb-1">Select Category</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md mb-3"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        {/* Content */}
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
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setNewImage(e.target.files[0]);
            }
          }}
        />

        {newImage && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(newImage)}
              alt="Preview"
              className="h-20 w-auto rounded-md"
            />
          </div>
        )}
        {/* Meta Title */}
        <label className="block text-sm font-medium mb-1">Meta Title</label>
        <Input
          placeholder="Meta Title"
          value={metatitle}
          onChange={(e) => {
            const value = e.target.value;
            setMetaTitle(value);
          }}
          className="mb-3"
        />
        {/* Meta Description */}
        <label className="block text-sm font-medium mb-1">Meta Description</label>
        <Input
          placeholder="Meta Description"
          value={metadescription}
          onChange={(e) => {
            const value = e.target.value;
            setMetaDescription(value);
          }}
          className="mb-3"
        />
        <Button className="mt-4" onClick={handleSubmit}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogDialog;
