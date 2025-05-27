import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchListings, getLoggedInUser, deleteListing } from "@/lib/api"; // Import API functions
import { Listing, User } from "@/lib/api"; // Import interfaces
import ViewListingDialog from './ViewListingDialog'; // Import dialogs
import EditListingDialog from './EditListingDialog';
// import ChangeListingStatusDialog from './ChangeListingStatusDialog'; // Not needed for user listings
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; // Import AlertDialog

const UserListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // State for View Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for Edit Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for Delete Dialog
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null); // State to hold the selected listing ID

  // Fetch logged-in user and their listings on component mount
  useEffect(() => {
    const loadUserDataAndListings = async () => {
      try {
        const user = await getLoggedInUser();
        setLoggedInUser(user);
        if (user?.username) {
          setLoading(true);
          const userListings = await fetchListings(user.username);
          setListings(userListings);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data or listings:", error);
        setLoading(false);
      }
    };

    loadUserDataAndListings();
  }, []); // Empty dependency array means this runs once on mount

  // Function to reload listings (e.g., after edit or delete)
  const reloadListings = async () => {
     if (loggedInUser?.username) {
       setLoading(true);
       try {
         const userListings = await fetchListings(loggedInUser.username);
         setListings(userListings);
       } catch (error) {
         console.error("Error reloading listings:", error);
       } finally {
         setLoading(false);
       }
     }
  };

  const handleView = (listingId: number) => {
    setSelectedListingId(listingId);
    setIsViewDialogOpen(true); // Open View Dialog
  };

  const handleEdit = (listingId: number) => {
    setSelectedListingId(listingId);
    setIsEditDialogOpen(true); // Open Edit Dialog
  };

  const handleDeleteClick = (listingId: number) => {
    setSelectedListingId(listingId);
    setIsDeleteDialogOpen(true); // Open Delete Dialog
  };

  const confirmDelete = async () => {
    if (selectedListingId !== null) {
      try {
        await deleteListing(selectedListingId);
        alert(`Listing ${selectedListingId} deleted.`); // Or use a toast
        reloadListings(); // Refresh the list after deletion
        setIsDeleteDialogOpen(false);
        setSelectedListingId(null);
      } catch (error) {
        console.error(`Error deleting listing ${selectedListingId}:`, error);
        alert(`Failed to delete listing ${selectedListingId}.`); // Or use a toast
        setIsDeleteDialogOpen(false);
        setSelectedListingId(null);
      }
    }
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
    reloadListings(); // Refresh list after edit
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedListingId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>

      {/* Optional: Add filtering/sorting tools here similar to Listings.tsx if needed */}

      {/* Listings Table */}
       <div className="bg-white rounded-lg shadow-md p-6">
         {loading ? (
           <p>Loading your listings...</p>
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
                 {/* Seller column not needed in user's own listings */}
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
                   <TableCell>{listing.status}</TableCell>
                   <TableCell>{listing.datePosted}</TableCell>
                   <TableCell className="text-right">
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleView(listing.id)}>View</Button>
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEdit(listing.id)}>Edit</Button>
                     <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(listing.id)}>Delete</Button>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         ) : (loggedInUser ? (
           <p>You have no listings yet.</p>
         ) : (
           <p>Please log in to view your listings.</p>
         ))}
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
           onSave={reloadListings} // Pass reloadListings to refresh after edit
         />

         {/* Delete Listing Confirmation Dialog */}
         <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
               <AlertDialogDescription>
                 Are you sure you want to delete listing with ID {selectedListingId}? This action cannot be undone.
               </AlertDialogDescription>
             </AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogCancel onClick={handleCloseDeleteDialog}>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>

    </div>
  );
};

export default UserListings;
