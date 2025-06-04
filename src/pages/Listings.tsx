import { useState, useMemo } from "react";
import MainLayout from "../components/layouts/MainLayout";
import ListingCard from "../components/listings/ListingCard";
import ListingsFilters from "../components/listings/ListingsFilters";
import { useFetch } from "../hooks/request";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust as needed

  const { data, loading, error } = useFetch("user_vehicle_list");

  const listings = useMemo(() => {
    if (!data) return [];

    // If data is an array, map it
    const vehicles = Array.isArray(data) ? data : [data];

    return vehicles.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.vehicle_title,
      price: item.vehicle_price,
      location: item.vehicle_owner_address,
      mileage: item.vehicle_mileage,
      image: item.image_url, // Optional chaining + fallback
      mods: ["Built Engine", "Garrett Turbo", "Coilovers", "Wide Body Kit"],
    }));
  }, [data]);

  const [sortOption, setSortOption] = useState("newest");

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
    wheelsMods: [],
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

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
      wheelsMods: [],
    });
  };

  const filteredAndSortedListings = useMemo(() => {
    let filtered = [...listings];

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchLower) ||
          listing.mods.some((mod) => mod.toLowerCase().includes(searchLower))
      );
    }

    if (filters.make) {
      filtered = filtered.filter((listing) =>
        listing.title.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.model) {
      filtered = filtered.filter((listing) =>
        listing.title.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    if (filters.priceMin) {
      filtered = filtered.filter(
        (listing) => listing.price >= parseInt(filters.priceMin)
      );
    }
    if (filters.priceMax) {
      filtered = filtered.filter(
        (listing) => listing.price <= parseInt(filters.priceMax)
      );
    }

    if (filters.mileage) {
      filtered = filtered.filter(
        (listing) => listing.mileage <= parseInt(filters.mileage)
      );
    }

    // Mods
    const modFilter = (modType: string[], category: string[]) =>
      modType.length === 0 || modType.some((mod) =>
        category.some((listingMod) =>
          listingMod.toLowerCase().includes(mod.toLowerCase())
        )
      );

    filtered = filtered.filter((listing) =>
      modFilter(filters.engineMods, listing.mods) &&
      modFilter(filters.suspensionMods, listing.mods) &&
      modFilter(filters.bodyMods, listing.mods) &&
      modFilter(filters.wheelsMods, listing.mods)
    );

    // Sort
    switch (sortOption) {
      case "price-asc":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-desc":
        return filtered.sort((a, b) => b.price - a.price);
      case "mileage-asc":
        return filtered.sort((a, b) => a.mileage - b.mileage);
      case "year-desc":
        return filtered; // Not available in this mock data
      case "newest":
      default:
        return filtered;
    }
  }, [filters, sortOption, listings]);

  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedListings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedListings, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const totalPages = Math.ceil(filteredAndSortedListings.length / itemsPerPage);
  // Show loading, error, or empty states
  if (loading) return <MainLayout><div className="p-8">Loading...</div></MainLayout>;
  if (error) return <MainLayout><div className="p-8 text-red-600">Error: {error.message}</div></MainLayout>;
  if (listings.length === 0) return <MainLayout><div className="p-8">No listings found.</div></MainLayout>;

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
                    Showing <span className="font-bold">{itemsPerPage}</span> results
                  </p>
                  <div className="flex items-center">
                    <span className="mr-2">Sort by:</span>
                    <select
                      className="border border-gray-300 rounded-md p-2"
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
              {paginatedListings.map((listing) => (
                  <ListingCard key={listing.slug} listing={listing} />
                ))}
              </div>
              {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-1">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white disabled:opacity-50"
                >
                  Previous
                </button>

                {/* You can dynamically render page buttons */}
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-4 py-2 border rounded-md ${
                        currentPage === pageNum
                          ? "border-oneoffautos-blue bg-oneoffautos-blue text-white"
                          : "border-gray-300 text-oneoffautos-blue bg-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md text-oneoffautos-blue bg-white disabled:opacity-50"
                >
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
