import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MainLayout from "../components/layouts/MainLayout"; // Import MainLayout

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
const dummyListing: DetailedListing = {
  id: '1',
  title: 'Modified 2018 Ford Mustang GT',
  price: 35000,
  location: 'Los Angeles, CA',
  mileage: 25000,
  image: '/product-img-1.avif', // Primary image from the listing data
  mods: ['Turbocharger Upgrade', ' الرياضيةSuspension Kit', 'Custom Exhaust'],
  description: 'This stunning 2018 Ford Mustang GT features a powerful turbocharger upgrade, a performance suspension kit for improved handling, and a custom exhaust system that provides an aggressive sound. Low mileage and well-maintained.',
  additionalImages: [
    '/product-img-2.avif', // Provided image 1
    '/product-img-1.avif', // Provided image 2 (using one provided path twice for demonstration)
  ],
};

// Placeholder for related listings - replace with actual fetching logic
const dummyRelatedListings = [
  {
    id: '2',
    title: 'Custom 1969 Chevrolet Camaro',
    price: 65000,
    location: 'Miami, FL',
    mileage: 10000,
    image: '/images/product-img-1.avif', // Placeholder image
    mods: ['Pro-Touring Build', 'LS Engine Swap'],
  },
  {
    id: '3',
    title: 'JDM Tuned 2005 Subaru WRX STI',
    price: 28000,
    location: 'Seattle, WA',
    mileage: 80000,
    image: '/images/product-img-2.avif', // Placeholder image
    mods: ['Forged Engine Internals', 'Big Turbo Kit'],
  },
  // Add more dummy listings as needed
];

const ListingDetail = () => {
  const { listingId } = useParams<{ listingId: string }>();

  // In a real application, you would fetch data based on listingId
  const listing = dummyListing; // Using dummy data for now

  const allImages = [listing.image, ...listing.additionalImages];
  const [mainImage, setMainImage] = useState(allImages[0]); // State for the main image

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

  if (!listing) {
    return <div>Loading or Listing not found...</div>;
  }

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
                  key={index}
                  src={img}
                  alt={`${listing.title} - Thumbnail ${index + 1}`}
                  className={`w-full h-auto object-cover rounded-lg shadow-md cursor-pointer ${img === mainImage ? 'ring-2 ring-blue-500' : ''}`} // Add active state styling
                  onClick={() => setMainImage(img)} // Click to change main image
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
                <p className="text-gray-700 text-lg"><strong>Location:</strong> {listing.location}</p>
                <p className="text-gray-700 text-lg"><strong>Mileage:</strong> {listing.mileage.toLocaleString()} miles</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {listing.mods.map((mod, index) => (
                    <Badge key={index} variant="secondary">{mod}</Badge>
                  ))}
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
            {/* Contact Seller Button */}
            <button className="btn-primary">Contact Seller</button>

          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
          {/* Placeholder for related product cards - replace with actual mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Related Listing Cards would go here, e.g., using the ListingCard component */}
             {/* {dummyRelatedListings.map(relatedListing => (
              <ListingCard key={relatedListing.id} listing={relatedListing} />
            ))} */}
             <div className="text-gray-600">Related products coming soon...</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingDetail;