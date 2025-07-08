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

function mapListingForDialog(listing: any) {
  if (!listing) return null;
  return {
    ...listing,
    title: listing.vehicle_title || listing.listingTitle || listing.title,
    price: listing.vehicle_price || listing.price,
    vehicle_make: listing.vehicle_make,
    vehicle_make_title: listing.vehicle_make_obj?.title || listing.vehicle_make || listing.make,
    vehicle_model: listing.vehicle_model,
    vehicle_model_title: listing.vehicle_model_obj?.title || listing.vehicle_model || listing.model,
    vehicle_year: listing.vehicle_year,
    vehicle_year_title: listing.vehicle_year_obj?.title || listing.vehicle_year || listing.year,
    vehicle_primarily_used: listing.vehicle_primarily_used,
    vehicle_stock_parts: listing.vehicle_stock_parts,
    location: listing.vehicle_owner_address || listing.location,
    mileage: listing.vehicle_mileage || listing.mileage,
    image: listing.image_url || listing.image || listing.images?.[0] || '/placeholder.svg',
    user_id: listing.user_id,
    vehicle_modification: listing.vehicle_modification || listing.modifications || [],
    vehicle_owner_name: listing.vehicle_owner_name || listing.seller || listing.owner,
    vehicle_owner_address: listing.vehicle_owner_address,
    vehicle_owner_email: listing.vehicle_owner_email || listing.owner_email,
    vehicle_owner_phone: listing.vehicle_owner_phone || listing.owner_phone,
    seller_avatar: listing.seller_avatar || listing.owner_avatar,
    mods: listing.mods || [],
    description: listing.vehicle_descripition || listing.description || '',
    driver_type: listing.driver_type,
    driver_title: listing.driver_type_obj?.title || listing.driver_type,
    motor_size_cylinders: listing.motor_size_cylinders,
    motor_size_title: listing.motor_size_cylinders_obj?.title || listing.motor_size_cylinders,
    transmition_types: listing.transmition_types,
    transmition_types_title: listing.transmition_types_obj?.title || listing.transmition_types,
    fuel_types: listing.fuel_types,
    fuel_types_title: listing.fuel_types_obj?.title || listing.fuel_types,
    number_of_doors: listing.number_of_doors,
    exterior_color: listing.exterior_color,
    interior_color: listing.interior_color,
    seller_type: listing.seller_type,
    seller_type_title: listing.seller_type_obj?.title || listing.seller_type,
    vehicle_status: listing.vehicle_status,
    vehicle_status_title: listing.vehicle_status_obj?.title || listing.status_text || listing.status,
    suspension_size: listing.suspension_size,
    suspension_type: listing.suspension_type,
    suspension_type_title: listing.suspension_type_obj?.title || listing.suspension_type,
    chassis_reinforcement: listing.chassis_reinforcement,
    chassis_reinforcement_text: listing.chassis_reinforcement_text,
    audio_upgrade: listing.audio_upgrade,
    audio_upgrade_text: listing.audio_upgrade_text,
    wheel_width: listing.wheel_width,
    wheel_diameter: listing.wheel_diameter,
    hp_output_rang: listing.hp_output_rang,
    hp_output_rang_title: listing.hp_output_rang_obj?.title || listing.hp_output_rang,
    cosmetic_upgrade: listing.cosmetic_upgrade,
    cosmetic_upgrade_text: listing.cosmetic_upgrade_text,
    vehicle_use: listing.vehicle_use,
    vehicle_use_title: listing.vehicle_use_obj?.title || listing.vehicle_use,
    interior_upgrade: listing.interior_upgrade,
    interior_upgrade_text: listing.interior_upgrade_text,
    exterior_upgrade: listing.exterior_upgrade,
    exterior_upgrade_text: listing.exterior_upgrade_text,
    motor_upgrade: listing.motor_upgrade,
    motor_upgrade_text: listing.motor_upgrade_text,
    documentation_type: listing.documentation_type,
    documentation_type_title: listing.documentation_type_obj?.title || listing.documentation_type,
    additionalImages: listing.media?.map((m: { file_url: string }) => m.file_url) || listing.images || [],
  };
}

const UserListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for Edit Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for Delete Dialog
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null); // State to hold the 
  // selected listing ID
  const { data } = useFetch("get_vehicle_list");
  const { postData } = useFetch("delete_vehicle", "submit");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 3;
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // State for View Dialog

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
    setIsViewDialogOpen(true);
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
        const fd = new FormData();
        const callback = (receivedData: any) => {
          window.location.reload();
        };
        postData(fd, callback, selectedListingId);
        //await deleteListing(selectedListingId);
        //alert(`Listing ${selectedListingId} deleted.`); // Or use a toast
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

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
    reloadListings(); // Refresh list after edit
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedListingId(null);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
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
                   <TableCell>{listing.status_text}</TableCell>
                   <TableCell>{listing.created_at}</TableCell>
                   <TableCell className="text-right">
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleView(listing.id)}>View</Button>
                     <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEdit(listing.id)}>Edit</Button>
                     <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(listing.slug)}>Delete</Button>
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

         <ViewListingDialog
            isOpen={isViewDialogOpen}
            onClose={handleCloseViewDialog}
            listing={mapListingForDialog(listings.find(listing => listing.id === selectedListingId) || null)}
          />

    </div>
  );
};

export default UserListings;
