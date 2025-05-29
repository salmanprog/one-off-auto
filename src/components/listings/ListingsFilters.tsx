
import React, { useState } from "react";
import { Filter, Search, ChevronDown, ChevronUp } from "lucide-react";

// Import the FilterState interface
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

interface ListingsFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

const ListingsFilters: React.FC<ListingsFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [standardFiltersOpen, setStandardFiltersOpen] = useState(true);
  const [modFiltersOpen, setModFiltersOpen] = useState(true);

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

      <div className={`${filtersOpen ? 'block' : 'hidden'} md:block`}>
        {/* Search and main filters */}
        <div className="mb-6 flex items-center border border-gray-300 rounded-md bg-white">
          <Search className="text-gray-400 ml-3" size={20} />
          <input
            type="text"
            placeholder="Search makes, models, or mods..."
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
            <h3 className="text-lg font-bold mb-2">Vehicle Details</h3>
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
                  <option value="">All Makes</option>
                  <option value="honda">Honda</option>
                  <option value="toyota">Toyota</option>
                  <option value="subaru">Subaru</option>
                  <option value="ford">Ford</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="bmw">BMW</option>
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
                  <option value="">All Models</option>
                  <option value="civic">Civic</option>
                  <option value="wrx">WRX</option>
                  <option value="mustang">Mustang</option>
                  <option value="m3">M3</option>
                </select>
              </div>

              {/* Year Range */}
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <div className="flex items-center space-x-2">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.yearFrom}
                    onChange={(e) => onFilterChange({ yearFrom: e.target.value })}
                  >
                    <option value="">From</option>
                    <option value="2020">2020</option>
                    <option value="2015">2015</option>
                    <option value="2010">2010</option>
                    <option value="2000">2000</option>
                    <option value="1990">1990</option>
                  </select>
                  <span>-</span>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.yearTo}
                    onChange={(e) => onFilterChange({ yearTo: e.target.value })}
                  >
                    <option value="">To</option>
                    <option value="2023">2023</option>
                    <option value="2020">2020</option>
                    <option value="2015">2015</option>
                    <option value="2010">2010</option>
                    <option value="2000">2000</option>
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-1">Price Range ($)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.priceMin}
                    onChange={(e) => onFilterChange({ priceMin: e.target.value })}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.priceMax}
                    onChange={(e) => onFilterChange({ priceMax: e.target.value })}
                  />
                </div>
              </div>

              {/* Mileage Range */}
              <div>
                <label className="block text-sm font-medium mb-1">Mileage</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.mileage}
                  onChange={(e) => onFilterChange({ mileage: e.target.value })}
                >
                  <option value="">Any Mileage</option>
                  <option value="25000">Under 25,000</option>
                  <option value="50000">Under 50,000</option>
                  <option value="100000">Under 100,000</option>
                  <option value="150000">Under 150,000</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Modification Filters */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setModFiltersOpen(!modFiltersOpen)}
          >
            <h3 className="text-lg font-bold mb-2">Modifications</h3>
            {modFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {modFiltersOpen && (
            <div className="space-y-4 mt-3">
              {/* Engine Mods */}
              <div>
                <label className="block text-sm font-medium mb-1">Engine Modifications</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.engineMods.includes('engine swap')}
                      onChange={(e) => {
                        const newEngineMods = e.target.checked
                          ? [...filters.engineMods, 'engine swap']
                          : filters.engineMods.filter(mod => mod !== 'engine swap');
                        onFilterChange({ engineMods: newEngineMods });
                      }}
                    />
                    <span>Engine Swap</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.engineMods.includes('turbo')}
                      onChange={(e) => {
                        const newEngineMods = e.target.checked
                          ? [...filters.engineMods, 'turbo']
                          : filters.engineMods.filter(mod => mod !== 'turbo');
                        onFilterChange({ engineMods: newEngineMods });
                      }}
                    />
                    <span>Turbo/Supercharger</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.engineMods.includes('tune')}
                      onChange={(e) => {
                        const newEngineMods = e.target.checked
                          ? [...filters.engineMods, 'tune']
                          : filters.engineMods.filter(mod => mod !== 'tune');
                        onFilterChange({ engineMods: newEngineMods });
                      }}
                    />
                    <span>ECU Tune</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.engineMods.includes('exhaust')}
                      onChange={(e) => {
                        const newEngineMods = e.target.checked
                          ? [...filters.engineMods, 'exhaust']
                          : filters.engineMods.filter(mod => mod !== 'exhaust');
                        onFilterChange({ engineMods: newEngineMods });
                      }}
                    />
                    <span>Exhaust System</span>
                  </label>
                </div>
              </div>

              {/* Suspension Mods */}
              <div>
                <label className="block text-sm font-medium mb-1">Suspension</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Coilovers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Air Suspension</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Lowering Springs</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Adjustable Control Arms</span>
                  </label>
                </div>
              </div>

              {/* Body Mods */}
              <div>
                <label className="block text-sm font-medium mb-1">Body Modifications</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Wide Body Kit</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Custom Paint</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Carbon Fiber Parts</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Wing/Spoiler</span>
                  </label>
                </div>
              </div>

              {/* Wheels & Tires */}
              <div>
                <label className="block text-sm font-medium mb-1">Wheels & Tires</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Aftermarket Wheels</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Performance Tires</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Custom Wheel Size</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Actions */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="w-full py-2 px-3 text-sm font-medium bg-oneoffautos-blue text-white rounded-md hover:bg-blue-800 transition-colors"
            onClick={() => {
              // Apply filters is automatic as we're using controlled components
              // This button is just for UX, we could add additional logic here if needed
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
