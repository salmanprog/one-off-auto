
import React from "react";
import { Link } from "react-router-dom";
import ListingCard from "../listings/ListingCard";

// Mock data for featured listings
const featuredListings = [
  {
    id: "1",
    title: "Mercedes - Modified",
    price: 28500,
    location: "Denver, CO",
    mileage: 45000,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    mods: ["Built Engine", "Garrett Turbo", "Coilovers", "Wide Body Kit"]
  },
  {
    id: "2",
    title: "Ford Mustang - Modified",
    price: 24999,
    location: "Austin, TX",
    mileage: 78000,
    image: "https://images.unsplash.com/photo-1581650107963-3e8c1f48241b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
    mods: ["LS1 V8 Swap", "Custom Exhaust", "Roll Bar", "Wide Fenders"]
  },
  {
    id: "3",
    title: "Mercedes - Track Ready",
    price: 36750,
    location: "Portland, OR",
    mileage: 32000,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    mods: ["FMIC", "Hondata Tune", "Ohlins Coilovers", "Carbon Fiber"]
  },
];

const FeaturedListings = () => {
  return (
    <section className="py-16 bg-oneoffautos-lightgray">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Rides</h2>
          <Link 
            to="/listings" 
            className="text-oneoffautos-blue hover:text-oneoffautos-red font-semibold flex items-center"
          >
            View All Listings
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
