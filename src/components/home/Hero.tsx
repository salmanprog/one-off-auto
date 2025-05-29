
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

const Hero = () => {
  const [makeValue, setMakeValue] = useState("");
  const [modelValue, setModelValue] = useState("");
  const [yearValue, setYearValue] = useState("");

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-oneoffautos-blue to-blue-900 py-16 md:py-24">
      {/* Background elements */}
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

        {/* Abstract shapes */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-oneoffautos-red opacity-20 blur-3xl"></div>
        <div className="absolute -left-24 top-1/2 h-96 w-96 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
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
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={modelValue} onValueChange={setModelValue}>
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="civic">Civic</SelectItem>
                    <SelectItem value="corolla">Corolla</SelectItem>
                    <SelectItem value="mustang">Mustang</SelectItem>
                    <SelectItem value="350z">350Z</SelectItem>
                    <SelectItem value="camaro">Camaro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={yearValue} onValueChange={setYearValue}>
                  <SelectTrigger className="w-full bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                  </SelectContent>
                </Select>
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
            <div className="mt-4 flex justify-center">
              <Link to="/listings" className="text-white/80 hover:text-white text-sm flex items-center transition-colors">
                Advanced search <ChevronDown size={14} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
