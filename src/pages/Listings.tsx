import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import ListingCard from "../components/listings/ListingCard";
import ListingsFilters from "../components/listings/ListingsFilters";
import { useFetch } from "../hooks/request";

// Define filter types
interface FilterState {
  searchTerm: string;
  make: string;
  model: string;
  year: string;
  priceMin: string;
  priceMax: string;
  mileage: string;
  engineMods: string[];
  suspensionMods: string[];
  bodyMods: string[];
  wheelsMods: string[];
}

const Listings = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust as needed

  const { data, loading, error } = useFetch("user_vehicle_list", "mount", '?limit=5000');

  const listings = useMemo(() => {
    if (!data) return [];
    const vehicles = Array.isArray(data) ? data : [data];
    return vehicles.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.vehicle_title,
      price: item.vehicle_price,
      vehicle_make: item.vehicle_make,
      model: item.vehicle_model,
      year: item.vehicle_year,
      vehicle_primarily_used: item.vehicle_primarily_used,
      vehicle_stock_parts: item.vehicle_stock_parts,
      location: item.vehicle_owner_address,
      mileage: item.vehicle_mileage,
      vehicle_modification: item.vehicle_modification,
      image: item.image_url, // Optional chaining + fallback
      mods: ["Built Engine", "Garrett Turbo", "Coilovers", "Wide Body Kit"],
    }));
  }, [data]);

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    make: "",
    model: "",
    year: "",
    priceMin: "",
    priceMax: "",
    mileage: "",
    engineMods: [],
    suspensionMods: [],
    bodyMods: [],
    wheelsMods: [],
  });

  // Step 1: Read query parameters
  useEffect(() => {
    const params = new URLSearchParams(search);
    const queryFilters: FilterState = {
      searchTerm: params.get("searchTerm") || "",
      make: params.get("make") || "",
      model: params.get("model") || "",
      year: params.get("year") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
      mileage: params.get("mileage") || "",
      engineMods: params.get("engineMods")?.split(",") || [],
      suspensionMods: params.get("suspensionMods")?.split(",") || [],
      bodyMods: params.get("bodyMods")?.split(",") || [],
      wheelsMods: params.get("wheelsMods")?.split(",") || [],
    };
    setFilters(queryFilters);
  }, [search]);

  // Step 2: Update query params when filters change
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Update URL query parameters based on the new filters
    const params = new URLSearchParams(updatedFilters as any);
    navigate(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      make: "",
      model: "",
      year: "",
      priceMin: "",
      priceMax: "",
      mileage: "",
      engineMods: [],
      suspensionMods: [],
      bodyMods: [],
      wheelsMods: [],
    });

    // Reset the query params in the URL
    navigate("/listings");
  };

  const filteredAndSortedListings = useMemo(() => {
    let filtered = [...listings];

    // Apply filters only if they are provided
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
        listing.vehicle_make.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.model) {
      filtered = filtered.filter((listing) =>
        listing.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }
    
    if(filters.year){
      filtered = filtered.filter(
        (listing) => parseInt(listing.year) == parseInt(filters.year)
      );
    }

    if (filters.priceMin) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.price) >= parseInt(filters.priceMin)
      );
    }
    if (filters.priceMax) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.price) <= parseInt(filters.priceMax)
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

    return filtered;
  }, [filters, listings]);

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

  if (loading) return <MainLayout><div className="p-8 text-center">Loading...</div></MainLayout>;
  if (error) return <MainLayout><div className="p-8 text-red-600 text-center">Error: {error.message}</div></MainLayout>;
  if (!loading && listings.length === 0) return <MainLayout><div className="p-8 text-center">No listings found.</div></MainLayout>;

  return (
    <MainLayout>
      <div className="bg-oneoffautos-lightgray">
        <div className="container-custom py-8" id="#listings">
          <h1 className="text-3xl font-bold mb-2">Vehicle Listings</h1>
          <p className="text-gray-600 mb-6">Browse our curated selection of modified vehicles.</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ListingsFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
                listings={listings}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-600 mb-2 sm:mb-0">
                    Showing <span className="font-bold">{filteredAndSortedListings.length}</span> results
                  </p>
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
