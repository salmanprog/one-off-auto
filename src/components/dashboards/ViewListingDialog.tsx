import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ViewListingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Record<string, any> | null;
}

const ViewListingDialog: React.FC<ViewListingDialogProps> = ({ isOpen, onClose, listing }) => {
  // Gather all images (main + additional)
  const additionalImages = listing?.additionalImages || listing?.images || [];
  const rawImages = [listing?.image, ...additionalImages].filter(Boolean);
  const uniqueImages = Array.from(new Set(rawImages.length ? rawImages : ["/placeholder.svg"]));
  const [mainImage, setMainImage] = useState<string>(uniqueImages[0]);
  const [allImages, setAllImages] = useState<string[]>(uniqueImages);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setAllImages(uniqueImages);
    setMainImage(uniqueImages[0]);
  }, [isOpen, listing]);

  const handlePreviousClick = () => {
    const currentIndex = allImages.indexOf(mainImage);
    const previousIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setMainImage(allImages[previousIndex]);
  };

  const handleNextClick = () => {
    const currentIndex = allImages.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setMainImage(allImages[nextIndex]);
  };

  // Helper for fallback
  const fallback = (val: any, def: string = "N/A") => (val !== undefined && val !== null && val !== '' ? val : def);

  if (!listing) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{listing.title || listing.listingTitle || listing.id}</DialogTitle>
        </DialogHeader>
        <div className="container mx-auto py-2 px-1 sm:px-2 max-w-4xl">
          {/* Main Content: Image | Price & Seller */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
            {/* Listing Image */}
            <div className="flex-1">
              {/* Zoom-on-hover image container */}
              <div
                className="relative rounded-lg shadow-md overflow-hidden aspect-square group select-none"
                style={{ position: 'relative' }}
                onClick={e => {
                  e.preventDefault();
                  setZoomed(z => !z);
                  setZoomPos({ x: 50, y: 50 });
                }}
                onMouseMove={e => {
                  if (!zoomed) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomPos({ x, y });
                }}
                onMouseLeave={() => {
                  if (zoomed) setZoomed(false);
                  setZoomPos({ x: 50, y: 50 });
                }}
                tabIndex={0}
                role="button"
                aria-label={zoomed ? 'Exit zoom' : 'Zoom image'}
              >
                <img
                  src={mainImage}
                  alt={listing.title}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-200 bg-black"
                  style={zoomed ? {
                    transform: `scale(3)`,
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    cursor: 'zoom-out',
                  } : { position: 'absolute', inset: 0 }}
                  draggable={false}
                />
                {/* Overlay Arrow Buttons */}
                {allImages.length > 1 && <>
                  <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                    onClick={e => { e.stopPropagation(); handlePreviousClick(); }}
                    type="button"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                    onClick={e => { e.stopPropagation(); handleNextClick(); }}
                    type="button"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>}
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {zoomed ? 'Click or leave to exit zoom' : 'Click to zoom'}
                </span>
            </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mt-4">
                {allImages.map((img, index) => (
                  <img
                    key={`${img}-${index}`}
                    src={img}
                    alt={`${listing.title} - Thumbnail ${index + 1}`}
                    className={`w-full h-auto object-cover rounded-lg shadow-md cursor-pointer ${img === mainImage ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
            {/* Price & Seller Information */}
            <div className="flex flex-col gap-6 md:w-80">
              <Card>
                <CardHeader>
                  <CardTitle>Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-gray-800">${fallback(listing.price, '—')}</p>
                </CardContent>
              </Card>
              {/* Seller Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Seller Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4 w-full">
                      <Avatar>
                        <AvatarImage src={listing.seller_avatar || undefined} alt={listing.vehicle_owner_name || "Seller"} />
                        <AvatarFallback>{listing.vehicle_owner_name ? listing.vehicle_owner_name[0] : "S"}</AvatarFallback>
                      </Avatar>
                      <div className="font-semibold text-lg">{listing.vehicle_owner_name || "Private Seller"}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div><strong>Email:</strong> {fallback(listing.vehicle_owner_email)}</div>
                      <div><strong>Phone:</strong> {fallback(listing.vehicle_owner_phone)}</div>
                      <div><strong>Location:</strong> {fallback(listing.vehicle_owner_address)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Details Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700 text-lg"><strong>Vehicle Make:</strong> {fallback(listing.vehicle_make_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Vehicle Model:</strong> {fallback(listing.vehicle_model_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Vehicle Year:</strong> {fallback(listing.vehicle_year_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Primarily Used:</strong> {fallback(listing.vehicle_primarily_used)}</p>
              <p className="text-gray-700 text-lg"><strong>Stock Parts:</strong> {listing.vehicle_primarily_used ? listing.vehicle_primarily_used.replace(/_/g, " ") : "N/A"}</p>
              <p className="text-gray-700 text-lg"><strong>Location:</strong> {fallback(listing.location)}</p>
              <p className="text-gray-700 text-lg"><strong>Mileage:</strong> {listing.mileage?.toLocaleString?.() || fallback(listing.mileage)}</p>
              <p className="text-gray-700 text-lg"><strong>Drive Type:</strong> {fallback(listing.driver_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Motor Size (Cylinders):</strong> {fallback(listing.motor_size_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Transmission Type:</strong> {fallback(listing.transmition_types_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Fuel Type:</strong> {fallback(listing.fuel_types_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Number of Doors:</strong> {fallback(listing.number_of_doors)}</p>
              <p className="text-gray-700 text-lg"><strong>Exterior Color:</strong> {fallback(listing.exterior_color)}{' '}
                {listing.exterior_color && (
                  <span style={{
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    backgroundColor: listing.exterior_color,
                    border: '1px solid #ccc',
                    marginLeft: 8,
                    verticalAlign: 'middle',
                  }} />
                )}
              </p>
              <p className="text-gray-700 text-lg"><strong>Interior Color:</strong> {fallback(listing.interior_color)}{' '}
                {listing.interior_color && (
                  <span style={{
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    backgroundColor: listing.interior_color,
                    border: '1px solid #ccc',
                    marginLeft: 8,
                    verticalAlign: 'middle',
                  }} />
                )}
              </p>
              <p className="text-gray-700 text-lg"><strong>Seller Type:</strong> {fallback(listing.seller_type_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Status:</strong> {fallback(listing.vehicle_status_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Suspension Size:</strong> {fallback(listing.suspension_size)} inch</p>
              <p className="text-gray-700 text-lg"><strong>Suspension Type:</strong> {fallback(listing.suspension_type_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Chassis Reinforcement:</strong> {listing.chassis_reinforcement === '1' ? 'Yes' : 'No'}</p>
              {listing.chassis_reinforcement === '1' && (
                <p className="text-gray-700 text-lg">
                  <strong>Chassis Reinforcement Detail:</strong> {fallback(listing.chassis_reinforcement_text)}
                </p>
              )}
              <p className="text-gray-700 text-lg"><strong>Audio Upgrades:</strong> {listing.audio_upgrade === '1' ? 'Yes' : 'No'}</p>
              {listing.audio_upgrade === '1' && (
                <p className="text-gray-700 text-lg">
                  <strong>Audio Upgrades Detail:</strong> {fallback(listing.audio_upgrade_text)}
                </p>
              )}
              <p className="text-gray-700 text-lg"><strong>Wheel Width:</strong> {fallback(listing.wheel_width)} inch</p>
              <p className="text-gray-700 text-lg"><strong>Wheel Diameter:</strong> {fallback(listing.wheel_diameter)}</p>
              <p className="text-gray-700 text-lg"><strong>HP Output Range:</strong> {fallback(listing.hp_output_rang_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Exterior Cosmetic Upgrades:</strong> {listing.cosmetic_upgrade === '1' ? 'Yes' : 'No'}</p>
              {listing.cosmetic_upgrade === '1' && (
                <p className="text-gray-700 text-lg">
                  <strong>Exterior Cosmetic Upgrades Detail:</strong> {fallback(listing.cosmetic_upgrade_text)}
                </p>
              )}
              <p className="text-gray-700 text-lg"><strong>Vehicle Use:</strong> {fallback(listing.vehicle_use_title)}</p>
              <p className="text-gray-700 text-lg"><strong>Interior Upgrades:</strong> {listing.interior_upgrade === '1' ? 'Yes' : 'No'}</p>
              {listing.interior_upgrade === '1' && (
                <p className="text-gray-700 text-lg">
                  <strong>Interior Upgrades Detail:</strong> {fallback(listing.interior_upgrade_text)}
                </p>
              )}
              <p className="text-gray-700 text-lg"><strong>Exterior (body) Upgrades:</strong> {listing.exterior_upgrade === '1' ? 'Yes' : 'No'}</p>
              {listing.exterior_upgrade === '1' && (
                <p className="text-gray-700 text-lg">
                  <strong>Exterior (body) Upgrades Detail:</strong> {fallback(listing.exterior_upgrade_text)}
                </p>
              )}
              <p className="text-gray-700 text-lg"><strong>Motor Upgrades:</strong> {listing.motor_upgrade === '1' ? 'Yes' : 'No'}</p>
              {listing.motor_upgrade === '1' && (
                <p className="text-gray-700 text-lg">
                  <strong>Motor Upgrades Detail:</strong> {fallback(listing.motor_upgrade_text)}
                </p>
              )}
              <p className="text-gray-700 text-lg"><strong>Documentation Type:</strong> {fallback(listing.documentation_type_title)}</p>
            </CardContent>
          </Card>
          {/* Modifications Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(listing.vehicle_modification)
                  ? listing.vehicle_modification.map((mod: string, idx: number) => (
                      <span key={idx} className="inline-block bg-gray-200 rounded px-3 py-1 text-sm text-gray-700">{mod}</span>
                    ))
                  : <span className="text-gray-500">No modifications listed.</span>}
              </div>
            </CardContent>
          </Card>
          {/* Description Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">{fallback(listing.description)}</p>
            </CardContent>
          </Card>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewListingDialog;
