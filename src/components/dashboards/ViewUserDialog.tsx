import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchUsers } from "@/lib/api"; // Import fetchUsers to get user data
import { User } from "@/lib/api"; // Import User interface

interface ViewUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null; // User ID to view
}

const ViewUserDialog: React.FC<ViewUserDialogProps> = ({ isOpen, onClose, userId }) => {
  const [userData, setUserData] = useState<User | null>(null); // State to hold user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId !== null) {
      setLoading(true);
      // In a real application, fetch a single user by ID. Using fetchUsers and finding for mock.
      fetchUsers()
        .then(users => {
          const user = users.find(u => u.id === userId);
          setUserData(user || null);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching user ${userId}:`, error);
          setLoading(false);
        });
    } else {
      // Reset state when dialog is closed or userId is null
      setUserData(null);
      setLoading(false); // Ensure loading is false when closed
    }
  }, [isOpen, userId]); // Refetch when dialog opens or userId changes

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]"> {/* Adjust max-width as needed */}
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Viewing details for User ID: {userId}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p>Loading user data...</p>
        ) : userData ? (
          <div className="grid gap-4 py-4 text-sm">
            <p><span className="font-medium">User ID:</span> {userData.id}</p>
            <p><span className="font-medium">Email:</span> {userData.username}</p> {/* Using username as email */}
            <p><span className="font-medium">Status:</span> {userData.status}</p>
            <p><span className="font-medium">Registration Date:</span> {userData.registrationDate}</p>
            {/* Add more user details as needed */}
          </div>
        ) : (
          <p>User data not found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDialog; 