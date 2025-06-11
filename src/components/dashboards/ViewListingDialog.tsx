import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Listing } from "@/lib/api";

interface ViewListingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | null;
}

const ViewListingDialog: React.FC<ViewListingDialogProps> = ({ isOpen, onClose, listing }) => {
  if (!listing) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Listing Details - {listing.vehicle_title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Info section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Make:</strong> {listing.vehicle_make}
            </div>
            <div>
              <strong>Model:</strong> {listing.vehicle_model}
            </div>
            <div>
              <strong>Year:</strong> {listing.vehicle_year}
            </div>
            <div>
              <strong>Price:</strong> ${listing.vehicle_price}
            </div>
            <div>
              <strong>Category:</strong> {listing.vehicle_category?.title}
            </div>
            <div>
              <strong>Status:</strong> {listing.vehicle_status}
            </div>
          </div>

          {/* Media preview */}
          {Array.isArray(listing.media) && listing.media.length > 0 ? (
            <div>
              <strong className="block mb-2">Images:</strong>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.media.map((mediaItem, idx) => (
                  <img
                    key={idx}
                    src={mediaItem.file_url || mediaItem.file_url || mediaItem} // fallback for different structures
                    alt={`Vehicle Image ${idx + 1}`}
                    className="rounded border w-full h-48 object-cover"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No images available for this listing.</p>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewListingDialog;
