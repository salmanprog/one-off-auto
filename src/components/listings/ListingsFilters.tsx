import React, { useState } from "react";
import { Filter, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useFetch } from "../../hooks/request";

// Import the FilterState interface
interface FilterState {
  searchTerm: string;
  make: string;
  model: string;
  year: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  mileage: string;
  engineMods: string[];
  suspensionMods: string[];
  bodyMods: string[];
  wheelsMods: string[];
  exterior_color:string;
  interior_color:string;
  driver_type: string;
  motor_size_cylinders: string;
  transmition_types: string;
  fuel_types: string;
  seller_type: string;
  vehicle_status: string;
  suspension_size: string;
  suspension_type: string;
  wheel_width: string;
  wheelwidthMin:string;
  wheelwidthMax:string;
  wheelDiameterMin:string;
  wheelDiameterMax:string;
  wheel_diameter: string;
  hp_output_rang: string;
  vehicle_use: string;
  nearbyRadius: string;
  postal_code: string;
  chassis_reinforcement:string;
  audio_upgrade:string;
  cosmetic_upgrade:string;
  interior_upgrade:string;
  exterior_upgrade:string;
  motor_upgrade:string;
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
          listing.title.toLowerCase().includes(searchLower) 
          //listing.model.toLowerCase().includes(searchLower) ||
          //listing.mods.some((mod) => mod.toLowerCase().includes(searchLower))
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

  // Vehicle exterior_color
  if (filters.exterior_color) {
    filteredListings = filteredListings.filter(
      (listing) => listing.exterior_color === filters.exterior_color
    );
  }

  // Vehicle interior_color
  if (filters.interior_color) {
    filteredListings = filteredListings.filter(
      (listing) => listing.interior_color === filters.interior_color
    );
  }

  if (filters.suspension_size) {
    const suspensionSize = parseFloat(filters.suspension_size);
    filteredListings = filteredListings.filter((listing) => {
      const listingSuspension = parseFloat(listing.suspension_size);
      return !isNaN(listingSuspension) && listingSuspension >= suspensionSize;
    });
  }

  if (filters.wheelwidthMin) {
    const wheelwidthMin = parseInt(filters.wheelwidthMin, 10); // Convert to number
    filteredListings = filteredListings.filter(
      (listing) => parseInt(listing.price.replace(/[^0-9]/g, "")) >= wheelwidthMin // Remove non-numeric characters from listing price
    );
  }
  if (filters.wheelwidthMax) {
    const wheelwidthMax = parseInt(filters.wheelwidthMax, 10); // Convert to number
    filteredListings = filteredListings.filter(
      (listing) => parseInt(listing.price.replace(/[^0-9]/g, "")) <= wheelwidthMax // Remove non-numeric characters from listing price
    );
  }

  
  
  if (filters.nearbyMe && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        
        filteredListings = filteredListings.filter((listing) => {
          const distance = calculateDistance(
            userLat,
            userLon,
            parseFloat(listing.latitude), // Your listing's latitude
            parseFloat(listing.longitude) // Your listing's longitude
          );
          console.error("Location distance:", distance);
          return distance <= 50; // within 50 km
        });
      },
      (err) => {
        console.error("Location Error:", err.message);
      }
    );
  }
    return filteredListings;
  };

  // Apply filters to the listings data when the filter state changes
  const filteredListings = applyFilters();

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

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
              {/* Nearby Me Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Search Nearby Location ({filters.nearbyRadius || 0} miles)
              </label>
              <input
                type="range"
                min="0"
                max="200"
                step="1"
                value={filters.nearbyRadius || 0}
                onChange={(e) => onFilterChange({ nearbyRadius: e.target.value })}
                className="w-full"
              />
            </div>
            {/* Zipcode Me Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                ZipCode
              </label>
              <input
                    type="text"
                    placeholder="Zipcode"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.postal_code}
                    onChange={(e) => {
                        onFilterChange({ postal_code: e.target.value });
                    }}
                  />
            </div>
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
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.yearMin}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ yearMin: e.target.value });
                      }
                    }}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.yearMax}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ yearMax: e.target.value });
                      }
                    }}
                  />
                </div>
                {/* <select
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
                </select> */}
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

              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <div className="flex items-center space-x-2">
                    <input
                      name="exterior_color"
                      id="exterior_color"
                      type="text"
                      placeholder="Exterior"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={filters.exterior_color}
                      onChange={(e) => onFilterChange({ exterior_color: e.target.value })}
                    />
                  <span>-</span>
                    <input
                        name="interior_color"
                        id="interior_color"
                        type="text"
                        placeholder="Interior"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filters.interior_color}
                        onChange={(e) => onFilterChange({ interior_color: e.target.value })}
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
                <label className="block text-sm font-medium mb-1">Vehicle Title Status</label>
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

              {/* Mileage Filter (Single input) */}
              <div>
                <label className="block text-sm font-medium mb-1">Mileage</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.mileage}
                  onChange={(e) => onFilterChange({ mileage: e.target.value })}
                >
                  <option value="">Select Mileage</option>
                  <option value="">Any</option>
                  <option value="15000">15,000 or less</option>
                  <option value="30000">30,000 or less</option>
                  <option value="50000">50,000 or less</option>
                  <option value="75000">75,000 or less</option>
                  <option value="100000">100,000 or less</option>
                  <option value="100001">100,001 or more</option>
                </select>
              </div>
            {/* Chassis Reinforcement Filter */}
            <div>
                <label className="block text-sm font-medium mb-1">Chassis Reinforcement</label>
                <div className="flex items-center space-x-2">
                    <input
                      name="chassis_reinforcement"
                      id="chassis_reinforcement"
                      type="radio"
                      className="mr-2"
                      value="1"
                      onChange={(e) => onFilterChange({ chassis_reinforcement: e.target.value })}
                    />
                  <span>Yes</span>
                    <input
                        name="chassis_reinforcement"
                        id="chassis_reinforcement"
                        type="radio"
                        className="mr-2"
                        value="0"
                        onChange={(e) => onFilterChange({ chassis_reinforcement: e.target.value })}
                      />
                      <span>No</span>
                </div>
              </div>        
            {/* Audio Upgrades Filter */}
            <div>
                <label className="block text-sm font-medium mb-1">Audio Upgrades</label>
                <div className="flex items-center space-x-2">
                    <input
                      name="audio_upgrade"
                      id="audio_upgrade"
                      type="radio"
                      className="mr-2"
                      value="1"
                      onChange={(e) => onFilterChange({ audio_upgrade: e.target.value })}
                    />
                  <span>Yes</span>
                    <input
                        name="audio_upgrade"
                        id="audio_upgrade"
                        type="radio"
                        className="mr-2"
                        value="0"
                        onChange={(e) => onFilterChange({ audio_upgrade: e.target.value })}
                      />
                      <span>No</span>
                </div>
              </div>
            {/* Exterior Cosmetic Upgrades Filter */}
            <div>
                <label className="block text-sm font-medium mb-1">Exterior Cosmetic Upgrades</label>
                <div className="flex items-center space-x-2">
                    <input
                      name="cosmetic_upgrade"
                      id="cosmetic_upgrade"
                      type="radio"
                      className="mr-2"
                      value="1"
                      onChange={(e) => onFilterChange({ cosmetic_upgrade: e.target.value })}
                    />
                  <span>Yes</span>
                    <input
                        name="cosmetic_upgrade"
                        id="cosmetic_upgrade"
                        type="radio"
                        className="mr-2"
                        value="0"
                        onChange={(e) => onFilterChange({ cosmetic_upgrade: e.target.value })}
                      />
                      <span>No</span>
                </div>
              </div>  
            {/* Interior Upgrades Filter */}
            <div>
                <label className="block text-sm font-medium mb-1">Interior Upgrades</label>
                <div className="flex items-center space-x-2">
                    <input
                      name="interior_upgrade"
                      id="interior_upgrade"
                      type="radio"
                      className="mr-2"
                      value="1"
                      onChange={(e) => onFilterChange({ interior_upgrade: e.target.value })}
                    />
                  <span>Yes</span>
                    <input
                        name="interior_upgrade"
                        id="interior_upgrade"
                        type="radio"
                        className="mr-2"
                        value="0"
                        onChange={(e) => onFilterChange({ interior_upgrade: e.target.value })}
                      />
                      <span>No</span>
                </div>
              </div>        
            {/* Exterior (body) Upgrades Filter */}
            <div>
                <label className="block text-sm font-medium mb-1">Exterior (body) Upgrades</label>
                <div className="flex items-center space-x-2">
                    <input
                      name="exterior_upgrade"
                      id="exterior_upgrade"
                      type="radio"
                      className="mr-2"
                      value="1"
                      onChange={(e) => onFilterChange({ exterior_upgrade: e.target.value })}
                    />
                  <span>Yes</span>
                    <input
                        name="exterior_upgrade"
                        id="exterior_upgrade"
                        type="radio"
                        className="mr-2"
                        value="0"
                        onChange={(e) => onFilterChange({ exterior_upgrade: e.target.value })}
                      />
                      <span>No</span>
                </div>
              </div>        
            {/* Motor Upgrades Filter */}
            <div>
                <label className="block text-sm font-medium mb-1">Motor Upgrades</label>
                <div className="flex items-center space-x-2">
                    <input
                      name="motor_upgrade"
                      id="motor_upgrade"
                      type="radio"
                      className="mr-2"
                      value="1"
                      onChange={(e) => onFilterChange({ motor_upgrade: e.target.value })}
                    />
                  <span>Yes</span>
                    <input
                        name="motor_upgrade"
                        id="motor_upgrade"
                        type="radio"
                        className="mr-2"
                        value="0"
                        onChange={(e) => onFilterChange({ motor_upgrade: e.target.value })}
                      />
                      <span>No</span>
                </div>
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
              <label className="block text-sm font-medium mb-1">Suspension Size ({filters.suspension_size} Stock)</label>
              <input
                type="range"
                min={0}
                max={24}
                step={0.5}
                value={filters.suspension_size || 0}
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
            {/* <div>
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
            </div> */}

              <div>
                <label className="block text-sm font-medium mb-1">Wheel Width</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.wheelwidthMin}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ wheelwidthMin: e.target.value });
                      }
                    }}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.wheelwidthMax}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ wheelwidthMax: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>


            {/* Wheel Diameter Range Slider */}
            <div>
                <label className="block text-sm font-medium mb-1">Wheel Diameter</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.wheelDiameterMin}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ wheelDiameterMin: e.target.value });
                      }
                    }}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.wheelDiameterMax}
                    onChange={(e) => {
                      // Allow only numbers in the input
                      if (!e.target.value || /^[0-9]*$/.test(e.target.value)) {
                        onFilterChange({ wheelDiameterMax: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>
            {/* <div>
              <label className="block text-sm font-medium mb-1">Wheel Diameter ({filters.wheel_diameter} inches)</label>
              <input
                type="range"
                min={10}
                max={30}
                step={0.5}
                value={filters.wheel_diameter}
                onChange={(e) => onFilterChange({ wheel_diameter: e.target.value })}
                className="w-full"
              />
            </div> */}
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
