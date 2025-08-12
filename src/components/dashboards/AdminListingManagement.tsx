import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetch } from "../../hooks/request";
import EditListingDialog from "./EditListingDialog"; // Import EditListingDialog
import ChangeListingStatusDialog from "./ChangeListingStatusDialog"; // Import ChangeListingStatusDialog
import { updateListingStatus } from "@/lib/api"; // Assuming this function is imported from api
import { useNavigate } from 'react-router-dom';
import ViewListingDialog from './ViewListingDialog';

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

const AdminListingManagement: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for Edit Dialog
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false); // State for Status Dialog
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null); // State to hold the selected listing ID (for edit/status only)
  const [selectedListingStatus, setSelectedListingStatus] = useState<string | null>(null); // State to hold the selected listing status
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [statusFilter, setStatusFilter] = useState("all"); // Filter for listing status
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const listingsPerPage = 4; // Number of listings per page
  const navigate = useNavigate();

  const { data } = useFetch("get_vehicle_list");
  const { postData } = useFetch("update_vehicle", "submit");
  // Load listings function
  const loadListings = () => {
    setLoading(true);
    if (Array.isArray(data)) {
      setListings(data);
    } else {
      setListings([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadListings(); // Initial load
  }, [data]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter by status change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  // Filter listings based on search term and status filter
  const filteredListings = listings.filter((listing) => {
    const matchesSearchTerm =
      listing.vehicle_title.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by title
      listing.vehicle_make.toLowerCase().includes(searchTerm.toLowerCase()) || // Optionally search by make
      listing.vehicle_model.toLowerCase().includes(searchTerm.toLowerCase()); // Optionally search by model

    const matchesStatusFilter =
      statusFilter === "all" || listing.status_text.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearchTerm && matchesStatusFilter;
  });

  // Get the current page listings
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  // Replace handleView to navigate to ListingDetail page
  const handleView = (listingId: number) => {
    setSelectedListingId(listingId);
    setIsViewDialogOpen(true);
  };

  const handleEditStatus = (listingId: string,status: string) => {
    setSelectedListingId(listingId);
    setSelectedListingStatus(status);
    setIsStatusDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
  };

  const handleCloseStatusDialog = () => {
    setIsStatusDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
    setSelectedListingStatus(null); // Clear selected listing status on close
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedListingId(null);
  };

  const handleSaveStatus = (listingId: number, newStatus: string) => {
    try {
      const fd = new FormData();
      fd.append('status',newStatus);
      const callback = (receivedData: unknown) => {
        window.location.reload();
      };
      postData(fd, callback, listingId);
    } catch (error) {
      console.error(`Error deleting listing ${selectedListingId}:`, error);
      alert(`Failed to update vehicle`);
    }
    //setIsStatusDialogOpen(true);
  };
  // useEffect(() => {
  //   if (currentListings.length > 0) {
  //     setSelectedListingStatus(currentListings[0].status);
  //   }
  // }, [currentListings]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Listing Management</h2>

      {/* Listing Management Tools (Search/Filter) */}
      <div className="flex items-center mb-4">
        <Input
          placeholder="Search listings..."
          className="max-w-sm mr-4"
          value={searchTerm}
          onChange={handleSearchChange} // Handle search input change
        />
        <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-[180px] mr-4">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Listing Management Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <p>Loading listings...</p>
        ) : currentListings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentListings.map(listing => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium"><img src={listing.image_url} alt={listing.vehicle_title} className="w-25 h-16 object-cover rounded" /></TableCell>
                  <TableCell>{listing.vehicle_title}</TableCell>
                  <TableCell>{listing.vehicle_category.title}</TableCell>
                  <TableCell>{listing.vehicle_make_obj.title}</TableCell>
                  <TableCell>{listing.vehicle_model_obj.title}</TableCell>
                  <TableCell>{listing.vehicle_year_obj.title}</TableCell>
                  <TableCell>{listing.vehicle_price}</TableCell>
                  <TableCell>{listing.status_text}</TableCell>
                  <TableCell className="text-right">
                    {listing.status_text !== "Sold" && (
                         <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEditStatus(listing.slug,listing.status)}>Change Status</Button>
                    )}
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleView(listing.id)}>View</Button>
                    {/* {listing.status_text !== "Sold" && listing.status_text !== "Approved" && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => { 
                          handleSaveStatus(listing.slug, listing.status === "0" ? "1" : "0"); 
                        }}
                      >
                        Change Status
                      </Button>
                    )} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No listings found.</p>
        )}
      </div>

      {/* Pagination Controls */}
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

      {/* Render Dialogs */}
      <EditListingDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        listing={listings.find((listing) => listing.id === selectedListingId) || null}
        onSave={() => {}}
      />

      <ChangeListingStatusDialog
        isOpen={isStatusDialogOpen}
        onClose={handleCloseStatusDialog}
        listingId={selectedListingId}
        currentStatus={selectedListingStatus}
        onSave={handleSaveStatus}
      />

      <ViewListingDialog
        isOpen={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        listing={mapListingForDialog(listings.find(listing => listing.id === selectedListingId) || null)}
      />
    </div>
  );
};

export default AdminListingManagement;
