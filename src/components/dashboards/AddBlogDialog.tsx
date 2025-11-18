import React, { useState, useRef, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";

// Register ImageResize module
ReactQuill.Quill.register("modules/imageResize", ImageResize);

const AddBlogDialog = ({ isOpen, onClose, onSave, categories }) => {
  const quillRef = useRef(null);

  const handleImageUpload = useCallback(() => {
    const quill = quillRef.current;
  
    if (!quill) {
      console.error("Quill editor not ready");
      return;
    }
  
    let range = quill.getSelection();
    if (!range) {
      range = { index: quill.getLength() };
    }
  
    // Create file selector
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.style.display = "none";
    document.body.appendChild(input);
  
    const handleFileSelect = async () => {
      const file = input.files?.[0];
      if (!file) {
        document.body.removeChild(input);
        return;
      }
  
      const currentQuill = quillRef.current;
      if (!currentQuill) {
        document.body.removeChild(input);
        return;
      }
  
      const formData = new FormData();
      formData.append("image", file);
  
      try {
        const response = await fetch("https://oneoffauto.sitestaginglink.com/api/media", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
  
        if (!result.url) {
          console.error("No image URL returned", result);
          document.body.removeChild(input);
          return;
        }
  
        const imageUrl = result.url;
  
        // Insert image into the editor
        let currentRange = currentQuill.getSelection();
        if (!currentRange) {
          currentRange = { index: currentQuill.getLength() };
        }
  
        currentQuill.insertEmbed(currentRange.index, "image", imageUrl);
        currentQuill.setSelection(currentRange.index + 1);
  
      } catch (err) {
        console.error("Image upload failed:", err);
      }
  
      // Cleanup
      document.body.removeChild(input);
      input.removeEventListener("change", handleFileSelect);
    };
  
    input.addEventListener("change", handleFileSelect);
    input.click();
  }, []);
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [metatitle, setMetaTitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  }), [handleImageUpload]);

  const quillFormats = useMemo(() => [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "align",
    "script",
    "direction",
    "size",
    "image",
    "link",
  ], []);

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 sm:max-h-[85vh]">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b flex-shrink-0">
          <DialogTitle>Add Blog</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Title</label>
            <Input
              placeholder="Blog Title"
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                setSlug(value.toLowerCase().replace(/ /g, "-"));
              }}
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Select Category</label>
            <select
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
            <div className="bg-white" style={{ minHeight: "250px" }}>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder="Please describe the blog post..."
                modules={quillModules}
                formats={quillFormats}
                className="bg-white rounded-md"
                style={{ minHeight: "200px" }}
                ref={(el) => {
                  if (el) {
                    quillRef.current = el.getEditor();
                  }
                }}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Upload Image</label>
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

          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Meta Title</label>
            <Input
              placeholder="Meta Title (for SEO)"
              value={metatitle}
              onChange={(e) => {
                const value = e.target.value;
                setMetaTitle(value);
              }}
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Meta Description</label>
            <Input
              placeholder="Meta Description (for SEO)"
              value={metadescription}
              onChange={(e) => {
                const value = e.target.value;
                setMetaDescription(value);
              }}
            />
          </div>
        </div>

        {/* Footer with Save Button */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t flex-shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogDialog;
