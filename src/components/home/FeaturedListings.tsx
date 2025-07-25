import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../listings/ListingCard";
import { useFetch } from "../../hooks/request";
import HttpRequest from "../../repositories";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import Helper from "../../helpers";

const FeaturedListings = () => {
  const { data, loading, error } = useFetch("user_vehicle_list", "mount", "?limit=3");

  const listings = useMemo(() => {
    if (!data) return [];

    const vehicles = Array.isArray(data) ? data : [data];

    return vehicles.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.vehicle_title,
      price: item.vehicle_price,
      location: item.vehicle_owner_address,
      mileage: item.vehicle_mileage,
      vehicle_primarily_used: item.vehicle_primarily_used,
      vehicle_stock_parts: item.vehicle_stock_parts,
      image: item.image_url,
      is_favourite: item.is_favourite,
      mods: item.mods || ["Built Engine", "Garrett Turbo", "Coilovers"], // Fallback if API has no mods
    }));
  }, [data]);

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

        {/* Handle loading, error, empty */}
        {loading ? (
          <div className="text-gray-500">Loading featured vehicles...</div>
        ) : error ? (
          <div className="text-red-600">Error: {error.message}</div>
        ) : listings.length === 0 ? (
          <div className="text-gray-500">No featured listings found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
