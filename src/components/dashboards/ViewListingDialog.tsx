import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchListings } from "@/lib/api"; // Import fetchListings to get listing data
import { Listing } from "@/lib/api"; // Import Listing interface
import { getLoggedInUser, fetchUserByUsername, initiateChat, User } from "@/lib/api"; // Import chat and user API functions and User interface

interface ViewListingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: number | null; // Listing ID to view
}

const ViewListingDialog: React.FC<ViewListingDialogProps> = ({ isOpen, onClose, listingId }) => {
  const [listingData, setListingData] = useState<Listing | null>(null); // State to hold listing data
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [sellerUser, setSellerUser] = useState<User | null>(null);
  const [isInitiatingChat, setIsInitiatingChat] = useState(false);

  useEffect(() => {
    if (isOpen && listingId !== null) {
      setLoading(true);
      // Fetch listing data
      fetchListings()
        .then(listings => {
          const listing = listings.find(l => l.id === listingId);
          setListingData(listing || null);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching listing ${listingId}:`, error);
          setLoading(false);
        });

      // Fetch logged-in user
      getLoggedInUser()
        .then(user => setLoggedInUser(user))
        .catch(error => console.error('Error fetching logged-in user:', error));
    } else {
      // Reset state when dialog is closed or listingId is null
      setListingData(null);
      setLoading(false); // Ensure loading is false when closed
    }
  }, [isOpen, listingId]); // Refetch when dialog opens or listingId changes

  useEffect(() => {
    // Fetch seller user data when listing data is available and dialog is open
    if (isOpen && listingData?.seller) {
      fetchUserByUsername(listingData.seller)
        .then(user => setSellerUser(user || null))
        .catch(error => console.error(`Error fetching seller user ${listingData.seller}:`, error));
    }
  }, [isOpen, listingData?.seller]);

  const handleMessageSeller = async () => {
    if (listingData && loggedInUser && sellerUser) {
      setIsInitiatingChat(true);
      try {
        const session = await initiateChat(listingData.id, loggedInUser.id, sellerUser.id);
        console.log('Chat initiated:', session);
        // TODO: Navigate to chatroom with session details
      } catch (error) {
        console.error('Error initiating chat:', error);
      } finally {
        setIsInitiatingChat(false);
      }
    } else {
      console.warn('Cannot initiate chat: Missing listing data, logged-in user, or seller user.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]"> {/* Adjust max-width as needed */}
        <DialogHeader>
          <DialogTitle>Listing Details</DialogTitle>
          <DialogDescription>
            Viewing details for Listing ID: {listingId}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p>Loading listing data...</p>
        ) : listingData ? (
          <div className="grid gap-4 py-4 text-sm">
            <p><span className="font-medium">Listing Title:</span> {listingData.listingTitle}</p>
            <p><span className="font-medium">Vehicle Type:</span> {listingData.vehicleType}</p>
            <p><span className="font-medium">Make:</span> {listingData.make}</p>
            <p><span className="font-medium">Model:</span> {listingData.model}</p>
            <p><span className="font-medium">Year:</span> {listingData.year}</p>
            <p><span className="font-medium">Price:</span> {listingData.price}</p>
            <p><span className="font-medium">Seller:</span> {listingData.seller}</p>
            <p><span className="font-medium">Status:</span> {listingData.status}</p>
            <p><span className="font-medium">Date Posted:</span> {listingData.datePosted}</p>
            {listingData.description && <p><span className="font-medium">Description:</span> {listingData.description}</p>}
            {listingData.modifications && <p><span className="font-medium">Modifications:</span> {listingData.modifications}</p>}
            {/* Placeholder for Vehicle Photos */}
            <p><span className="font-medium">Vehicle Photos:</span> [Display photos here]</p>
            {/* Add more listing details as needed */}

            {loggedInUser?.username !== listingData.seller && ( // Only show if not viewing your own listing
              <button
                onClick={handleMessageSeller}
                className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${isInitiatingChat ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isInitiatingChat || !loggedInUser || !sellerUser}
              >
                {isInitiatingChat ? 'Starting chat...' : 'Message Seller'}
              </button>
            )}
          </div>
        ) : ( 
          <p>Listing data not found.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewListingDialog; 