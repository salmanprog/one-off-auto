
import { useState, useMemo } from "react";
import MainLayout from "../components/layouts/MainLayout";
import ListingCard from "../components/listings/ListingCard";
import ListingsFilters from "../components/listings/ListingsFilters";

// Mock data for listings
const mockListings = [
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
  {
    id: "4",
    title: "2014 Ford Mustang GT - 700+ HP",
    price: 32500,
    location: "Miami, FL",
    mileage: 56000,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5f452d1e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    mods: ["Supercharger", "Tune", "Exhaust", "Lowering Springs"]
  },
  {
    id: "5",
    title: "2011 BMW E92 M3 - Competition Package",
    price: 42900,
    location: "Los Angeles, CA",
    mileage: 61000,
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    mods: ["Competition Package", "KW Suspension", "Akrapovic Exhaust", "BBS Wheels"]
  },
  {
    id: "6",
    title: "2019 Toyota 86 - Widebody Show Car",
    price: 35800,
    location: "Chicago, IL",
    mileage: 28000,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    mods: ["Rocket Bunny Kit", "Air Suspension", "Custom Paint", "Forged Wheels"]
  },
];

// Define filter types
interface FilterState {
  searchTerm: string;
  make: string;
  model: string;
  yearFrom: string;
  yearTo: string;
  priceMin: string;
  priceMax: string;
  mileage: string;
  engineMods: string[];
  suspensionMods: string[];
  bodyMods: string[];
  wheelsMods: string[];
}

const Listings = () => {
  const [sortOption, setSortOption] = useState("newest");

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    priceMin: "",
    priceMax: "",
    mileage: "",
    engineMods: [],
    suspensionMods: [],
    bodyMods: [],
    wheelsMods: []
  });

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      make: "",
      model: "",
      yearFrom: "",
      yearTo: "",
      priceMin: "",
      priceMax: "",
      mileage: "",
      engineMods: [],
      suspensionMods: [],
      bodyMods: [],
      wheelsMods: []
    });
  };

  // Filter and sort listings
  const filteredAndSortedListings = useMemo(() => {
    // First filter the listings
    let filtered = [...mockListings];

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchLower) ||
        listing.mods.some(mod => mod.toLowerCase().includes(searchLower))
      );
    }

    // Make filter
    if (filters.make) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    // Model filter
    if (filters.model) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceMin) {
      filtered = filtered.filter(listing =>
        listing.price >= parseInt(filters.priceMin)
      );
    }
    if (filters.priceMax) {
      filtered = filtered.filter(listing =>
        listing.price <= parseInt(filters.priceMax)
      );
    }

    // Mileage filter
    if (filters.mileage) {
      filtered = filtered.filter(listing =>
        listing.mileage <= parseInt(filters.mileage)
      );
    }

    // Engine mods filter
    if (filters.engineMods.length > 0) {
      filtered = filtered.filter(listing =>
        filters.engineMods.some(mod =>
          listing.mods.some(listingMod =>
            listingMod.toLowerCase().includes(mod.toLowerCase())
          )
        )
      );
    }

    // Suspension mods filter
    if (filters.suspensionMods.length > 0) {
      filtered = filtered.filter(listing =>
        filters.suspensionMods.some(mod =>
          listing.mods.some(listingMod =>
            listingMod.toLowerCase().includes(mod.toLowerCase())
          )
        )
      );
    }

    // Body mods filter
    if (filters.bodyMods.length > 0) {
      filtered = filtered.filter(listing =>
        filters.bodyMods.some(mod =>
          listing.mods.some(listingMod =>
            listingMod.toLowerCase().includes(mod.toLowerCase())
          )
        )
      );
    }

    // Wheels mods filter
    if (filters.wheelsMods.length > 0) {
      filtered = filtered.filter(listing =>
        filters.wheelsMods.some(mod =>
          listing.mods.some(listingMod =>
            listingMod.toLowerCase().includes(mod.toLowerCase())
          )
        )
      );
    }

    // Then sort the filtered listings
    switch (sortOption) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "mileage-asc":
        return filtered.sort((a, b) => a.mileage - b.mileage);
      case "year-desc":
        // For this mock data, we don't have year as a separate field
        // In a real app, you would sort by year
        return filtered;
      case "newest":
      default:
        // For mock data, we'll just return as is
        // In a real app, you would sort by date added
        return filtered;
    }
  }, [filters, sortOption]);

  return (
    <MainLayout>
      <div className="bg-oneoffautos-lightgray">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold mb-2">Vehicle Listings</h1>
          <p className="text-gray-600 mb-6">Browse our curated selection of modified vehicles.</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ListingsFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-600 mb-2 sm:mb-0">
                    Showing <span className="font-bold">{filteredAndSortedListings.length}</span> results
                  </p>
                  <div className="flex items-center">
                    <span className="mr-2">Sort by:</span>
                    <select
                      className="border border-gray-300 rounded-md p-2 cursor-pointer hover:border-oneoffautos-blue focus:border-oneoffautos-blue focus:outline-none transition-colors"
                      value={sortOption}
                      onChange={handleSortChange}
                    >
                      <option value="newest">Newest Listings</option>
                      <option value="price-asc">Price (Low to High)</option>
                      <option value="price-desc">Price (High to Low)</option>
                      <option value="mileage-asc">Mileage (Low to High)</option>
                      <option value="year-desc">Year (Newest First)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-1">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white">
                    Previous
                  </button>
                  <button className="px-4 py-2 border border-oneoffautos-blue rounded-md bg-oneoffautos-blue text-white">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Listings;
