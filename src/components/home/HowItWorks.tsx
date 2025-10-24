
import React from "react";
import { Search, Sliders, Upload } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-oneoffautos-blue" />,
      title: "Browse Modified Listings",
      description: "Explore our curated marketplace of modified vehicles built by enthusiasts who share your passion for performance and style."
    },
    {
      icon: <Sliders className="h-12 w-12 text-oneoffautos-blue" />,
      title: "Use Advanced Filters",
      description: "Find exactly what you're looking for with our specialized filters that understand modifications, performance upgrades, and custom builds."
    },
    {
      icon: <Upload className="h-12 w-12 text-oneoffautos-blue" />,
      title: "Sell Your Ride Easily",
      description: "List your modified vehicle with detailed specifications and reach buyers who truly appreciate the time, effort, and investment you've put into your build."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-oneoffautos-red">Works</span>
          </h2>
          <div className="h-1 w-20 bg-oneoffautos-red mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            One Off Autos makes buying and selling modified vehicles straightforward and rewarding. Our platform is built by enthusiasts, for enthusiasts who understand the value of custom automotive builds.
          </p>
        </div>

        {/* Cards Section */}
        <div className="mt-12">
          {/* Desktop view */}
          <div className="hidden md:flex gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group flex-1">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-oneoffautos-blue/30 flex flex-col">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-lg shadow-md mr-4 border border-oneoffautos-red/20 flex-shrink-0">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-oneoffautos-blue group-hover:text-oneoffautos-red transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <p className="text-gray-700">
                      {step.description}
                    </p>

                    {/* Step Number */}
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-oneoffautos-blue text-white flex items-center justify-center font-bold mr-2 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">Step {index + 1}</span>
                      </div>

                      {/* Arrow for next step */}
                      {index < steps.length - 1 && (
                        <div className="text-oneoffautos-red">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view */}
          <div className="grid grid-cols-1 gap-8 md:hidden">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-oneoffautos-blue/30 flex flex-col">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-lg shadow-md mr-4 border border-oneoffautos-red/20 flex-shrink-0">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-oneoffautos-blue group-hover:text-oneoffautos-red transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-gray-700">
                      {step.description}
                    </p>

                    {/* Step Number */}
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-oneoffautos-blue text-white flex items-center justify-center font-bold mr-2 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">Step {index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="/listings"
            className="inline-flex items-center justify-center px-6 py-3 bg-oneoffautos-blue text-white font-medium rounded-md hover:bg-blue-800 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Explore Modified Vehicles
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
