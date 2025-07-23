import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HttpRequest from "../../repositories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "../../hooks/request";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Hero = () => {
  const [makeValue, setMakeValue] = useState("");
  const [modelValue, setModelValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [titleValue, setTitleValue] = useState("");  // Added state for title search
  const [vehicleModel, setVehicleModel] = useState([]);
  const { data, loading, error } = useFetch("get_vehicle_make_list", "mount", '?limit=5000');
  //const { data: vehicleModel } = useFetch("get_vehicle_model_list", "mount", '?limit=5000');
  const { data: vehicleYear } = useFetch("get_vehicle_year_list", "mount", '?limit=5000');

useEffect(() => {
  const fetchModels = async () => {
    if (!makeValue) {
      setVehicleModel([]);
      return;
    }

    const url = `${baseUrl}user/user-vehicle-model?make_id=${makeValue}`;
    await HttpRequest.makeRequest('GET', url).then((response) => {
      if (response.code !== 200) {
        console.warn("Model API failed:", response);
        setVehicleModel([]); // fallback
      } else {
        setVehicleModel(response.data.data);
      }
    });
  };

  fetchModels();
}, [makeValue]);


  const navigate = useNavigate();

  // Function to handle search values and redirect
  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (makeValue) searchParams.append("make", makeValue);
    if (modelValue) searchParams.append("model", modelValue);
    if (yearValue) searchParams.append("year", yearValue);
    if (titleValue) searchParams.append("searchTerm", titleValue); // Pass title search term
    navigate(`/listings?${searchParams.toString()}`);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-oneoffautos-blue to-blue-900 py-16 md:py-24">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in">
              <span className="text-oneoffautos-red">Modified</span> Cars <br />
              For Passionate Drivers
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              The premier marketplace for enthusiasts buying and selling unique modified vehicles crafted for performance and style.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Find Your Perfect Build</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Select value={makeValue} onValueChange={(val) => {
                      setMakeValue(val);
                      setModelValue("");
                    }}>
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm p-3 rounded-lg">
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    {data && data.map((make: { id: string; title: string }) => (
                      <SelectItem key={make.id} value={make.id}>{make.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
              <Select value={modelValue} onValueChange={setModelValue}>
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm p-3 rounded-lg">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                  {vehicleModel && vehicleModel.length > 0 ? (
                      vehicleModel.map((model: { id: string; title: string }) => (
                        <SelectItem key={model.id} value={model.id}>{model.title}</SelectItem>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500">No models found</div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
              <Select value={yearValue} onValueChange={setYearValue}>
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm p-3 rounded-lg">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    {vehicleYear && vehicleYear.map((year: { id: string; title: string }) => (
                      <SelectItem key={year.id} value={year.id}>{year.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <input
                type="text"
                name="titleValue"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                placeholder="Search by title"
                className="w-full rounded-lg p-3 focus:outline-none text-gray-800 bg-white/80 backdrop-blur-sm mb-4"
              />
              <button
                onClick={handleSearch}
                className="bg-oneoffautos-red hover:bg-red-700 transition-all duration-300 text-white px-6 py-3 rounded-lg hover:shadow-md"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
