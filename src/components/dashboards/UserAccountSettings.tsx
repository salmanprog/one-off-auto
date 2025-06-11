import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoggedInUser, updatedata, changePassword, User } from "@/lib/api"; // Import changePassword
import { useFetch } from "../../hooks/request";
import HttpRequest from "../../repositories";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const UserAccountSettings: React.FC = () => {
  const { data, loading: fetchLoading } = useFetch("get_user_detail");
  const { postData } = useFetch("update_users", "submit");
  const [imageUrl, setImageUrl] = useState<string>(''); // For preview
  const [imageFile, setImageFile] = useState<File | null>(null); // For actual upload
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (data?.info?.name) {
      setName(data.info.name);
    }
  }, [data]);
  // When data is loaded, update imageUrl state
  useEffect(() => {
    if (data?.info?.image_url) {
      setImageUrl(data.info.image_url);
    }
  }, [data]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Preview
    }
  };
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false); // State for password change dialog
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });



  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordFields({ ...passwordFields, [id]: value });
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordFields;
  
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
  
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
  
    try {
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: newPassword,
      };
      await HttpRequest.makeRequest('POST', baseUrl+'user/change-password', payload).then(
        (response) => {
          if (response.code !== 200) {
            if (response.data) {
              Object.entries(response.data).forEach(([key, value]) => {
                setPasswordError(value);
              });
              
            } else {
              setPasswordError(response.data.message);
            }
          } else {
            setPasswordError(null); // Clear error
            setIsPasswordDialogOpen(false);
            setPasswordFields({ currentPassword: '', newPassword: '', confirmPassword: '' });
          }
        }
      );
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError("Current password is incorrect or update failed.");
    }
  };
  
  const fd = new FormData();
  const slug = data?.info.slug
  const handleSave = async (values) => {
    fd.append("name", name);
    for (const key in values) {
      fd.append(key, values[key]);
    }
    if (imageFile) {
      fd.append("image_url", imageFile);  // Ensure 'file' is a valid file object
    }
    const callback = (receivedData) => {
      return navigate("/user-dashboard");
    };
    postData(fd, callback, slug);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      {loading ? (
        <p>Loading account data...</p>
      ) : data ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="grid gap-4 py-4">
            {/* Editable Profile Image Field with Live Preview */}
            <div className="grid grid-cols-4 items-start gap-4 mb-4">
            <Label className="text-right pt-2">Profile Image</Label>
            <div className="col-span-3 space-y-2">
              <img
                src={imageUrl || "/default-avatar.png"}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
              />
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>



            {/* Full Name Field */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="fullName" className="text-right">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>

            {/* Email Field */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                value={data.info.email || ''}
                className="col-span-3"
                type="email"
              />
            </div>

            {/* Password Change Section */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label className="text-right">Password</Label>
                 <div className="col-span-3">
                   <Button variant="outline" onClick={() => setIsPasswordDialogOpen(true)}>Change Password</Button>
                 </div>
            </div>

          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>Save Changes</Button>
          </div>
        </form>
      ) : (
        <p>Unable to load account data.</p>
      )}

       {/* Password Change Dialog (Placeholder) */}
       {isPasswordDialogOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Change Password</h3>
      {passwordError && (
            <div className="col-span-4 text-sm text-red-600 text-center">
              {passwordError}
            </div>
          )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentPassword" className="text-right">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordFields.currentPassword}
              onChange={handlePasswordInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordFields.newPassword}
              onChange={handlePasswordInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPassword" className="text-right">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordFields.confirmPassword}
              onChange={handlePasswordInputChange}
              className="col-span-3"
            />
          </div>

          
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Change Password</Button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default UserAccountSettings;
