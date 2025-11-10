
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Link } from "react-router-dom";
import { Users, Shield, HeartHandshake, Trophy } from "lucide-react";
import FAQs from "../components/faqs/Index";
import { Helmet } from "react-helmet-async";

const Buy = () => {
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Buy Modified Cars",
    "image": "",
    "description": "Buy or discover modified cars listed by owners. Explore custom builds, tuned rides, and connect with sellers passionate about performance cars.",
    "brand": {
      "@type": "Brand",
      "name": "One Off Autos"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "256"
    }
  };

  const faqs = [
    {
      question: "1. Where to buy modified cars that are performance-ready?",
      answer: "If you need to find modified cars that are tuned, tested, and performance-ready, consider a marketplace dedicated to enthusiasts. Sites like One Off Autos screen listings and let you filter results by modification type, such as suspension setups, forced induction, and custom interiors. This level of customization makes it easy to find modified cars for sale. "
    },
    {
      question: "2. Where is the best place to buy modified cars?",
      answer: "The best place to buy modified cars depends on the type of modification you're looking for. Websites like One Off Autos excel if you’re looking for highly modified vehicles. If you're looking for something more custom or niche, forums like those dedicated to specific car brands or Facebook groups may offer unique options. It's important to check the seller's reputation and confirm the quality of the modifications."
    },
    {
      question: "3 How do I verify the quality of a modified car before buying?",
      answer: "Request detailed service and modification records, thoroughly inspect the car, and take it for a test drive. Whenever possible, get an independent mechanic or tuning expert to assess performance, safety, and reliability."
    },
    {
      question: "4 How do I find modified cars that fit my budget?",
      answer: "Use filters on One Off Autos to narrow your search by price, model, and modification type. Ascertain your maximum spend (including potential maintenance), and focus on models with widely available parts and support. "
    },
    {
      question: "5 What should I check before buying a custom-modified car?",
      answer: "Before buying a custom-modified car, always request documentation of all modifications, check the build quality, and confirm the car's safety and roadworthiness. On our platform, every modification is highlighted to help the seller get a fair value and help the buyer find their dream car."
    },

  ];
  return (
    <MainLayout>
      <Helmet>
        <title>Buy Modified Cars | One Off Autos</title>
        <meta
          name="description"
          content="Buy or discover modified cars listed by owners. Explore custom builds, tuned rides, and connect with sellers passionate about performance cars."
        />
        <link rel="canonical" href="https://www.oneoffautos.com/buy" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <div className="bg-oneoffautos-blue text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Buy One Off Autos</h1>
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
                Looking to Buy <span className="text-oneoffautos-red">Modified</span> Cars?
              </h2>
              <p className="mb-6">
                Want to buy modified cars that are unique too? You’ve come to the right place! One Off Autos is an automotive marketplace exclusively for modified cars by car enthusiasts for car enthusiasts. We have all verified listed vehicles available on our website, from turbocharged, lifted trucks to custom classics, posted by sellers who had a vision and knew how to modify them.
              </p>
              <p className="mb-8">
                You’re not just buying modified cars from someone when you purchase them on our site. You’re paying for uniqueness. It’s someone's masterful handiwork, and you’re paying for the meticulous focus that makes each car one-of-a-kind. We manually verify each <a className="text-oneoffautos-red" href="/listings">listing</a> to confirm its authenticity, so you can shop with confidence knowing you are viewing the real deal.
              </p>
              <p className="mb-8">
                Join a community of gearheads that treasure performance, tailoring, and uniqueness. Whether it is performance-tuned sports cars or off-road monsters, finding your next project or dream car has never been easier.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-oneoffautos-blue">
                Buy <span className="text-oneoffautos-red">Modified</span> Cars Online From a Trustworthy Site
              </h2>
              <p className="mb-6">
                Avoid traditional marketplaces and buy modified cars online from One Off Autos, a trustworthy site that helps you avoid scams.
              </p>
              <p className="mb-8">
                One Off Autos is a company that offers state-of-the-art filters, helping you find engine swaps, the most extreme suspension, or body mods for your dream vehicle. Discover the ride that perfectly fits your specifications.
              </p>
              <p className="mb-8">
                When purchasing modified cars on our platform, you’re connected with trusted sellers who share a similar passion for customized vehicles. Forget about scrolling through irrelevant ads. Our platform only features premium cars waiting for new owners.
              </p>
              <p className="mb-8">
                Begin your journey now and find out why One Off Autos is the place where drivers go to get more than just stock vehicles. Shop for modified cars online, the right way, with passion, precision, and guidance from people who understand.
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

export default Buy;
