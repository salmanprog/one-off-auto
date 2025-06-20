import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetch } from "../../hooks/request";
import ViewListingDialog from "./ViewListingDialog"; // Import ViewListingDialog
import EditListingDialog from "./EditListingDialog"; // Import EditListingDialog
import ChangeListingStatusDialog from "./ChangeListingStatusDialog"; // Import ChangeListingStatusDialog
import { updateListingStatus } from "@/lib/api"; // Assuming this function is imported from api

const AdminListingManagement: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // State for View Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for Edit Dialog
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false); // State for Status Dialog
  const [selectedListingId, setSelectedListingId] = useState<number | null>(null); // State to hold the selected listing ID
  const [selectedListingStatus, setSelectedListingStatus] = useState<string | null>(null); // State to hold the selected listing status
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [statusFilter, setStatusFilter] = useState("all"); // Filter for listing status
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const listingsPerPage = 4; // Number of listings per page

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

  // Handle view dialog
  const handleView = (listingId: number) => {
    setSelectedListingId(listingId);
    setIsViewDialogOpen(true); // Open View Dialog
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedListingId(null); // Clear selected listing ID on close
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

  const handleSaveStatus = (listingId: number, newStatus: string) => {
    console.log('listingId.............',listingId+' newStatus.............'+newStatus)
    try {
      const fd = new FormData();
      fd.append('status',newStatus);
      const callback = (receivedData: any) => {
        window.location.reload();
      };
      postData(fd, callback, listingId);
    } catch (error) {
      console.error(`Error deleting listing ${selectedListingId}:`, error);
      alert(`Failed to update vehicle`);
    }
    //setIsStatusDialogOpen(true);
  };

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
                <TableHead>Listing ID</TableHead>
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
                  <TableCell className="font-medium">{listing.id}</TableCell>
                  <TableCell>{listing.vehicle_title}</TableCell>
                  <TableCell>{listing.vehicle_category.title}</TableCell>
                  <TableCell>{listing.vehicle_make}</TableCell>
                  <TableCell>{listing.vehicle_model}</TableCell>
                  <TableCell>{listing.vehicle_year}</TableCell>
                  <TableCell>{listing.vehicle_price}</TableCell>
                  <TableCell>{listing.status_text}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleView(listing.id)}>View</Button>
                    {listing.status_text !== "Sold" && listing.status_text !== "Approved" && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => { 
                          handleSaveStatus(listing.slug, listing.status === "0" ? "1" : "0"); 
                        }}
                      >
                        Change Status
                      </Button>
                    )}
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
      <ViewListingDialog
        isOpen={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        listing={listings.find(listing => listing.id === selectedListingId) || null}
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
