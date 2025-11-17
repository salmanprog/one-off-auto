import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditBlogDialog = ({ isOpen, onClose, post, onSave, categories }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [metatitle, setMetaTitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setSlug(post.slug || "");
      setDescription(post.description || "");
      setContent(post.content || "");
      setImage(post.image_url || "");
      setMetaTitle(post.meta_title || "");
      setMetaDescription(post.meta_description || "");
      setCategoryId(post.cat_id || ""); 
    }
  }, [post]);

  const handleSubmit = () => {
    onSave(post.slug, {
      title,
      slug,
      description,
      image_url: image,   // old image
      image_file: newImage, // new uploaded
      metatitle,
      metadescription
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>

        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />
        </div>
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
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}  // FIXED!
            rows={5}
            placeholder="Please describe the category..."
            className="w-full p-3 border border-gray-300 rounded-md mb-3"
          />
        </div>

        {/* Upload New Image */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Add New Image</label>
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

        {/* Show old image */}
        <div className="col-span-2 mt-3">
          <img src={image} alt="Blog" className="h-20 w-auto rounded-md border" />
        </div>
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
        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogDialog;
