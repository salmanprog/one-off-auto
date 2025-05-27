import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoggedInUser, updateUserData, changePassword, User } from "@/lib/api"; // Import changePassword

const UserAccountSettings: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedData, setEditedData] = useState<Partial<User> | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false); // State for password change dialog
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const user = await getLoggedInUser();
        setUserData(user);
        setEditedData(user ? { ...user } : null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    loadUserData();
  }, []); // Fetch user data on component mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditedData({ ...editedData, [id]: value });
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordFields({ ...passwordFields, [id]: value });
  };

  const handleSave = async () => {
    if (userData?.id && editedData) {
      console.log(`Saving changes for user ID: ${userData.id}`, editedData);
      try {
        // Only update fields that have been edited
        const dataToUpdate: Partial<User> = {};
        if (editedData.fullName !== userData.fullName) dataToUpdate.fullName = editedData.fullName;
        if (editedData.email !== userData.email) dataToUpdate.email = editedData.email;
        if (editedData.profileImageUrl !== userData.profileImageUrl) dataToUpdate.profileImageUrl = editedData.profileImageUrl;
        if (editedData.phoneNumber !== userData.phoneNumber) dataToUpdate.phoneNumber = editedData.phoneNumber;

        if (Object.keys(dataToUpdate).length > 0) {
             await updateUserData(userData.id, dataToUpdate);
             alert("Account updated successfully!"); // Or use a toast
             // Optionally refresh user data after successful save
             // loadUserData(); // Uncomment to refetch data after save
        } else {
            alert("No changes detected.");
        }

      } catch (error) {
        console.error("Error updating user data:", error);
        alert("Failed to update account."); // Or use a toast
      }
    }
  };

  const handleChangePassword = async () => {
    if (userData?.id) {
      if (passwordFields.newPassword !== passwordFields.confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
      // In a real app, you'd send currentPassword for validation on the backend
      try {
        await changePassword(userData.id, passwordFields.currentPassword, passwordFields.newPassword);
        alert("Password changed successfully!"); // Or use a toast
        setIsPasswordDialogOpen(false);
        setPasswordFields({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Clear fields
      } catch (error) {
        console.error("Error changing password:", error);
        alert("Failed to change password."); // Or use a toast
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      {loading ? (
        <p>Loading account data...</p>
      ) : editedData ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="grid gap-4 py-4">
            {/* Profile Image Field (using a simple text input for URL for now) */}
             <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="profileImageUrl" className="text-right">Profile Image URL</Label>
              <Input
                id="profileImageUrl"
                value={editedData.profileImageUrl || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Full Name Field */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="fullName" className="text-right">Full Name</Label>
              <Input
                id="fullName"
                value={editedData.fullName || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Email Field */}
            <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                value={editedData.email || ''}
                onChange={handleInputChange}
                className="col-span-3"
                type="email"
              />
            </div>

            {/* Phone Number Field */}
             <div className="grid grid-cols-4 items-center gap-4 mb-4">
              <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={editedData.phoneNumber || ''}
                onChange={handleInputChange}
                className="col-span-3"
                type="tel"
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
                   <div className="grid gap-4 py-4">
                       <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="currentPassword" className="text-right">Current Password</Label>
                            <Input id="currentPassword" type="password" value={passwordFields.currentPassword} onChange={handlePasswordInputChange} className="col-span-3" />
                       </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newPassword" className="text-right">New Password</Label>
                            <Input id="newPassword" type="password" value={passwordFields.newPassword} onChange={handlePasswordInputChange} className="col-span-3" />
                       </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirmPassword" className="text-right">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" value={passwordFields.confirmPassword} onChange={handlePasswordInputChange} className="col-span-3" />
                       </div>
                   </div>
                   <div className="flex justify-end gap-2">
                       <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>Cancel</Button>
                       <Button onClick={handleChangePassword}>Change Password</Button>
                   </div>
               </div>
           </div>
       )}
    </div>
  );
};

export default UserAccountSettings;
