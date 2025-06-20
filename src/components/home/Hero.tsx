import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "../../hooks/request";

const Hero = () => {
  const [makeValue, setMakeValue] = useState("");
  const [modelValue, setModelValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const { data, loading, error } = useFetch("get_vehicle_make_list");

  // Function to validate number input
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only numbers (including decimals) in the input fields for model and year
    if (/^\d*\.?\d*$/.test(value)) {
      if (name === "modelValue") setModelValue(value);  // Only update if it's a valid number
      else if (name === "yearValue") setYearValue(value);  // Only update if it's a valid number
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-oneoffautos-blue to-blue-900 py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        ></div>
      </div>

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

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/listings" className="group">
                <Button size="lg" className="bg-oneoffautos-red text-white px-8 py-6 hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  Browse Listings <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/sell-your-ride">
                <Button size="lg" className="border-2 border-white text-white bg-oneoffautos-blue/80 hover:bg-oneoffautos-blue hover:border-oneoffautos-blue/50 px-8 py-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  Sell Your Ride
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">Find Your Perfect Build</h3>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-oneoffautos-red"></span>
                <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="h-2 w-2 rounded-full bg-green-400"></span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Select value={makeValue} onValueChange={setMakeValue}>
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    {data &&
                    data.map((make: { id: string; title: string }) => (
                        <SelectItem value={make.id}>{make.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                {/* Model input field changed to text */}
                <input
                  type="text"
                  name="modelValue"
                  value={modelValue}
                  onChange={handleNumberChange}
                  placeholder="Model"
                  className="w-full bg-white/80 backdrop-blur-sm p-3 rounded-lg"
                />
              </div>
              <div>
                {/* Year input field changed to text */}
                <input
                  type="text"
                  name="yearValue"
                  value={yearValue}
                  onChange={handleNumberChange}
                  placeholder="Year"
                  className="w-full bg-white/80 backdrop-blur-sm p-3 rounded-lg"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search makes, models, or mods..."
                className="w-full rounded-l-lg p-3 focus:outline-none text-gray-800 bg-white/80 backdrop-blur-sm"
              />
              <Link to="/listings" className="bg-oneoffautos-red hover:bg-red-700 transition-all duration-300 text-white px-4 py-3 rounded-r-lg flex items-center justify-center hover:shadow-md">
                <Search size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
