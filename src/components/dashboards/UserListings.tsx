import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchListings, getLoggedInUser, deleteListing } from "@/lib/api"; // Import API functions
import { Listing, User } from "@/lib/api"; // Import interfaces
import ViewListingDialog from './ViewListingDialog'; // Import dialogs
import EditListingDialog from './EditListingDialog';
import { useFetch } from "../../hooks/request";
// import ChangeListingStatusDialog from './ChangeListingStatusDialog'; // Not needed for user listings
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; // Import AlertDialog

const UserListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // State for View Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for Edit Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for Delete Dialog
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null); // State to hold the 
  // selected listing ID
  const { data } = useFetch("get_vehicle_list");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 3;
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(listings.length / listingsPerPage);
  // Fetch logged-in user and their listings on component mount
  useEffect(() => {
    if (data) {
      setLoading(true);
      setListings(data);
      setLoading(false);
    }
  }, [data]);

  // Function to reload listings (e.g., after edit or delete)
  const reloadListings = async () => {
     if (data) {
       setLoading(true);
       try {
         //const userListings = await fetchListings(loggedInUser.username);
         setListings(data);
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
               {currentListings.map(listing => (
                 <TableRow key={listing.id}>
                   <TableCell className="font-medium">{listing.id}</TableCell>
                   <TableCell>{listing.vehicle_title}</TableCell>
                   <TableCell>{listing.vehicle_category.title}</TableCell>
                   <TableCell>{listing.vehicle_make}</TableCell>
                   <TableCell>{listing.vehicle_model}</TableCell>
                   <TableCell>{listing.vehicle_year}</TableCell>
                   <TableCell>{listing.vehicle_price}</TableCell>
                   <TableCell>{listing.vehicle_owner_email}</TableCell>
                   <TableCell>{listing.created_at}</TableCell>
                   <TableCell className="text-right">
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleView(listing.id)}>View</Button>
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEdit(listing.id)}>Edit</Button>
                     <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(listing.id)}>Delete</Button>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         ) : <p>You have no listings yet.</p> }
         <div className="flex justify-center mt-4 space-x-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>

         </div>

         {/* Render Dialogs */}
         <ViewListingDialog
            isOpen={isViewDialogOpen}
            onClose={handleCloseViewDialog}
            listing={listings.find(listing => listing.id === selectedListingId) || null}
          />

          <EditListingDialog
            isOpen={isEditDialogOpen}
            onClose={handleCloseEditDialog}
            listing={listings.find(listing => listing.id === selectedListingId) || null}
            onSave={reloadListings}
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
