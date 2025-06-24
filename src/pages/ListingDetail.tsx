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
// Assuming a more detailed listing structure might exist or be fetched
interface DetailedListing {
  id: string;
  title: string;
  price: number;
  location: string;
  mileage: number;
  image: string;
  mods: string[];
  description: string; // Added description field
  additionalImages: string[]; // Added for additional images
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
  const {data:related_vehicle} = useFetch("get_related_vehicle", "mount", listingId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const authUser = Helper.getStorageData("session");
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

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery with Slider Overlay */}
          <div className="space-y-4">
            {/* Main Image Container with Overlay Buttons */}
            <div className="relative rounded-lg shadow-md overflow-hidden aspect-square">
              <img
                src={mainImage}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay Buttons */}
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                onClick={handlePreviousClick}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                onClick={handleNextClick}
              >
                <ChevronRight size={24} />
              </button>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
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

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-[32px] md:leading-[1] font-bold text-gray-900 mb-8">{listing.title}</h1>
            <Card>
              <CardHeader>
                <CardTitle>Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-gray-800">${listing.price.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
              <p className="text-gray-700 text-lg"><strong>Vehicle   Make:</strong> {listing.vehicle_make}</p>
              <p className="text-gray-700 text-lg"><strong>Vehicle Model:</strong> {listing.vehicle_model}</p>
              <p className="text-gray-700 text-lg"><strong>Vehicle Year:</strong> {listing.vehicle_year}</p>
              <p className="text-gray-700 text-lg"><strong>Primarily Used:</strong> {listing.vehicle_primarily_used}</p>
              <p className="text-gray-700 text-lg"><strong>Stock Parts:</strong> {listing.vehicle_primarily_used ? listing.vehicle_primarily_used.replace(/_/g, " ") : "N/A"}</p>
                <p className="text-gray-700 text-lg"><strong>Location:</strong> {listing.location}</p>
                <p className="text-gray-700 text-lg"><strong>Mileage:</strong> {listing.mileage.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                {listing.vehicle_modification}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">{listing.description}</p>
              </CardContent>
            </Card>

            {/* Add more details or a contact form here */}
            {/* Contact Seller Button with Chat Pop-up */}
            {authUser && listing?.user_id != authUser.id &&(
            <Dialog open={isDialogOpen}
                    onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (open) {
                        const fd = new FormData();
                        fd.append("is_online", '1');
                        fd.append("reciever_id", listing?.user_id);
                        fd.append("sender_id", authUser.id);
                        const callback = (receivedData: any) => {
                          
                        };
                        postData(fd, callback);
                      } else {
                        const fd = new FormData();
                        fd.append("is_online", '0');
                        fd.append("reciever_id", listing?.user_id);
                        fd.append("sender_id", authUser.id);
                        const callback = (receivedData: any) => {
                          window.location.reload();
                        };
                        postData(fd, callback);
                      }
                    }}>
              
              <DialogTrigger asChild>
                <button className="btn-primary">Contact Seller</button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <UserMessages hideSidebar={true} listing={listing}/>
              </DialogContent>
            </Dialog>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
          {related_vehicle && related_vehicle.length > 0 && (
              <div className="relative">
                <Carousel opts={{ align: 'start', slidesToScroll: 1 }}>
                  <CarouselContent>
                    {related_vehicle.map((relatedListing: any) => {
                      const obj = {
                        id: relatedListing.id,
                        slug: relatedListing.slug,
                        title: relatedListing.vehicle_title,
                        price: relatedListing.vehicle_price,
                        vehicle_make: relatedListing.vehicle_make,
                        model: relatedListing.vehicle_model,
                        vehicle_year: relatedListing.vehicle_year,
                        vehicle_primarily_used: relatedListing.vehicle_primarily_used,
                        vehicle_stock_parts: relatedListing.vehicle_stock_parts,
                        location: relatedListing.vehicle_owner_address,
                        mileage: relatedListing.vehicle_mileage,
                        vehicle_modification: relatedListing.vehicle_modification,
                        image: relatedListing.image_url || '/default-image.jpg', // Fallback to default if not available
                        mods: ["Built Engine", "Garrett Turbo", "Coilovers", "Wide Body Kit"], // Sample mods, you can adjust this
                      };
                      return (
                        <CarouselItem key={relatedListing.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
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