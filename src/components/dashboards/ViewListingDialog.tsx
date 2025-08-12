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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

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
            <Table>
              <TableBody>
                {/* Render details in pairs for 4-column layout */}
                <TableRow>
                  <TableHead>Vehicle Make</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.vehicle_make_title}</TableCell>
                  <TableHead>Vehicle Model</TableHead>
                  <TableCell>{listing.vehicle_model_title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Vehicle Year</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.vehicle_year_title}</TableCell>
                  <TableHead>Primarily Used</TableHead>
                  <TableCell>{listing.vehicle_primarily_used}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Stock Parts</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.vehicle_primarily_used ? listing.vehicle_primarily_used.replace(/_/g, " ") : "N/A"}</TableCell>
                  <TableHead>Location</TableHead>
                  <TableCell>{listing.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Mileage</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.mileage?.toLocaleString()}</TableCell>
                  <TableHead>Drive Type</TableHead>
                  <TableCell>{listing.driver_title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Motor Size (Cylinders)</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.motor_size_title}</TableCell>
                  <TableHead>Transmission Type</TableHead>
                  <TableCell>{listing.transmition_types_title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Fuel Type</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.fuel_types_title}</TableCell>
                  <TableHead>Number of Doors</TableHead>
                  <TableCell>{listing.number_of_doors}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Exterior Color</TableHead>
                  <TableCell className="border-r border-gray-300">
                    {listing.exterior_color ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          display: 'inline-block',
                          width: 24,
                          height: 24,
                          backgroundColor: listing.exterior_color,
                          border: '1px solid #ccc',
                          borderRadius: 4,
                          marginRight: 8
                        }} />
                        <span>{listing.exterior_color}</span>
                      </span>
                    ) : 'N/A'}
                  </TableCell>
                  <TableHead>Interior Color</TableHead>
                  <TableCell>
                    {listing.interior_color ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          display: 'inline-block',
                          width: 24,
                          height: 24,
                          backgroundColor: listing.interior_color,
                          border: '1px solid #ccc',
                          borderRadius: 4,
                          marginRight: 8
                        }} />
                        <span>{listing.interior_color}</span>
                      </span>
                    ) : 'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Seller Type</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.seller_type_title}</TableCell>
                  <TableHead>Status</TableHead>
                  <TableCell>{listing.vehicle_status_title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Suspension Size</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.suspension_size} inch</TableCell>
                  <TableHead>Suspension Type</TableHead>
                  <TableCell>{listing.suspension_type_title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Chassis Reinforcement</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.chassis_reinforcement === '1' ? 'Yes' : 'No'}</TableCell>
                  <TableHead>Audio Upgrades</TableHead>
                  <TableCell>{listing.audio_upgrade === '1' ? 'Yes' : 'No'}</TableCell>
                </TableRow>
                {listing.chassis_reinforcement === '1' && listing.audio_upgrade === '1' && (
                  <TableRow>
                    <TableHead>Chassis Reinforcement Detail</TableHead>
                    <TableCell>{listing.chassis_reinforcement_text}</TableCell>
                    <TableHead>Audio Upgrades Detail</TableHead>
                    <TableCell>{listing.audio_upgrade_text}</TableCell>
                  </TableRow>
                )}
                {listing.chassis_reinforcement === '1' && listing.audio_upgrade !== '1' && (
                  <TableRow>
                    <TableHead>Chassis Reinforcement Detail</TableHead>
                    <TableCell colSpan={3}>{listing.chassis_reinforcement_text}</TableCell>
                  </TableRow>
                )}
                {listing.audio_upgrade === '1' && listing.chassis_reinforcement !== '1' && (
                  <TableRow>
                    <TableHead>Audio Upgrades Detail</TableHead>
                    <TableCell colSpan={3}>{listing.audio_upgrade_text}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableHead>Wheel Width</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.wheel_width} inch</TableCell>
                  <TableHead>Wheel Diameter</TableHead>
                  <TableCell>{listing.wheel_diameter}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>HP Output Range</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.hp_output_rang_title}</TableCell>
                  <TableHead>Exterior Cosmetic Upgrades</TableHead>
                  <TableCell>{listing.cosmetic_upgrade === '1' ? 'Yes' : 'No'}</TableCell>
                </TableRow>
                {listing.cosmetic_upgrade === '1' && (
                  <TableRow>
                    <TableHead>Exterior Cosmetic Upgrades Detail</TableHead>
                    <TableCell colSpan={3}>{listing.cosmetic_upgrade_text}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableHead>Vehicle Use</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.vehicle_use_title}</TableCell>
                  <TableHead>Interior Upgrades</TableHead>
                  <TableCell>{listing.interior_upgrade === '1' ? 'Yes' : 'No'}</TableCell>
                </TableRow>
                {listing.interior_upgrade === '1' && (
                  <TableRow>
                    <TableHead>Interior Upgrades Detail</TableHead>
                    <TableCell colSpan={3}>{listing.interior_upgrade_text}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableHead>Exterior (body) Upgrades</TableHead>
                  <TableCell className="border-r border-gray-300">{listing.exterior_upgrade === '1' ? 'Yes' : 'No'}</TableCell>
                  <TableHead>Motor Upgrades</TableHead>
                  <TableCell>{listing.motor_upgrade === '1' ? 'Yes' : 'No'}</TableCell>
                </TableRow>
                {listing.exterior_upgrade === '1' && listing.motor_upgrade === '1' && (
                  <TableRow>
                    <TableHead>Exterior (body) Upgrades Detail</TableHead>
                    <TableCell>{listing.exterior_upgrade_text}</TableCell>
                    <TableHead>Motor Upgrades Detail</TableHead>
                    <TableCell>{listing.motor_upgrade_text}</TableCell>
                  </TableRow>
                )}
                {listing.exterior_upgrade === '1' && listing.motor_upgrade !== '1' && (
                  <TableRow>
                    <TableHead>Exterior (body) Upgrades Detail</TableHead>
                    <TableCell colSpan={3}>{listing.exterior_upgrade_text}</TableCell>
                  </TableRow>
                )}
                {listing.motor_upgrade === '1' && listing.exterior_upgrade !== '1' && (
                  <TableRow>
                    <TableHead>Motor Upgrades Detail</TableHead>
                    <TableCell colSpan={3}>{listing.motor_upgrade_text}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableHead>Documentation Type</TableHead>
                  <TableCell colSpan={3}>{listing.documentation_type_title}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
