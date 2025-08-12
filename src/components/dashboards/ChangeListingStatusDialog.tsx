import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetch } from "../../hooks/request";

interface ChangeListingStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string | null; // Listing ID to change status for
  currentStatus: string | null; // Current status to display
  onSave: (listingId: string, newStatus: string) => void; // Function to call on save
}

const ChangeListingStatusDialog: React.FC<ChangeListingStatusDialogProps> = ({ isOpen, onClose, listingId, currentStatus, onSave }) => {
  const [newStatus, setNewStatus] = useState<string | null>(null); // Initialize with null
const { postData } = useFetch("update_vehicle", "submit");
  // Update local state when currentStatus or isOpen prop changes
  useEffect(() => {
    // Set the initial value of the select when the dialog opens or currentStatus changes
    if (isOpen) {
       setNewStatus(currentStatus);
    } else {
        // Reset state when dialog closes
        setNewStatus(null);
    }
  }, [isOpen, currentStatus]);

  const handleSave = () => {
    if (listingId !== null && newStatus !== null && newStatus !== currentStatus) {
      try {
        const fd = new FormData();
        fd.append('status',newStatus.toString());
        const callback = (receivedData: unknown) => {
          window.location.reload();
        };
        postData(fd, callback, listingId);
      } catch (error) {
        console.error(`Error deleting listing ${newStatus}:`, error);
        alert(`Failed to update vehicle`);
      }
      
      //onSave(listingId, newStatus);
      // onClose is now handled by the parent component after onSave completes
    } else {
        onClose(); // Close if no status change or invalid data
    }
  };

  // Options for listing status (should ideally come from a central place)
 const statusOptions = [
  { value: '0', label: 'Pending' },
  { value: '1', label: 'Approved' },
  { value: '3', label: 'Disapproved' }
 ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]"> {/* Adjust max-width as needed */}
        <DialogHeader>
          <DialogTitle>Change Listing Status </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
           {/* Ensure newStatus is not null or undefined when setting value */}
          <Select onValueChange={setNewStatus} value={newStatus ?? ''}>
             <SelectTrigger>
               <SelectValue placeholder="Select status" />
             </SelectTrigger>
             <SelectContent>
               {statusOptions.map(option => (
                 <SelectItem key={option.value} value={option.value}>
                  {option.label}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          {/* Disable save if no new status is selected or status is the same */}
          <Button onClick={handleSave} disabled={!newStatus || newStatus === currentStatus}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeListingStatusDialog; 