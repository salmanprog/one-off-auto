import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Listing, User } from "@/lib/api";
import { useFetch } from "../../hooks/request";
import { useNavigate } from 'react-router-dom';

const UserFavouriteListings: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { data } = useFetch("vehicle_favourite");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 3;
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(listings.length / listingsPerPage);

  useEffect(() => {
    if (data) {
      setLoading(true);
      setListings(data);
      setLoading(false);
    }
  }, [data]);


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Favorite Listings</h2>
       <div className="bg-white rounded-lg shadow-md p-6">
         {loading ? (
           <p>Loading your listings...</p>
         ) : listings.length > 0 ? (
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Listing ID</TableHead>
                 <TableHead>Title</TableHead>
                 <TableHead className="text-right">Actions</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {currentListings.map(listing => (
                 <TableRow key={listing.vehicle.id}>
                   <TableCell className="font-medium">{listing.id}</TableCell>
                   <TableCell>{listing.vehicle.vehicle_title}</TableCell>
                   <TableCell className="text-right">
                     <Button variant="ghost" size="sm" onClick={() => navigate(`/listings/${listing.vehicle.slug}`)} className="mr-2">View</Button>
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

    </div>
  );
};

export default UserFavouriteListings;
