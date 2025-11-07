
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Link } from "react-router-dom";
import { Users, Shield, HeartHandshake, Trophy } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import FAQs from "../components/faqs/Index";
import { Helmet } from "react-helmet-async";

const Sell = () => {
  const schemaData = {
    "@context": "https://schema.org/", 
    "@type": "Product", 
    "name": "Sell Your Modified Cars",
    "image": "",
    "description": "List and sell your modified cars online. Reach passionate buyers, showcase your custom build, and join a growing community of car lovers.",
    "brand": {
      "@type": "Brand",
      "name": "One Off Autos"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "341"
    }
  };
  const faqs = [
    {
      question: "1. What’s the best place to sell a custom-modified car?",
      answer: "One Off Autos is a dedicated platform for buying and selling custom-modified cars online. We specialize in modified builds and connect car enthusiasts."
    },
    {
      question: "2. Can I sell my modified car privately, or should I use a dealer?",
      answer: "You can sell your modified car either privately or through a dealer. Selling privately may yield a higher return, but it requires more effort. On the other hand, using a trusted dealer or platform like One Off Autos streamlines the process, making it quicker and safer while effectively reaching your target audience."
    },
    {
      question: "3. Where can I find buyers interested specifically in modified cars?",
      answer: "One Off Autos connects you directly with enthusiasts who value custom builds. You can also reach buyers through car shows, social media communities, and automotive forums."
    },
    {
      question: "4. How long does it usually take to sell a custom-modified car?",
      answer: "Timing depends on the car's uniqueness, demand, and pricing. Well-priced and attractive cars often sell within a few weeks, while more unique builds might take longer to attract the right buyer."
    }

  ];
  return (
    <MainLayout>
      <Helmet>
        <title>Sell Your Modified Cars Online | One Off Autos</title>
        <meta
          name="description"
          content="List and sell your modified cars online. Reach passionate buyers, showcase your custom build, and join a growing community of car lovers."
        />
        <link rel="canonical" href="https://www.oneoffautos.com/sell" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <div className="bg-oneoffautos-blue text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sell One Off Autos</h1>
            <p className="text-xl">
              The premier marketplace connecting buyers and sellers of unique, modified vehicles.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-oneoffautos-blue">
                Sell Your <span className="text-oneoffautos-red">Modified</span> Cars Online Here?
              </h2>
              <p className="mb-6">
                Want to put street modified cars for sale that are well distinguished in terms of power, performance, and precision?
              </p>
              <p className="mb-8">
                One Off Autos is the place to be. We value each other's craftsmanship and have built a secure marketplace with a community of modified car enthusiasts. Whether it’s turbocharged imports or custom American muscle cars, we connect individuals who share a passion for unique modifications and extraordinary rides.
              </p>
              <p className="mb-8">
                Whether you're looking for your next modified vehicle or just want to learn and admire the workmanship behind each build, this is where it all begins.
              </p>
              <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-oneoffautos-blue shrink-0 mt-0.5 mr-2" />
                      <p>
                        <span className="font-semibold"><a href="/signin">Sign In</a></span> now and get a verified listing.
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-oneoffautos-blue shrink-0 mt-0.5 mr-2" />
                      <p>
                        <span className="font-semibold">Access</span> - Access the seller directly.
                      </p>
                    </div>
                </div>
              </div>
              <p className="mb-8">
                That’s really how simple it is. Once signed up, you can find street cars for sale that meet your specifications, style, and budget. It is time to find your next modified vehicle today.
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-oneoffautos-blue">
                Selling a <span className="text-oneoffautos-red">Car</span> with Modifications
              </h2>
              <p className="mb-6">
                When selling a car with modifications, you want a platform that recognizes the time, effort, and value put into making your car one-of-a-kind. One Off Autos is home to a group of enthusiasts who realize that your car is not just a means to get from one place to another. Rather, it’s a symbol of enthusiasm, ownership, and imagination.
              </p>
              <p className="mb-8">
                Upon signing in, you can <a className="text-oneoffautos-red" href="/listings">list</a> your modified car for sale in only a few steps. Mention its specifications and upload some images that showcase its uniqueness. Our audience understands the value of putting your unique signature on a vehicle. As a result, they’re willing to pay the price for your vision stamped on your vehicle.
              </p>
              <p className="mb-8">
                <a className="text-oneoffautos-red" href="/signup">Sign up</a> today to start selling cars to committed customers who speak your language and value your work.
              </p>
              
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-oneoffautos-lightgray rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Our Values</h3>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-oneoffautos-blue p-3 rounded-full mr-4">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Community First</h4>
                    <p className="text-gray-600">Building connections between enthusiasts</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-oneoffautos-blue p-3 rounded-full mr-4">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Trust & Safety</h4>
                    <p className="text-gray-600">Verified listings and secure transactions</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-oneoffautos-blue p-3 rounded-full mr-4">
                    <HeartHandshake className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Fair Value</h4>
                    <p className="text-gray-600">Recognizing the worth of modifications</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-oneoffautos-blue p-3 rounded-full mr-4">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Quality Standards</h4>
                    <p className="text-gray-600">Curated listings that meet our criteria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-oneoffautos-blue text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="mb-4">
                Become part of the One Off Autos family today and experience a better way to buy and sell modified vehicles.
              </p>
              <div className="flex flex-col space-y-3">
                <Link to="/listings" className="btn-primary bg-white text-oneoffautos-blue hover:bg-gray-100">
                  Browse Listings
                </Link>
                <Link to="/sell-your-ride" className="btn-secondary">
                  Sell Your Ride
                </Link>
                <Link to="/contact" className="text-white underline text-center hover:text-gray-200">
                  Contact Us
                </Link>
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

export default Sell;
