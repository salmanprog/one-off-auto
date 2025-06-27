import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFetch } from "../../hooks/request";

const AdminSubscriberListing: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const listingsPerPage = 6; // Number of listings per page

  const { data } = useFetch("user_subscribe_list");

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

  // Filter listings based on search term
  const filteredListings = listings.filter(listing => 
    listing.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.id.toString().includes(searchTerm) // Include Listing ID search
  );

  // Get the current page listings
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Subscriber Listing</h2>

      <div className="flex items-center mb-4">
        <Input
          placeholder="Search listings..."
          className="max-w-sm mr-4"
          value={searchTerm}
          onChange={handleSearchChange} 
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <p>Loading listings...</p>
        ) : currentListings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Listing ID</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentListings.map(listing => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.id}</TableCell>
                  <TableCell>{listing.user_email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No listings found.</p>
        )}
      </div>

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
  );
};

export default AdminSubscriberListing;
