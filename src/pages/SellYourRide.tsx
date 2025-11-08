
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import SellForm from "../components/sell/SellForm";
import { CheckCircle2 } from "lucide-react";
import FAQs from "../components/FAQs/";
import { Helmet } from "react-helmet-async";

const SellYourRide = () => {
  const faqs = [
    {
      question: "1. What’s the best place to sell a custom-modified car?",
      answer: "One Off Autos is a dedicated platform for buying and selling custom-modified cars online. We specialize in modified builds and connect car enthusiasts. "
    },
    {
      question: "2 Can I sell my modified car privately, or should I use a dealer?",
      answer: "You can sell your modified car either privately or through a dealer. Selling privately may yield a higher return, but it requires more effort. On the other hand, using a trusted dealer or platform like One Off Autos streamlines the process, making it quicker and safer while effectively reaching your target audience."
    },
    {
      question: "3 Where can I find buyers interested specifically in modified cars?",
      answer: "One Off Autos connects you directly with enthusiasts who value custom builds. You can also reach buyers through car shows, social media communities, and automotive forums."
    },
    {
      question: "4 How long does it usually take to sell a custom-modified car?",
      answer: "Timing depends on the car's uniqueness, demand, and pricing. Well-priced and attractive cars often sell within a few weeks, while more unique builds might take longer to attract the right buyer."
    },
    
  ];
  return (
    <MainLayout>
       <Helmet>
        <title>SellYourRide | One Off Autos</title>
        <meta
          name="description"
          content="List your car for sale online and reach real buyers fast. Showcase your modified or custom ride to enthusiasts looking to buy unique street cars."
        />
        <link rel="canonical" href="https://www.oneoffautos.com/sell-your-ride" />
      </Helmet>
      <div className="bg-oneoffautos-lightgray py-12">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Sell Your Modified Vehicle</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                List your one-of-a-kind ride with us and connect with enthusiasts who truly appreciate your build.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-oneoffautos-blue bg-opacity-10 mb-4">
                  <span className="font-bold text-oneoffautos-blue">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Submit Your Listing</h3>
                <p className="text-gray-600">
                  Fill out the form with details about your modified vehicle and upload photos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-oneoffautos-blue bg-opacity-10 mb-4">
                  <span className="font-bold text-oneoffautos-blue">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Get Approved</h3>
                <p className="text-gray-600">
                  Our team reviews your submission to ensure quality and accuracy.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-oneoffautos-blue bg-opacity-10 mb-4">
                  <span className="font-bold text-oneoffautos-blue">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Connect with Buyers</h3>
                <p className="text-gray-600">
                  Engage with serious buyers who appreciate your vehicle's modifications.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="bg-oneoffautos-blue text-white p-4 rounded-md mb-6">
                <h2 className="text-xl font-bold">Submit Your Vehicle Listing</h2>
                <p>Fill out the form below with as much detail as possible for best results.</p>
              </div>
              
              <SellForm />
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Why Sell With One Off Autos?</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-oneoffautos-blue shrink-0 mt-0.5 mr-2" />
                  <p>
                    <span className="font-semibold">Targeted Audience</span> - Connect with buyers who understand and value vehicle modifications.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-oneoffautos-blue shrink-0 mt-0.5 mr-2" />
                  <p>
                    <span className="font-semibold">No Lowball Offers</span> - Our community understands the value of quality modifications.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-oneoffautos-blue shrink-0 mt-0.5 mr-2" />
                  <p>
                    <span className="font-semibold">Featured Exposure</span> - Stand out with our premium listing options.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-oneoffautos-blue shrink-0 mt-0.5 mr-2" />
                  <p>
                    <span className="font-semibold">Seller Support</span> - Our team provides assistance throughout the selling process.
                  </p>
                </div>
              </div>
            </div>
            <FAQs 
              faqs={faqs}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellYourRide;
