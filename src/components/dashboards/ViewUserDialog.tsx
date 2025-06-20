import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchUsers } from "@/lib/api"; // Import fetchUsers to get user data
import { User } from "@/lib/api"; // Import User interface
import { useFetch } from "../../hooks/request"; // Custom hook for fetching data

interface ViewUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null; // User ID to view
}

const ViewUserDialog: React.FC<ViewUserDialogProps> = ({ isOpen, onClose, userId }) => {
  const [userData, setUserData] = useState<User | null>(null); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  
  // Fetch users using the `useFetch` hook
  const { data, error } = useFetch("get_users", "mount");

  // Debugging logs to check the structure
  

  useEffect(() => {
    if (isOpen && userId !== null) {
      setLoading(true); // Set loading state to true

      if (Array.isArray(data)) {
        // Find the user matching the userId
        const user = data.find((u: User) => u.slug === userId);
        console.log("User found:", user); // Log the found user
        
        setUserData(user || null);  // Set userData or null if not found
      } else {
        setUserData(null); // If data is not an array or user is not found
      }

      setLoading(false);  // Stop loading once the data is fetched or processed
    } else {
      setUserData(null);  // Reset userData if dialog is closed or userId is null
      setLoading(false);
    }
  }, [isOpen, userId, data]);  // Trigger when dialog opens or userId/data changes

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
          <p>Loading user data...</p> // Show loading message
        ) : userData ? (
          <div className="grid gap-4 py-4 text-sm">
            <p><span className="font-medium">User Name:</span> {userData.name}</p>
            <p><span className="font-medium">Email:</span> {userData.email}</p> {/* Displaying username as email */}
            <p><span className="font-medium">Status:</span> {userData.status}</p>
            <p><span className="font-medium">Registration Date:</span> {userData.created_at}</p>
          </div>
        ) : (
          <p>User data not found.</p> // If user data is not found
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDialog;
