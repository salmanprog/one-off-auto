import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import ListingCard from "../components/listings/ListingCard";
import ListingsFilters from "../components/listings/ListingsFilters";
import { useFetch } from "../hooks/request";
import Helper from "../helpers";
import FAQs from "../components/faqs/Index";
import { Helmet } from "react-helmet-async";

// Define filter types
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
  driver_type: string;
  driver_title: string;
  motor_size_cylinders: string;
  motor_size_title: string;
  transmition_types: string;
  transmition_types_title: string;
  fuel_types: string;
  fuel_types_title: string;
  number_of_doors: string;
  exterior_color: string;
  interior_color: string;
  seller_type: string;
  seller_type_title: string;
  vehicle_status: string;
  vehicle_status_title: string;
  suspension_size: string;
  suspension_type: string;
  suspension_type_title: string;
  chassis_reinforcement: string;
  chassis_reinforcement_text: string;
  audio_upgrade: string;
  audio_upgrade_text: string;
  wheel_width: string;
  wheelwidthMin: string;
  wheelwidthMax: string;
  wheel_diameter: string;
  wheelDiameterMin: string;
  wheelDiameterMax: string;
  hp_output_rang: string;
  hp_output_rang_title: string;
  cosmetic_upgrade: string;
  cosmetic_upgrade_text: string;
  vehicle_use: string;
  vehicle_use_title: string;
  interior_upgrade: string;
  interior_upgrade_text: string;
  exterior_upgrade: string;
  exterior_upgrade_text: string;
  motor_upgrade: string;
  motor_upgrade_text: string;
  documentation_type: string;
  documentation_type_title: string;
  nearbyRadius: string;
  postal_code: string;
}

const Listings = () => {
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "List Your Car For Sale",
    "image": "",
    "description": "List your car for sale online and reach real buyers fast. Showcase your modified or custom ride to enthusiasts looking to buy unique street cars.",
    "brand": {
      "@type": "Brand",
      "name": "One Off Autos"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "348"
    }
  };

  const faqs = [
    {
      question: "1. What’s the best place to list your car for sale online?",
      answer: "The best place to list your car for sale online, especially if it's a customized project, is One Off Autos. Our specialized platform targets enthusiasts who appreciate unique vehicles and offers a better chance of getting a decent price."
    },
    {
      question: "2. How do I list my car for sale online quickly and safely?",
      answer: "At One Off Autos, we only accept listings with high-quality photos and a detailed description of the modifications made to the car. To avoid scams, use our platform for secure communication and experience a swift buying and selling process."
    },
    {
      question: "3 Are there any fees for listing a car for sale online?",
      answer: "Listing fees vary by platform. At One Off Autos, we currently don’t charge a fee for listing your modified car for sale online. We also believe in transparent pricing. Commissions details are mentioned before you post your listing. Our goal is to make the signup process easy for you, without hidden charges."
    },
    {
      question: "4 How can I increase the chances of selling my car when I list it online?",
      answer: "Research the market to set a competitive price, then post high-quality photos and be transparent about your car's condition and modifications. Emphasize what makes your vehicle unique, respond promptly to inquiries, and share your listing on social media for added visibility. Always use our platform for communication to avoid scams."
    },
  ];
  const navigate = useNavigate();
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust as needed
  const isAuthenticated = !!localStorage.getItem("session");
  const authUser = Helper.getStorageData("session");
  let user_id = 0
  if (isAuthenticated) {
    user_id = authUser.id
  }
  const { data, loading, error } = useFetch("user_vehicle_list", "mount", '?user_id=' + user_id + '&limit=5000');
  const [finalListings, setFinalListings] = useState([]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filterNearbyListings = async (listings, radiusKm) => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            const filtered = listings.filter((listing) => {
              const distance = calculateDistance(
                userLat,
                userLon,
                parseFloat(listing.latitude),
                parseFloat(listing.longitude)
              );
              return distance <= radiusKm;
            });

            resolve(filtered);
          },
          () => {
            resolve(listings); // fallback
          }
        );
      } else {
        resolve(listings);
      }
    });
  };
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
      year_title: item.vehicle_year_obj.title,
      vehicle_primarily_used: item.vehicle_primarily_used,
      vehicle_stock_parts: item.vehicle_stock_parts,
      location: item.vehicle_owner_address,
      mileage: item.vehicle_mileage,
      vehicle_modification: item.vehicle_modification,
      driver_type: item.driver_type,
      driver_title: item.driver_type_obj.title,
      motor_size_cylinders: item.motor_size_cylinders,
      motor_size_title: item.motor_size_cylinders_obj.title,
      transmition_types: item.transmition_types,
      transmition_types_title: item.transmition_types_obj.title,
      fuel_types: item.fuel_types,
      fuel_types_title: item.fuel_types_obj.title,
      number_of_doors: item.number_of_doors,
      exterior_color: item.exterior_color,
      interior_color: item.interior_color,
      seller_type: item.seller_type,
      seller_type_title: item.seller_type_obj.title,
      vehicle_status: item.vehicle_status,
      vehicle_status_title: item.vehicle_status_obj.title,
      suspension_size: item.suspension_size,
      suspension_type: item.suspension_type,
      suspension_type_title: item.suspension_type_obj.title,
      chassis_reinforcement: item.chassis_reinforcement,
      chassis_reinforcement_text: item.chassis_reinforcement_text,
      audio_upgrade: item.audio_upgrade,
      audio_upgrade_text: item.audio_upgrade_text,
      wheel_width: item.wheel_width,
      wheel_diameter: item.wheel_diameter,
      hp_output_rang: item.hp_output_rang,
      hp_output_rang_title: item.hp_output_rang_obj.title,
      cosmetic_upgrade: item.cosmetic_upgrade,
      cosmetic_upgrade_text: item.cosmetic_upgrade_text,
      vehicle_use: item.vehicle_use,
      vehicle_use_title: item.vehicle_use_obj.title,
      interior_upgrade: item.interior_upgrade,
      interior_upgrade_text: item.interior_upgrade_text,
      exterior_upgrade: item.exterior_upgrade,
      exterior_upgrade_text: item.exterior_upgrade_text,
      motor_upgrade: item.motor_upgrade,
      motor_upgrade_text: item.motor_upgrade_text,
      documentation_type: item.documentation_type,
      latitude: item.latitude,
      longitude: item.longitude,
      postal_code: item.postal_code,
      is_favourite: item.is_favourite,
      documentation_type_title: item.documentation_type_obj.title,
      image: item.image_url, // Optional chaining + fallback
      mods: ["Built Engine", "Garrett Turbo", "Coilovers", "Wide Body Kit"],
    }));
  }, [data]);

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    make: "",
    model: "",
    year: "",
    yearMin: "",
    yearMax: "",
    priceMin: "",
    priceMax: "",
    mileage: "",
    engineMods: [],
    suspensionMods: [],
    bodyMods: [],
    wheelsMods: [],
    driver_type: "",
    driver_title: "",
    motor_size_cylinders: "",
    motor_size_title: "",
    transmition_types: "",
    transmition_types_title: "",
    fuel_types: "",
    fuel_types_title: "",
    number_of_doors: "",
    exterior_color: "",
    interior_color: "",
    seller_type: "",
    seller_type_title: "",
    vehicle_status: "",
    vehicle_status_title: "",
    suspension_size: "",
    suspension_type: "",
    suspension_type_title: "",
    chassis_reinforcement: "",
    chassis_reinforcement_text: "",
    audio_upgrade: "",
    audio_upgrade_text: "",
    wheel_width: "",
    wheelwidthMin: "",
    wheelwidthMax: "",
    wheel_diameter: "",
    wheelDiameterMin: "",
    wheelDiameterMax: "",
    hp_output_rang: "",
    hp_output_rang_title: "",
    cosmetic_upgrade: "",
    cosmetic_upgrade_text: "",
    vehicle_use: "",
    vehicle_use_title: "",
    interior_upgrade: "",
    interior_upgrade_text: "",
    exterior_upgrade: "",
    exterior_upgrade_text: "",
    motor_upgrade: "",
    motor_upgrade_text: "",
    documentation_type: "",
    documentation_type_title: "",
    nearbyRadius: "",
    postal_code: "",
  });


  // Step 1: Read query parameters
  useEffect(() => {
    const params = new URLSearchParams(search);
    const queryFilters: FilterState = {
      searchTerm: params.get("searchTerm") || "",
      make: params.get("make") || "",
      model: params.get("model") || "",
      year: params.get("year") || "",
      yearMin: params.get("yearMin") || "",
      yearMax: params.get("yearMax") || "",
      priceMin: params.get("priceMin") || "",
      priceMax: params.get("priceMax") || "",
      mileage: params.get("mileage") || "",
      engineMods: params.get("engineMods")?.split(",") || [],
      suspensionMods: params.get("suspensionMods")?.split(",") || [],
      bodyMods: params.get("bodyMods")?.split(",") || [],
      wheelsMods: params.get("wheelsMods")?.split(",") || [],
      driver_type: params.get("driver_type") || "",
      driver_title: params.get("driver_title") || "",
      motor_size_cylinders: params.get("motor_size_cylinders") || "",
      motor_size_title: params.get("motor_size_title") || "",
      transmition_types: params.get("transmition_types") || "",
      transmition_types_title: params.get("transmition_types_title") || "",
      fuel_types: params.get("fuel_types") || "",
      fuel_types_title: params.get("fuel_types_title") || "",
      number_of_doors: params.get("number_of_doors") || "",
      exterior_color: params.get("exterior_color") || "",
      interior_color: params.get("interior_color") || "",
      seller_type: params.get("seller_type") || "",
      seller_type_title: params.get("seller_type_title") || "",
      vehicle_status: params.get("vehicle_status") || "",
      vehicle_status_title: params.get("vehicle_status_title") || "",
      suspension_size: params.get("suspension_size") || "",
      suspension_type: params.get("suspension_type") || "",
      suspension_type_title: params.get("suspension_type_title") || "",
      chassis_reinforcement: params.get("chassis_reinforcement") || "",
      chassis_reinforcement_text: params.get("chassis_reinforcement_text") || "",
      audio_upgrade: params.get("audio_upgrade") || "",
      audio_upgrade_text: params.get("audio_upgrade_text") || "",
      wheel_width: params.get("wheel_width") || "",
      wheelwidthMin: params.get("wheelwidthMin") || "",
      wheelwidthMax: params.get("wheelwidthMax") || "",
      wheel_diameter: params.get("wheel_diameter") || "",
      wheelDiameterMin: params.get("wheelDiameterMin") || "",
      wheelDiameterMax: params.get("wheelDiameterMax") || "",
      hp_output_rang: params.get("hp_output_rang") || "",
      hp_output_rang_title: params.get("hp_output_rang_title") || "",
      cosmetic_upgrade: params.get("cosmetic_upgrade") || "",
      cosmetic_upgrade_text: params.get("cosmetic_upgrade_text") || "",
      vehicle_use: params.get("vehicle_use") || "",
      vehicle_use_title: params.get("vehicle_use_title") || "",
      interior_upgrade: params.get("interior_upgrade") || "",
      interior_upgrade_text: params.get("interior_upgrade_text") || "",
      exterior_upgrade: params.get("exterior_upgrade") || "",
      exterior_upgrade_text: params.get("exterior_upgrade_text") || "",
      motor_upgrade: params.get("motor_upgrade") || "",
      motor_upgrade_text: params.get("motor_upgrade_text") || "",
      documentation_type: params.get("documentation_type") || "",
      documentation_type_title: params.get("documentation_type_title") || "",
      nearbyRadius: params.get("nearbyRadius") || "",
      postal_code: params.get("postal_code") || "",
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
      yearMin: "",
      yearMax: "",
      priceMin: "",
      priceMax: "",
      mileage: "",
      engineMods: [],
      suspensionMods: [],
      bodyMods: [],
      wheelsMods: [],
      driver_type: "",
      driver_title: "",
      motor_size_cylinders: "",
      motor_size_title: "",
      transmition_types: "",
      transmition_types_title: "",
      fuel_types: "",
      fuel_types_title: "",
      number_of_doors: "",
      exterior_color: "",
      interior_color: "",
      seller_type: "",
      seller_type_title: "",
      vehicle_status: "",
      vehicle_status_title: "",
      suspension_size: "",
      suspension_type: "",
      suspension_type_title: "",
      chassis_reinforcement: "",
      chassis_reinforcement_text: "",
      audio_upgrade: "",
      audio_upgrade_text: "",
      wheel_width: "",
      wheelwidthMin: "",
      wheelwidthMax: "",
      wheel_diameter: "",
      wheelDiameterMin: "",
      wheelDiameterMax: "",
      hp_output_rang: "",
      hp_output_rang_title: "",
      cosmetic_upgrade: "",
      cosmetic_upgrade_text: "",
      vehicle_use: "",
      vehicle_use_title: "",
      interior_upgrade: "",
      interior_upgrade_text: "",
      exterior_upgrade: "",
      exterior_upgrade_text: "",
      motor_upgrade: "",
      motor_upgrade_text: "",
      documentation_type: "",
      documentation_type_title: "",
      nearbyRadius: "",
      postal_code: "",
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
      filtered = filtered.filter(
        (listing) => parseInt(listing.vehicle_make) == parseInt(filters.make)
        //listing.vehicle_make.includes(filters.make)
      );
    }

    if (filters.model) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.model) == parseInt(filters.model)
        //listing.model.includes(filters.model)
      );
    }

    if (filters.year) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.year) == parseInt(filters.year)
      );
    }
    if (filters.yearMin) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.year_title) >= parseInt(filters.yearMin)
      );
    }
    if (filters.yearMax) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.year_title) <= parseInt(filters.yearMax)
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

    if (filters.chassis_reinforcement) {
      filtered = filtered.filter(
        (listing) => listing.audio_upgrade == filters.chassis_reinforcement
      );
    }
    if (filters.audio_upgrade) {
      filtered = filtered.filter(
        (listing) => listing.audio_upgrade == filters.audio_upgrade
      );
    }
    if (filters.cosmetic_upgrade) {
      filtered = filtered.filter(
        (listing) => listing.cosmetic_upgrade == filters.cosmetic_upgrade
      );
    }
    if (filters.interior_upgrade) {
      filtered = filtered.filter(
        (listing) => listing.interior_upgrade == filters.interior_upgrade
      );
    }
    if (filters.exterior_upgrade) {
      filtered = filtered.filter(
        (listing) => listing.exterior_upgrade == filters.exterior_upgrade
      );
    }
    if (filters.motor_upgrade) {
      filtered = filtered.filter(
        (listing) => listing.motor_upgrade == filters.motor_upgrade
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

    if (filters.driver_type) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.driver_type) == parseInt(filters.driver_type)
      );
    }

    if (filters.motor_size_cylinders) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.motor_size_cylinders) == parseInt(filters.motor_size_cylinders)
      );
    }

    if (filters.transmition_types) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.transmition_types) == parseInt(filters.transmition_types)
      );
    }

    if (filters.fuel_types) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.fuel_types) == parseInt(filters.fuel_types)
      );
    }

    if (filters.seller_type) {
      filtered = filtered.filter(
        (listing) => parseInt(listing.seller_type) == parseInt(filters.seller_type)
      );
    }

    if (filters.vehicle_status) {
      filtered = filtered.filter(
        (listing) => listing.vehicle_status.toString() == filters.vehicle_status.toString()
      );
    }

    if (filters.suspension_size) {
      const suspensionSize = parseFloat(filters.suspension_size);
      filtered = filtered.filter((listing) => {
        const listingSuspension = parseFloat(listing.suspension_size); // Ensure listing.suspension_size is a number or string
        return !isNaN(listingSuspension) && listingSuspension >= suspensionSize; // Check if valid number and apply filter
      });
    }

    if (filters.suspension_type) {
      filtered = filtered.filter(
        (listing) => listing.suspension_type == filters.suspension_type
      );
    }

    // Wheel Width Filter wheelwidthMin
    if (filters.wheelwidthMin) {
      const wheelwidthMin = parseFloat(filters.wheelwidthMin);
      filtered = filtered.filter((listing) => {
        const listingWheelWidth = parseFloat(listing.wheel_width);
        return !isNaN(listingWheelWidth) && listingWheelWidth >= wheelwidthMin;
      });
    }

    if (filters.wheelwidthMax) {
      const wheelwidthMax = parseFloat(filters.wheelwidthMax);
      filtered = filtered.filter((listing) => {
        const listingWheelWidth = parseFloat(listing.wheel_width);
        return !isNaN(listingWheelWidth) && listingWheelWidth <= wheelwidthMax;
      });
    }

    // if (filters.wheel_width) {
    //   const wheelWidth = parseFloat(filters.wheel_width);
    //   filtered = filtered.filter((listing) => {
    //     const listingWheelWidth = parseFloat(listing.wheel_width);
    //     return !isNaN(listingWheelWidth) && listingWheelWidth >= wheelWidth;
    //   });
    // }

    // Wheel Diameter Filter
    if (filters.wheelDiameterMin) {
      const wheelDiameterMin = parseFloat(filters.wheelDiameterMin);
      filtered = filtered.filter((listing) => {
        const listingWheelWidth = parseFloat(listing.wheel_diameter);
        return !isNaN(listingWheelWidth) && listingWheelWidth >= wheelDiameterMin;
      });
    }

    if (filters.wheelDiameterMax) {
      const wheelDiameterMax = parseFloat(filters.wheelDiameterMax);
      filtered = filtered.filter((listing) => {
        const listingWheelWidth = parseFloat(listing.wheel_diameter);
        return !isNaN(listingWheelWidth) && listingWheelWidth <= wheelDiameterMax;
      });
    }
    // if (filters.wheel_diameter) {
    //   const wheelDiameter = parseFloat(filters.wheel_diameter);
    //   filtered = filtered.filter((listing) => {
    //     const listingWheelDiameter = parseFloat(listing.wheel_diameter);
    //     return !isNaN(listingWheelDiameter) && listingWheelDiameter >= wheelDiameter;
    //   });
    // }

    // HP Output Range Filter (Dropdown)
    if (filters.hp_output_rang) {
      filtered = filtered.filter(
        (listing) => listing.hp_output_rang == filters.hp_output_rang
      );
    }

    // Vehicle Use Filter
    if (filters.vehicle_use) {
      filtered = filtered.filter(
        (listing) => listing.vehicle_use == filters.vehicle_use
      );
    }

    // Vehicle exterior_color
    if (filters.exterior_color) {
      filtered = filtered.filter(
        (listing) => listing.exterior_color == filters.exterior_color
      );
    }

    // Vehicle interior_color
    if (filters.interior_color) {
      filtered = filtered.filter(
        (listing) => listing.interior_color == filters.interior_color
      );
    }

    // Vehicle postal_code
    if (filters.postal_code) {
      filtered = filtered.filter(
        (listing) => listing.postal_code == filters.postal_code
      );
    }
    return filtered;
  }, [filters, listings]);

  useEffect(() => {
    const applyNearbyFilter = async () => {
      let result = filteredAndSortedListings;
      if (filters.nearbyRadius && Number(filters.nearbyRadius) > 0) {
        result = await filterNearbyListings(result, Number(filters.nearbyRadius));
      }
      setFinalListings(result);
    };
    applyNearbyFilter();
  }, [filteredAndSortedListings, filters.nearbyRadius]);

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
      <Helmet>
        <title>List Your Car For Sale Online | One Off Autos</title>
        <meta
          name="description"
          content="List your car for sale online and reach real buyers fast. Showcase your modified or custom ride to enthusiasts looking to buy unique street cars."
        />
        <link rel="canonical" href="https://www.oneoffautos.com/listings" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
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
                {finalListings.map((listing) => (
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
                        className={`px-4 py-2 border rounded-md ${currentPage === pageNum
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
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-4">List Your Car for Sale</h4>
                <p className="text-[16px] text-gray-700 mb-4">
                  Want to sell your car or upgrade to a new vehicle? One Off Autos has you covered.
                </p>
                <p className="text-[16px] text-gray-700 mb-6">
                  We’re a dedicated marketplace for modified cars. Our goal is to connect modified car enthusiasts. When you post your car for sale on our platform, you’re gaining access to buyers who value and appreciate the effort and upgrades put into modifying your vehicle.
                </p>
                <p className="text-[16px] text-gray-700 mb-4">
                  The process is simple. List your car for sale with detailed specifications, accentuate your modifications, and get in touch with verified customers.
                </p>
                <p className="text-[16px] text-gray-700 mb-4">
                  Sell your car on One Off Autos because our community knows the true value of the vehicles.
                </p>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-4">Sell Your Modified Car Today!</h4>
                <p className="text-[16px] text-gray-700 mb-4">
                  One Off Autos is the platform for buying and selling modified cars. By selling with One Off Autos, you are reaching out to the right audience: gearheads, builders, and enthusiasts who understand what makes a vehicle unique.
                </p>
                <p className="text-[16px] text-gray-700 mb-6">
                  Add pictures of your cars, describe all modifications, and provide an honest assessment of the work done —from engine swaps to suspension upgrades.
                </p>
                <p className="text-[16px] text-gray-700 mb-4">
                  <a href="">Sign Up</a> now to list your car!
                </p>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-4">Custom Cars and Trucks for Sale</h4>
                <p className="text-[16px] text-gray-700 mb-4">
                  Need inspiration to build your next project or dream? Check out our collection of customized cars and trucks on sale. All listed items are uniquely modified by former owners. Experience high-performance tunings, lifted off-roaders, and street-ready classics.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <FAQs
        faqs={faqs}
      />
    </MainLayout>
  );
};

export default Listings;
