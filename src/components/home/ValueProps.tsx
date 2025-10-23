
import React from "react";
import { Shield, Gauge, Users, CheckCircle } from "lucide-react";

const ValueProps = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-oneoffautos-blue" />,
      title: "Verified Sellers",
      description: "Every vehicle listing and seller is manually vetted by our team for your security."
    },
    {
      icon: <Gauge className="h-10 w-10 text-oneoffautos-blue" />,
      title: "Modification Experts",
      description: "Our team understands modifications and can help you find the perfect custom vehicle."
    },
    {
      icon: <Users className="h-10 w-10 text-oneoffautos-blue" />,
      title: "Community Focused",
      description: "Join a community of like-minded enthusiasts who appreciate modified vehicles."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-oneoffautos-blue" />,
      title: "Quality Listings",
      description: "We focus on quality over quantity, featuring only the best modified vehicles."
    }
  ];

  return (
    <section className="py-16 bg-oneoffautos-blue">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Why Choose One Off Autos?</h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            We're the premier marketplace for enthusiasts who want unique, modified vehicles that stand out from the crowd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-oneoffautos-lightgray p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-oneoffautos-blue/30 h-full">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-oneoffautos-blue transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ValueProps;
