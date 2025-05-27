import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchListings, updateListingStatus } from "@/lib/api"; // Import mock API function
import { Listing } from "@/lib/api"; // Import Listing interface
import ViewListingDialog from "./ViewListingDialog"; // Import ViewListingDialog
import EditListingDialog from "./EditListingDialog"; // Import EditListingDialog
import ChangeListingStatusDialog from "./ChangeListingStatusDialog"; // Import ChangeListingStatusDialog

const AdminListingManagement: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // State for View Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for Edit Dialog
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false); // State for Status Dialog
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null); // State to hold the selected listing ID
  const [selectedListingStatus, setSelectedListingStatus] = useState<string | null>(null); // State to hold the selected listing status

  const loadListings = () => {
    setLoading(true);
    fetchListings()
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching listings:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadListings(); // Initial load
  }, []);

  const handleView = (listingId: number) => {
    setSelectedListingId(listingId);
    setIsViewDialogOpen(true); // Open View Dialog
  };

  const handleEdit = (listingId: number) => {
    setSelectedListingId(listingId);
    setIsEditDialogOpen(true); // Open Edit Dialog
  };

  const handleChangeStatus = (listingId: number, currentStatus: string) => {
    setSelectedListingId(listingId);
    setSelectedListingStatus(currentStatus);
    setIsStatusDialogOpen(true); // Open Status Dialog
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
    // In a real app, you might want to reload listings here if edit was successful
  };

  const handleCloseStatusDialog = () => {
    setIsStatusDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
    setSelectedListingStatus(null); // Clear selected listing status on close
  };

  const handleSaveStatus = (listingId: number, newStatus: string) => {
    updateListingStatus(listingId, newStatus)
      .then(() => {
        alert(`Listing ${listingId} status updated to ${newStatus}.`); // Consider using a toast notification instead of alert
        loadListings(); // Refresh the list after status change
        setIsStatusDialogOpen(false); // Close dialog after successful save
      })
      .catch(error => {
        console.error("Error updating listing status:", error);
        alert(`Failed to update status for listing ${listingId}.`); // Consider using a toast notification
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Listing Management</h2>
      
      {/* Listing Management Tools (Search/Filter) */}
      <div className="flex items-center mb-4">
        <Input placeholder="Search listings..." className="max-w-sm mr-4" />
        <Select>
          <SelectTrigger className="w-[180px] mr-4">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending Approval</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Listing Management Table */}
       <div className="bg-white rounded-lg shadow-md p-6">
         {loading ? (
           <p>Loading listings...</p>
         ) : listings.length > 0 ? (
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Listing ID</TableHead>
                 <TableHead>Title</TableHead>
                 <TableHead>Vehicle Type</TableHead>
                 <TableHead>Make</TableHead>
                 <TableHead>Model</TableHead>
                 <TableHead>Year</TableHead>
                 <TableHead>Price</TableHead>
                 <TableHead>Seller</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead>Date Posted</TableHead>
                 <TableHead className="text-right">Actions</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {listings.map(listing => (
                 <TableRow key={listing.id}>
                   <TableCell className="font-medium">{listing.id}</TableCell>
                   <TableCell>{listing.listingTitle}</TableCell>
                   <TableCell>{listing.vehicleType}</TableCell>
                   <TableCell>{listing.make}</TableCell>
                   <TableCell>{listing.model}</TableCell>
                   <TableCell>{listing.year}</TableCell>
                   <TableCell>{listing.price}</TableCell>
                   <TableCell>{listing.seller}</TableCell>
                   <TableCell>{listing.status}</TableCell>
                   <TableCell>{listing.datePosted}</TableCell>
                   <TableCell className="text-right">
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleView(listing.id)}>View</Button>
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEdit(listing.id)}>Edit</Button>
                     <Button variant="ghost" size="sm" onClick={() => handleChangeStatus(listing.id, listing.status)}>Status</Button>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         ) : (
           <p>No listings found.</p>
         )}
         </div>

         {/* Render Dialogs */}
         <ViewListingDialog
           isOpen={isViewDialogOpen}
           onClose={handleCloseViewDialog}
           listingId={selectedListingId}
         />

         <EditListingDialog
           isOpen={isEditDialogOpen}
           onClose={handleCloseEditDialog}
           listingId={selectedListingId}
         />

         <ChangeListingStatusDialog
           isOpen={isStatusDialogOpen}
           onClose={handleCloseStatusDialog}
           listingId={selectedListingId}
           currentStatus={selectedListingStatus}
           onSave={handleSaveStatus}
         />

    </div>
  );
};

export default AdminListingManagement; 