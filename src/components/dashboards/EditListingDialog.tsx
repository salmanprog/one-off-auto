import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchListings, updateListingData } from "@/lib/api";
import { Listing } from "@/lib/api";

interface EditListingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: number | null;
  onSave: () => void;
}

const EditListingDialog: React.FC<EditListingDialogProps> = ({ isOpen, onClose, listingId, onSave }) => {
  const [listingData, setListingData] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [editedData, setEditedData] = useState<Partial<Listing> | null>(null);

  useEffect(() => {
    if (isOpen && listingId !== null) {
      setLoading(true);
      fetchListings()
        .then(listings => {
          const listing = listings.find(l => l.id === listingId);
          setListingData(listing || null);
          setEditedData(listing ? { ...listing } : null);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching listing ${listingId}:`, error);
          setLoading(false);
        });
    } else {
      setListingData(null);
      setEditedData(null);
      setLoading(false);
    }
  }, [isOpen, listingId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditedData({ ...editedData, [id]: value });
  };

  const handleSelectChange = (field: keyof Partial<Listing>, value: string) => {
     setEditedData({ ...editedData, [field]: value });
  };

  const handleSave = () => {
    if (listingId !== null && editedData) {
      console.log(`Saving changes for listing with ID: ${listingId}`, editedData);
      updateListingData(listingId, editedData)
        .then(() => {
          alert(`Listing ${listingId} updated.`);
          onSave();
          onClose();
        })
        .catch(error => {
          console.error(`Error updating listing ${listingId}:`, error);
          alert(`Failed to update listing ${listingId}.`);
        });
    }
  };

  const statusOptions = ['Pending Approval', 'Active', 'Sold', 'Expired'];
  const vehicleTypeOptions = ['Sedan', 'Coupe', 'SUV', 'Truck', 'Motorcycle', 'Other'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
          <DialogDescription>
            Editing details for Listing ID: {listingId}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
           {loading ? (
             <p>Loading listing data...</p>
           ) : editedData ? (
             <form>
               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="listingTitle" className="text-right">Listing Title</Label>
                 <Input
                   id="listingTitle"
                   value={editedData.listingTitle || ''}
                   onChange={handleInputChange}
                   className="col-span-3"
                 />
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="vehicleType" className="text-right">Vehicle Type</Label>
                 <Select onValueChange={(value) => handleSelectChange('vehicleType', value)} value={editedData.vehicleType || ''}>
                   <SelectTrigger className="col-span-3">
                     <SelectValue placeholder="Select vehicle type" />
                   </SelectTrigger>
                   <SelectContent>
                     {vehicleTypeOptions.map(type => (
                       <SelectItem key={type} value={type}>{type}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="make" className="text-right">Make</Label>
                 <Input
                   id="make"
                   value={editedData.make || ''}
                   onChange={handleInputChange}
                   className="col-span-3"
                 />
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="model" className="text-right">Model</Label>
                 <Input
                   id="model"
                   value={editedData.model || ''}
                   onChange={handleInputChange}
                   className="col-span-3"
                 />
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="year" className="text-right">Year</Label>
                 <Input
                   id="year"
                   value={editedData.year?.toString() || ''} 
                   onChange={handleInputChange}
                   className="col-span-3"
                   type="number"
                 />
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="price" className="text-right">Price</Label>
                 <Input
                   id="price"
                   value={editedData.price || ''}
                   onChange={handleInputChange}
                   className="col-span-3"
                 />
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="description" className="text-right">Description</Label>
                 <textarea
                   id="description"
                   value={editedData.description || ''}
                   onChange={handleInputChange}
                   className="col-span-3 border rounded-md p-2"
                   rows={4}
                  />
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="modifications" className="text-right">Modifications</Label>
                 <textarea
                   id="modifications"
                   value={editedData.modifications || ''}
                   onChange={handleInputChange}
                   className="col-span-3 border rounded-md p-2"
                    rows={4}
                  />
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label htmlFor="status" className="text-right">Status</Label>
                 <Select onValueChange={(value) => handleSelectChange('status', value)} value={editedData.status || ''}>
                   <SelectTrigger className="col-span-3">
                     <SelectValue placeholder="Select a status" />
                   </SelectTrigger>
                   <SelectContent>
                     {statusOptions.map(status => (
                       <SelectItem key={status} value={status}>{status}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               <div className="grid grid-cols-4 items-center gap-4 mb-4">
                 <Label className="text-right">Vehicle Photos</Label>
                 <div className="col-span-3">[Photo upload/display area]</div>
               </div>

             </form>
           ) : (
             <p>Listing data not found.</p>
           )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading || !editedData}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;