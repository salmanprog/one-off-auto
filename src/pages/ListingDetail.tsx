import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MainLayout from "../components/layouts/MainLayout"; // Import MainLayout
import { useFetch } from "../hooks/request";
import ListingCard from "../components/listings/ListingCard";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";
import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";
import UserMessages from "../components/dashboards/UserMessages";
import Helper from "../helpers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, Gauge, User, Star, Save, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Assuming a more detailed listing structure might exist or be fetched
interface DetailedListing {
  id: string;
  title: string;
  price: number;
  location: string;
  mileage: number;
  image: string;
  mods: string[];
  description: string;
  additionalImages: string[];
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string | number;
  vehicle_primarily_used?: string;
  vehicle_stock_parts?: string;
  user_id?: string;
  vehicle_modification?: string[];
  vehicle_owner_name?: string;
  vehicle_owner_address?: string;
  vehicle_owner_email?: string;
  vehicle_owner_phone?: string;
  seller_avatar?: string;
}

// Placeholder data - replace with actual data fetching logic


// Placeholder for related listings - replace with actual fetching logic
const dummyRelatedListings = [
  {
    id: '2',
    title: 'Custom 1969 Chevrolet Camaro',
    price: 65000,
    location: 'Miami, FL',
    mileage: 10000,
    image: '/product-img-1.avif', // Placeholder image
    mods: ['Pro-Touring Build', 'LS Engine Swap'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },{
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  
  // Add more dummy listings as needed
];

const ListingDetail = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const { loading, data, fetchApi } = useFetch("user_vehicle_list", "mount", listingId);
  const { postData } = useFetch("user_in_chatroom", "submit");
  const { data: related_vehicle } = useFetch("get_related_vehicle", "mount", listingId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const authUser = Helper.getStorageData("session");
  const navigate = useNavigate();
  // Fallback dummy listing
  const dummyListing: DetailedListing = {
    id: '1',
    title: 'Modified 2018 Ford Mustang GT',
    price: 35000,
    location: 'Los Angeles, CA',
    mileage: 25000,
    image: '/product-img-1.avif',
    mods: ['Turbocharger Upgrade', ' الرياضيةSuspension Kit', 'Custom Exhaust'],
    description: 'This stunning 2018 Ford Mustang GT features a powerful turbocharger upgrade...',
    additionalImages: [
      '/product-img-2.avif',
      '/product-img-1.avif',
    ],
  };

  // Use fetched data if available, otherwise fall back to dummyListing
  const listing: DetailedListing = useMemo(() => {
    return data
      ? {
          id: data.id,
          title: data.vehicle_title,
          price: data.vehicle_price,
          vehicle_make: data.vehicle_make,
          vehicle_model: data.vehicle_model,
          vehicle_year: data.vehicle_year,
          vehicle_primarily_used: data.vehicle_primarily_used,
          vehicle_stock_parts: data.vehicle_stock_parts,
          location: data.vehicle_owner_address,
          mileage: data.vehicle_mileage,
          image: data.image_url,
          user_id: data.user_id,
          vehicle_modification: data.vehicle_modification,
          vehicle_owner_name: data.vehicle_owner_name,
          vehicle_owner_address: data.vehicle_owner_address,
          vehicle_owner_email: data.vehicle_owner_email,
          vehicle_owner_phone: data.vehicle_owner_phone,
          mods: ['Turbocharger Upgrade', ' الرياضيةSuspension Kit', 'Custom Exhaust'],
          description: data.vehicle_descripition ? data.vehicle_descripition : 'No description provided.',
          driver_type: data.driver_type,
          driver_title: data.driver_type_obj.title,
          motor_size_cylinders: data.motor_size_cylinders,
          motor_size_title: data.motor_size_cylinders_obj.title,
          transmition_types: data.transmition_types,
          transmition_types_title: data.transmition_types_obj.title,
          fuel_types: data.fuel_types,
          fuel_types_title: data.fuel_types_obj.title,
          number_of_doors: data.number_of_doors,
          exterior_color: data.exterior_color,
          interior_color: data.interior_color,
          seller_type: data.seller_type,
          seller_type_title: data.seller_type_obj.title,
          vehicle_status: data.vehicle_status,
          vehicle_status_title: data.vehicle_status_obj.title,
          suspension_size: data.suspension_size,
          suspension_type: data.suspension_type,
          suspension_type_title: data.suspension_type_obj.title,
          chassis_reinforcement: data.chassis_reinforcement,
          chassis_reinforcement_text: data.chassis_reinforcement_text,
          audio_upgrade: data.audio_upgrade,
          audio_upgrade_text: data.audio_upgrade_text,
          wheel_width: data.wheel_width,
          wheel_diameter: data.wheel_diameter,
          hp_output_rang: data.hp_output_rang,
          hp_output_rang_title: data.hp_output_rang_obj.title,
          cosmetic_upgrade: data.cosmetic_upgrade,
          cosmetic_upgrade_text: data.cosmetic_upgrade_text,
          vehicle_use: data.vehicle_use,
          vehicle_use_title: data.vehicle_use_obj.title,
          interior_upgrade: data.interior_upgrade,
          interior_upgrade_text: data.interior_upgrade_text,
          exterior_upgrade: data.exterior_upgrade,
          exterior_upgrade_text: data.exterior_upgrade_text,
          motor_upgrade: data.motor_upgrade,
          motor_upgrade_text: data.motor_upgrade_text,
          documentation_type: data.documentation_type,
          documentation_type_title: data.documentation_type_obj.title,
          additionalImages: data.media?.map((m: { file_url: string }) => m.file_url) || [],
        }
      : dummyListing;
  }, [data]);

  const [mainImage, setMainImage] = useState<string>(dummyListing.image);
    const [allImages, setAllImages] = useState<string[]>([]);
    
    useEffect(() => {
      const rawImages = [listing.image, ...listing.additionalImages];
      const uniqueImages = Array.from(new Set(rawImages));
      setAllImages(uniqueImages);
      setMainImage(uniqueImages[0]);
    }, [listing]);
  

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

  // Add state for zoom
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const handleContactSeller = () => {
    navigate(`/signin`);
  };
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Heading Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{listing.title}</h1>
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
                <p className="text-3xl font-semibold text-gray-800">${listing.price?.toLocaleString()}</p>
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
                  {authUser && listing?.user_id !== authUser.id ? (
                    <Dialog open={isDialogOpen}
                            onOpenChange={(open) => {
                              setIsDialogOpen(open);
                              if (open) {
                                const fd = new FormData();
                                fd.append("is_online", '1');
                                fd.append("reciever_id", listing?.user_id);
                                fd.append("sender_id", authUser.id);
                                const callback = (receivedData: unknown) => {};
                                postData(fd, callback, undefined);
                              } else {
                                const fd = new FormData();
                                fd.append("is_online", '0');
                                fd.append("reciever_id", listing?.user_id);
                                fd.append("sender_id", authUser.id);
                                const callback = (receivedData: unknown) => { window.location.reload(); };
                                postData(fd, callback, undefined);
                              }
                            }}>
                      <DialogTrigger asChild>
                        <button className="btn-primary w-full">Contact Seller</button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <UserMessages hideSidebar={true} listing={listing}/>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <button className="btn-primary" onClick={handleContactSeller}>Contact Seller</button>
                  )}
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
            <p className="text-gray-700 text-lg"><strong>Vehicle Make:</strong> {listing.vehicle_make}</p>
            <p className="text-gray-700 text-lg"><strong>Vehicle Model:</strong> {listing.vehicle_model}</p>
            <p className="text-gray-700 text-lg"><strong>Vehicle Year:</strong> {listing.vehicle_year}</p>
            <p className="text-gray-700 text-lg"><strong>Primarily Used:</strong> {listing.vehicle_primarily_used}</p>
            <p className="text-gray-700 text-lg"><strong>Stock Parts:</strong> {listing.vehicle_primarily_used ? listing.vehicle_primarily_used.replace(/_/g, " ") : "N/A"}</p>
            <p className="text-gray-700 text-lg"><strong>Location:</strong> {listing.location}</p>
            <p className="text-gray-700 text-lg"><strong>Mileage:</strong> {listing.mileage?.toLocaleString()}</p>

            <p className="text-gray-700 text-lg"><strong>Drive Type:</strong> {listing.driver_title}</p>
            <p className="text-gray-700 text-lg"><strong>Motor Size (Cylinders):</strong> {listing.motor_size_title}</p>
            <p className="text-gray-700 text-lg"><strong>Transmission Type:</strong> {listing.transmition_types_title}</p>
            <p className="text-gray-700 text-lg"><strong>Fuel Type:</strong> {listing.fuel_types_title}</p>
            <p className="text-gray-700 text-lg"><strong>Number of Doors:</strong> {listing.number_of_doors}</p>
            <p className="text-gray-700 text-lg"><strong>Exterior Color:</strong> {listing.exterior_color}</p>
            <p className="text-gray-700 text-lg"><strong>Interior Color:</strong> {listing.interior_color}</p>
            <p className="text-gray-700 text-lg"><strong>Seller Type:</strong> {listing.seller_type_title}</p>
            <p className="text-gray-700 text-lg"><strong>Status:</strong> {listing.vehicle_status_title}</p>
            <p className="text-gray-700 text-lg"><strong>Suspension Size:</strong> {listing.suspension_size} inch</p>
            <p className="text-gray-700 text-lg"><strong>Suspension Type:</strong> {listing.suspension_type_title}</p>
            <p className="text-gray-700 text-lg"><strong>Chassis Reinforcement:</strong> {listing.chassis_reinforcement === '1' ? 'Yes' : 'No'}</p>
            {listing.chassis_reinforcement === '1' && (
              <p className="text-gray-700 text-lg">
                <strong>Chassis Reinforcement Detail:</strong> {listing.chassis_reinforcement_text}
              </p>
            )}
            <p className="text-gray-700 text-lg"><strong>Audio Upgrades:</strong> {listing.audio_upgrade === '1' ? 'Yes' : 'No'}</p>
            {listing.audio_upgrade === '1' && (
              <p className="text-gray-700 text-lg">
                <strong>Audio Upgrades Detail:</strong> {listing.audio_upgrade_text}
              </p>
            )}
            <p className="text-gray-700 text-lg"><strong>Wheel Width:</strong> {listing.wheel_width} inch</p>
            <p className="text-gray-700 text-lg"><strong>Wheel Diameter:</strong> {listing.wheel_diameter}</p>
            <p className="text-gray-700 text-lg"><strong>HP Output Range:</strong> {listing.hp_output_rang_title}</p>
            <p className="text-gray-700 text-lg"><strong>Exterior Cosmetic Upgrades:</strong> {listing.cosmetic_upgrade === '1' ? 'Yes' : 'No'}</p>
            {listing.cosmetic_upgrade === '1' && (
              <p className="text-gray-700 text-lg">
                <strong>Exterior Cosmetic Upgrades Detail:</strong> {listing.cosmetic_upgrade_text}
              </p>
            )}
            <p className="text-gray-700 text-lg"><strong>Vehicle Use:</strong> {listing.vehicle_use_title}</p>
            <p className="text-gray-700 text-lg"><strong>Interior Upgrades:</strong> {listing.interior_upgrade === '1' ? 'Yes' : 'No'}</p>
            {listing.interior_upgrade === '1' && (
              <p className="text-gray-700 text-lg">
                <strong>Interior Upgrades Detail:</strong> {listing.interior_upgrade_text}
              </p>
            )}
            <p className="text-gray-700 text-lg"><strong>Exterior (body) Upgrades:</strong> {listing.exterior_upgrade === '1' ? 'Yes' : 'No'}</p>
            {listing.exterior_upgrade === '1' && (
              <p className="text-gray-700 text-lg">
                <strong>Exterior (body) Upgrades Detail:</strong> {listing.exterior_upgrade_text}
              </p>
            )}
            <p className="text-gray-700 text-lg"><strong>Motor Upgrades:</strong> {listing.motor_upgrade === '1' ? 'Yes' : 'No'}</p>
            {listing.motor_upgrade === '1' && (
              <p className="text-gray-700 text-lg">
                <strong>Motor Upgrades Detail:</strong> {listing.motor_upgrade_text}
              </p>
            )}
            <p className="text-gray-700 text-lg"><strong>Documentation Type:</strong> {listing.documentation_type_title}</p>
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
                ? listing.vehicle_modification.map((mod, idx) => (
                    <Badge key={idx} variant="secondary">{mod}</Badge>
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
            <p className="text-gray-700 text-lg leading-relaxed">{listing.description}</p>
          </CardContent>
        </Card>
        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">You may also like</h2>
          {related_vehicle && related_vehicle.length > 0 && (
              <div className="relative">
                <Carousel opts={{ align: 'start', slidesToScroll: 1 }}>
                  <CarouselContent>
                    {Array.isArray(related_vehicle) && related_vehicle.map((relatedListing: Record<string, unknown>) => {
                      const obj = {
                        id: String(relatedListing.id ?? ''),
                        slug: String(relatedListing.slug ?? ''),
                        title: String(relatedListing.vehicle_title ?? ''),
                        price: Number(relatedListing.vehicle_price ?? 0),
                        vehicle_make: String(relatedListing.vehicle_make ?? ''),
                        model: String(relatedListing.vehicle_model ?? ''),
                        vehicle_year: String(relatedListing.vehicle_year ?? ''),
                        vehicle_primarily_used: String(relatedListing.vehicle_primarily_used ?? ''),
                        vehicle_stock_parts: String(relatedListing.vehicle_stock_parts ?? ''),
                        location: String(relatedListing.vehicle_owner_address ?? ''),
                        mileage: Number(relatedListing.vehicle_mileage ?? 0),
                        vehicle_modification: relatedListing.vehicle_modification as string[] ?? [],
                        image: String(relatedListing.image_url ?? '/default-image.jpg'),
                        mods: ["Built Engine", "Garrett Turbo", "Coilovers", "Wide Body Kit"],
                      };
                      return (
                        <CarouselItem key={obj.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                          <ListingCard listing={obj} />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingDetail;