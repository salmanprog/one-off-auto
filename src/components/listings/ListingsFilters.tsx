import React, { useState } from "react";
import { Filter, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useFetch } from "../../hooks/request";

// Import the FilterState interface
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

  driver_type: string;
  motor_size_cylinders: string;
  transmition_types: string;
  fuel_types: string;
  seller_type: string;
  vehicle_status: string;
  suspension_size: string;
  suspension_type: string;
  wheel_width: string;
  wheel_diameter: string;
  hp_output_rang: string;
  vehicle_use: string;
}

interface ListingsFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  listings: any[]; // Make sure listings is an array here
}

const ListingsFilters: React.FC<ListingsFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  listings = [] // Default empty array if listings are undefined
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [standardFiltersOpen, setStandardFiltersOpen] = useState(true);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const { data: vehicleMakes, loading, error } = useFetch("get_vehicle_make_list", "mount", '?limit=5000');
  const { data: vehicleModel } = useFetch("get_vehicle_model_list", "mount", '?limit=5000');
  const { data: vehicleYear } = useFetch("get_vehicle_year_list", "mount", '?limit=5000');
  const { data:vehicle_driver_type } = useFetch("vehicle_driver_type", "mount", '?limit=5000');
  const { data:vehicle_motor_size } = useFetch("vehicle_motor_size", "mount", '?limit=5000');
  const { data:vehicle_transmission_type } = useFetch("vehicle_transmission_type", "mount", '?limit=5000');
  const { data:vehicle_fuel_type } = useFetch("vehicle_fuel_type", "mount", '?limit=5000');
  const { data:vehicle_seller_type } = useFetch("vehicle_seller_type", "mount", '?limit=5000');
  const { data:vehicle_statues } = useFetch("vehicle_statues", "mount", '?limit=5000');
  const { data:vehicle_suspension_type } = useFetch("vehicle_suspension_type", "mount", '?limit=5000');
  const { data:vehicle_hp_output } = useFetch("vehicle_hp_output", "mount", '?limit=5000');
  const { data:vehicle_uses } = useFetch("vehicle_uses", "mount", '?limit=5000');
  const { data:vehicle_documentation_type } = useFetch("vehicle_documentation_type", "mount", '?limit=5000');

  if (loading) return <div>Loading makes...</div>;
  if (error) return <div>Error loading makes: {error.message}</div>;

  // Function to apply filters to the listings data
  const applyFilters = () => {
    let filteredListings = [...listings]; // Start with all listings
  
    // Search Term Filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchLower) ||
          listing.model.toLowerCase().includes(searchLower) ||
          listing.mods.some((mod) => mod.toLowerCase().includes(searchLower))
      );
    }
  
    // Make Filter
    if (filters.make) {
      filteredListings = filteredListings.filter(
        (listing) => parseInt(listing.vehicle_make) == parseInt(filters.make)
      );
    }
  
    // Model Filter
    if (filters.model) {
      filteredListings = filteredListings.filter(
        (listing) => parseInt(listing.model) == parseInt(filters.model)
      );
    }
  
    // Year Filter (Single input)
    if (filters.year) {
      const year = parseInt(filters.year, 10); // Convert to number
     
      filteredListings = filteredListings.filter((listing) => {
        const listingYear = parseInt(listing.vehicle_year, 10); // Convert vehicle year to number
        return !isNaN(listingYear) && listingYear === year; // Filter based on exact year match
      });
    }
  
    // Price Range Filter
    if (filters.priceMin) {
      const priceMin = parseInt(filters.priceMin, 10); // Convert to number
      filteredListings = filteredListings.filter(
        (listing) => parseInt(listing.price.replace(/[^0-9]/g, "")) >= priceMin // Remove non-numeric characters from listing price
      );
    }
    if (filters.priceMax) {
      const priceMax = parseInt(filters.priceMax, 10); // Convert to number
      filteredListings = filteredListings.filter(
        (listing) => parseInt(listing.price.replace(/[^0-9]/g, "")) <= priceMax // Remove non-numeric characters from listing price
      );
    }

    // Drive Type
  if (filters.driver_type) {
    filteredListings = filteredListings.filter(
      (listing) => listing.driver_type === filters.driver_type
    );
  }

  // Motor Size
  if (filters.motor_size_cylinders) {
    filteredListings = filteredListings.filter(
      (listing) => listing.motor_size_cylinders === filters.motor_size_cylinders
    );
  }

  // Transmission Type
  if (filters.transmition_types) {
    filteredListings = filteredListings.filter(
      (listing) => listing.transmition_types === filters.transmition_types
    );
  }

  // Fuel Type
  if (filters.fuel_types) {
    filteredListings = filteredListings.filter(
      (listing) => listing.fuel_types === filters.fuel_types
    );
  }

  // Seller Type
  if (filters.seller_type) {
    filteredListings = filteredListings.filter(
      (listing) => listing.seller_type === filters.seller_type
    );
  }

  // Vehicle Status
  if (filters.vehicle_status) {
    filteredListings = filteredListings.filter(
      (listing) => listing.vehicle_status === filters.vehicle_status
    );
  }

  if (filters.suspension_size) {
    const suspensionSize = parseFloat(filters.suspension_size);
    filteredListings = filteredListings.filter((listing) => {
      const listingSuspension = parseFloat(listing.suspension_size);
      return !isNaN(listingSuspension) && listingSuspension >= suspensionSize;
    });
  }
  
    return filteredListings;
  };

  // Apply filters to the listings data when the filter state changes
  const filteredListings = applyFilters();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      {/* Mobile Toggle */}
      <button
        className="md:hidden w-full flex items-center justify-between p-2 border border-gray-200 rounded-md mb-4"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        <div className="flex items-center">
          <Filter size={18} className="mr-2" />
          <span className="font-medium">Filters</span>
        </div>
        {filtersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div className={`${filtersOpen ? "block" : "hidden"} md:block`}>
        {/* Search and main filters */}
        <div className="mb-6 flex items-center border border-gray-300 rounded-md bg-white">
          <Search className="text-gray-400 ml-3" size={20} />
          <input
            type="text"
            placeholder="Search by title"
            className="w-full p-3 border-none focus:outline-none"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
          />
        </div>

        {/* Standard Vehicle Filters */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setStandardFiltersOpen(!standardFiltersOpen)}
          >
            <h3 className="text-lg font-bold mb-2">Basic Search</h3>
            {standardFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {standardFiltersOpen && (
            <div className="space-y-4 mt-3">
              {/* Make Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Make</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.make}
                  onChange={(e) => onFilterChange({ make: e.target.value })}
                >
                  <option value="">Select Make</option>
                  {vehicleMakes &&
                    vehicleMakes.map((make: { id: string; title: string }) => (
                      <option key={make.id} value={make.id}>
                        {make.title}
                      </option>
                    ))}
                </select>
              </div>

              {/* Model Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Model</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.model}
                  onChange={(e) => onFilterChange({ model: e.target.value })}
                >
                  <option value="">Select Model</option>
                  {vehicleModel &&
                    vehicleModel.map((model: { id: string; title: string }) => (
                      <option key={model.id} value={model.id}>
                        {model.title}
                      </option>
                    ))}
                </select>
              </div>

              {/* Year Filter (Single input) */}
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.year}
                  onChange={(e) => onFilterChange({ year: e.target.value })}
                >
                  <option value="">Select Year</option>
                  {vehicleYear &&
                    vehicleYear.map((year: { id: string; title: string }) => (
                      <option key={year.id} value={year.id}>
                        {year.title}
                      </option>
                    ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Price Range ($)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.priceMin}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ priceMin: e.target.value });
                      }
                    }}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.priceMax}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ priceMax: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>
            
            {/* Drive Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Drive Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.driver_type}
                  onChange={(e) => onFilterChange({ driver_type: e.target.value })}
                >
                  <option value="">Select Drive Type</option>
                  {vehicle_driver_type &&
                    vehicle_driver_type.map((driver_type: { id: string; title: string }) => (
                      <option key={driver_type.id} value={driver_type.id}>
                        {driver_type.title}
                      </option>
                    ))}
                </select>
              </div>
              {/* Motor Size Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Motor Size</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.motor_size_cylinders}
                  onChange={(e) => onFilterChange({ motor_size_cylinders: e.target.value })}
                >
                  <option value="">Select Motor Size</option>
                  {vehicle_motor_size &&
                    vehicle_motor_size.map((item: { id: string; title: string }) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
              </div>

              {/* Transmission Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Transmission Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.transmition_types}
                  onChange={(e) => onFilterChange({ transmition_types: e.target.value })}
                >
                  <option value="">Select Transmission Type</option>
                  {vehicle_transmission_type &&
                    vehicle_transmission_type.map((item: { id: string; title: string }) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.fuel_types}
                  onChange={(e) => onFilterChange({ fuel_types: e.target.value })}
                >
                  <option value="">Select Fuel Type</option>
                  {vehicle_fuel_type &&
                    vehicle_fuel_type.map((item: { id: string; title: string }) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
              </div>

              {/* Seller Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Seller Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.seller_type}
                  onChange={(e) => onFilterChange({ seller_type: e.target.value })}
                >
                  <option value="">Select Seller Type</option>
                  {vehicle_seller_type &&
                    vehicle_seller_type.map((item: { id: string; title: string }) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
              </div>

              {/* Vehicle Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Status</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.vehicle_status}
                  onChange={(e) => onFilterChange({ vehicle_status: e.target.value })}
                >
                  <option value="">Select Vehicle Status</option>
                  {vehicle_statues &&
                    vehicle_statues.map((item: { id: string; title: string }) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between cursor-pointer">
          <h3 className="text-lg font-bold mb-2">Advanced Search</h3>
          {advancedFiltersOpen ? (
            <ChevronUp size={18} onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)} />
          ) : (
            <ChevronDown size={18} onClick={() => setAdvancedFiltersOpen(!advancedFiltersOpen)} />
          )}
        </div> 
        {advancedFiltersOpen && (
          <div className="space-y-4 mt-3">
            {/* Suspension Size Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Suspension Size ({filters.suspension_size} inches)</label>
              <input
                type="range"
                min={-8}
                max={24}
                step={0.5}
                value={filters.suspension_size}
                onChange={(e) => onFilterChange({ suspension_size: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Suspension Type Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Suspension Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.suspension_type}
                onChange={(e) => onFilterChange({ suspension_type: e.target.value })}
              >
                <option value="">Select Suspension Type</option>
                {vehicle_suspension_type &&
                  vehicle_suspension_type.map((item: { id: string; title: string }) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
              </select>
            </div>
            {/* Wheel Width Range Slider */}
            <div>
              <label className="block text-sm font-medium mb-1">Wheel Width ({filters.wheel_width} inches)</label>
              <input
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={filters.wheel_width}
                onChange={(e) => onFilterChange({ wheel_width: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Wheel Diameter Range Slider */}
            <div>
              <label className="block text-sm font-medium mb-1">Wheel Diameter ({filters.wheel_diameter} inches)</label>
              <input
                type="range"
                min={10}
                max={24}
                step={0.5}
                value={filters.wheel_diameter}
                onChange={(e) => onFilterChange({ wheel_diameter: e.target.value })}
                className="w-full"
              />
            </div>
            {/* HP Output Range Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">HP Output Range</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.hp_output_rang}
                onChange={(e) => onFilterChange({ hp_output_rang: e.target.value })}
              >
                <option value="">Select HP Output Range</option>
                {vehicle_hp_output &&
                  vehicle_hp_output.map((item: { id: string; title: string }) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
              </select>
            </div>

            {/* Vehicle Use Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Use</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.vehicle_use}
                onChange={(e) => onFilterChange({ vehicle_use: e.target.value })}
              >
                <option value="">Select Vehicle Use</option>
                {vehicle_uses &&
                  vehicle_uses.map((item: { id: string; title: string }) => (
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
              </select>
            </div>
          </div>
          
        )}
        {/* Filter Actions */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="w-full py-2 px-3 text-sm font-medium bg-oneoffautos-blue text-white rounded-md hover:bg-blue-800 transition-colors"
            onClick={() => {
              setFiltersOpen(false);
            }}
          >
            Apply Filters
          </button>
          <button
            className="w-full py-2 px-3 text-sm font-medium bg-oneoffautos-red text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={() => {
              onResetFilters();
              setFiltersOpen(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingsFilters;
