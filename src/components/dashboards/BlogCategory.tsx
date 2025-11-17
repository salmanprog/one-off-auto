import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetch } from "../../hooks/request";
import HttpRequest from "../../repositories";
import AddCategoryDialog from "./AddCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import Helper from "../../helpers";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const BlogCategoryListings: React.FC = () => {

  const { data } = useFetch("blog_categories");
  const { postData } = useFetch("blog_category_update", "submit");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog States  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryStatus, setSelectedCategoryStatus] = useState("");

  useEffect(() => {
    if (data) {
      setCategories(data);
      setLoading(false);
    }
  }, [data]);

  // Add Category
  const handleAddCategory = async (newCat) => {
    try {
        const formData = new FormData();

        // Append the text data (title, description, etc.)
        formData.append('title', newCat.title);
        formData.append('description', newCat.description);
        
        // If there's a new image, append it to FormData
        if (newCat.image_file) {
        formData.append('image_url', newCat.image_file);  // 'image' is the key the backend expects
        }

        // Send the FormData using the POST request
        const response = await HttpRequest.makeRequest(
        'POST', 
        baseUrl + 'admin/blog-category',  // Ensure this is the correct URL for adding category
        formData  // Send FormData with the category data
        );

        if (response.code === 200) {
        // Category added successfully
        window.location.reload();  // Reload the page to reflect the new category
        } else {
        // Handle non-successful category addition
        if (response.data) {
            Object.entries(response.data).forEach(([key, value]) => {
              Helper.sendNotification(
                "error",
                response.data.message,
                value
              );
            });
        } else {
            Helper.sendNotification("error", "Validation Error",response.data.message);
        }
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error("Error occurred while adding category:", error);
        alert("An error occurred while adding the category. Please try again.");
    }
  };

  // Edit Category
  const handleEditCategory = async (id, updatedData) => {
    try {
    const fd = new FormData();
    
    fd.append("title", updatedData.title);
    fd.append("description", updatedData.description || "");
    if(updatedData.image_file){
        fd.append("image_url", updatedData.image_file);
    }

    const callback = (response) => {
      window.location.reload();
    };
    postData(fd, callback, id); // <-- important
  } catch (error) {
    console.error("Failed to update category", error);
  }
    // await HttpRequest.makeRequest("PUT", baseUrl + "blog_categories/" + id, updatedData);
    // window.location.reload();
  };

  // Delete
  const handleDelete = async (slug) => {
    const response = await HttpRequest.makeRequest('Delete', baseUrl+'admin/blog-category/'+slug).then(
        (response) => {
          if (response.code !== 200) {
          } else {
            window.location.reload();
          }
        }
      );
    
  };

  // Update Status
  const handleSaveStatus = async (id, newStatus) => {
    await HttpRequest.makeRequest("POST", baseUrl + "blog_categories/status/" + id, { status: newStatus });
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <Button className="mb-4" onClick={() => setIsAddDialogOpen(true)}>
        Add Category
      </Button>

      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <p>Loading...</p>
        ) : categories.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell><img src={cat.image_url} className="w-20 h-14 object-cover rounded" /></TableCell>
                  <TableCell>{cat.title}</TableCell>
                  <TableCell>{cat.status}</TableCell>

                  <TableCell className="text-right">

                    <Button
                      variant="primary"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsEditDialogOpen(true);
                      }}
                    >Edit</Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cat.slug)}
                    >
                      Delete
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No categories found.</p>
        )}
      </div>

      {/* Dialogs */}
      <AddCategoryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddCategory}
      />

      <EditCategoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        category={selectedCategory}
        onSave={handleEditCategory}
      />

    </div>
  );
};

export default BlogCategoryListings;
