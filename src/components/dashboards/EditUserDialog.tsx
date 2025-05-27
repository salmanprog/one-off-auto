import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchUsers } from "@/lib/api"; // Import fetchUsers to get user data
import { User } from "@/lib/api"; // Import User interface

// Mock update user data function (for demonstration)
const updateUserData = (userId: number, updatedData: Partial<User>): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real application, you would send a request to your backend API
      console.log(`Mock: Updating user ${userId} with data:`, updatedData);
      // Simulate success
      resolve();
      // Simulate failure:
      // reject(new Error('Failed to update user'));
    }, 500);
  });
};

interface EditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null; // User ID to edit
  onSave: () => void; // Callback to refresh user list after save
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ isOpen, onClose, userId, onSave }) => {
  const [userData, setUserData] = useState<User | null>(null); // State to hold user data
  const [loading, setLoading] = useState(true);
  const [editedData, setEditedData] = useState<Partial<User> | null>(null); // State to hold edited form data

  useEffect(() => {
    if (isOpen && userId !== null) {
      setLoading(true);
      // In a real application, fetch a single user by ID. Using fetchUsers and finding for mock.
      fetchUsers()
        .then(users => {
          const user = users.find(u => u.id === userId);
          setUserData(user || null);
          // Create a partial copy for editing, handle potential undefined user
          // Only include fields that can be edited (username and status based on request)
          setEditedData(user ? { username: user.username, status: user.status } : null);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching user ${userId}:`, error);
          setLoading(false);
        });
    } else {
      // Reset state when dialog is closed or userId is null
      setUserData(null);
      setEditedData(null);
      setLoading(false);
    }
  }, [isOpen, userId]); // Refetch when dialog opens or userId changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditedData({ ...editedData, [id]: value });
  };

  const handleSelectChange = (field: keyof Partial<User>, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleSave = () => {
    if (userId !== null && editedData) {
      console.log(`Saving changes for user with ID: ${userId}`, editedData);
      // In a real application, you would call an API to update the user:
      updateUserData(userId, editedData)
        .then(() => {
          alert(`User ${userId} updated.`); // Or use a toast
          onSave(); // Call parent callback to refresh list
          onClose();
        })
        .catch(error => {
          console.error(`Error updating user ${userId}:`, error);
          alert(`Failed to update user ${userId}.`); // Or use a toast
        });

      // // Mock update for demonstration (if not using the updateUserData mock function above):
      // console.log("Mock update: User data would be sent to API here.", editedData);
      // // Simulate updating the mock data - Note: This won't persist across sessions
      //  // In a real app, the API call would handle the actual data update
      //  // For mock, we'll simulate the change and then refresh the list via onSave
      // alert(`Mock Update: Changes for user ${userId} would be saved.`); // Simulate success
      // onSave(); // Simulate refresh of the parent list
      // onClose(); // Close dialog
    }
  };

  // Options for user status (should ideally come from a central place)
  const statusOptions = ['Active', 'Inactive'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg overflow-y-auto"> {/* Adjust max-width and add vertical scroll */}
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Editing details for User ID: {userId}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {loading ? (
            <p>Loading user data...</p>
          ) : editedData ? (
            <form>
              {/* Username/Email Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">Email</Label> {/* Using email as username */}
                <Input
                  id="username"
                  value={editedData.username || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

              {/* Status Select */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select onValueChange={(value) => handleSelectChange('status', value)} value={editedData.status || ''}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Add other user fields as needed (e.g., registrationDate - potentially read-only) */}

            </form>
          ) : (
            <p>User data not found.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading || !editedData}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog; 