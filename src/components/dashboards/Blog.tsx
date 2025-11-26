import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetch } from "../../hooks/request";
import HttpRequest from "../../repositories";
import AddBlogDialog from "./AddBlogDialog";
import EditBlogDialog from "./EditBlogDialog";
import Helper from "../../helpers";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const BlogPostListings: React.FC = () => {

  const { data } = useFetch("blog"); 
  const { data:category } = useFetch("blog_categories");
  const { postData } = useFetch("blog_update", "submit");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (data) {
      setPosts(data);
      setLoading(false);
    }
  }, [data]);


  // Add Blog
  const handleAddPost = async (newPost) => {
    try {
      const fd = new FormData();
      fd.append("title", newPost.title);
      fd.append("cat_id", newPost.cat_id);
      fd.append("description", newPost.description);

      if (newPost.image_file) {
        fd.append("image_url", newPost.image_file);
      }
      if (newPost.metatitle) {
        fd.append("meta_title", newPost.metatitle);
      }
      if (newPost.metadescription) {
        fd.append("meta_description", newPost.metadescription);
      }
      if (newPost.schedule_date) {
        fd.append("schedule_date", newPost.schedule_date);
      }

      const response = await HttpRequest.makeRequest(
        "POST",
        baseUrl + "admin/blog",
        fd
      );

      if (response.code === 200) {
        window.location.reload();
      } else {
        if (response.data) {
          Object.entries(response.data).forEach(([key, value]) => {
            Helper.sendNotification("error", response.data.message, value);
          });
        } else {
          Helper.sendNotification("error", "Error", "Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  // Edit Blog
  const handleEditPost = async (id, updated) => {
    try {
      const fd = new FormData();
      fd.append("title", updated.title);
      fd.append("cat_id", updated.cat_id);
      fd.append("slug", updated.slug);
      fd.append("description", updated.description);

      if (updated.image_file) {
        fd.append("image_url", updated.image_file);
      }
      if (updated.schedule_date) {
        fd.append("schedule_date", updated.schedule_date);
      }

      const callback = () => window.location.reload();
      postData(fd, callback, id);

    } catch (error) {
      console.error(error);
    }
  };


  // Delete
  const handleDelete = async (slug) => {
    await HttpRequest.makeRequest(
      "DELETE",
      baseUrl + "admin/blog/" + slug
    ).then((response) => {
      if (response.code === 200) {
        window.location.reload();
      }
    });
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>

      <Button className="mb-4" onClick={() => setIsAddDialogOpen(true)}>
        Add Blog Post
      </Button>

      <div className="bg-white rounded-lg shadow-md p-6">

        {loading ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Schedule Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {posts.map(post => (
                <TableRow key={post.id}>
                  <TableCell>
                    <img src={post.image_url} className="w-20 h-14 object-cover rounded" />
                  </TableCell>

                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.schedule_date}</TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setSelectedPost(post);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.slug)}
                    >
                      Delete
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        ) : (
          <p>No posts found.</p>
        )}

      </div>

      {/* Add Dialog */}
      <AddBlogDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddPost}
        categories={category}
      />

      {/* Edit Dialog */}
      <EditBlogDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        post={selectedPost}
        onSave={handleEditPost}
        categories={category}
      />

    </div>
  );
};

export default BlogPostListings;
