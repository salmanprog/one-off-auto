
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Link } from "react-router-dom";
import { Users, Shield, HeartHandshake, Trophy } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default About;
