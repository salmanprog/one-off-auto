import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ButtonExamples = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Interactive Button Examples</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our custom button styles with enhanced hover effects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blue Button Card */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-oneoffautos-blue">Primary Action Buttons</h3>
            <p className="text-gray-600 mb-6">
              Our primary buttons use the brand blue color and feature smooth hover animations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" className="group">
                Explore Listings <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="border-oneoffautos-blue text-oneoffautos-blue hover:bg-oneoffautos-blue hover:text-white">
                Learn More
              </Button>
            </div>
          </div>

          {/* Red Button Card */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-4 text-oneoffautos-red">Accent Action Buttons</h3>
            <p className="text-gray-600 mb-6">
              Our accent buttons use the brand red color for high-visibility calls to action.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="accent" size="lg" className="group">
                Sell Your Ride <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="border-oneoffautos-red text-oneoffautos-red hover:bg-oneoffautos-red hover:text-white">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ButtonExamples;
