
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Link } from "react-router-dom";
import { Users, Shield, HeartHandshake, Trophy } from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <MainLayout>
       <Helmet>
        <title>About | One Off Autos</title>
        <meta
          name="description"
          content="List your car for sale online and reach real buyers fast. Showcase your modified or custom ride to enthusiasts looking to buy unique street cars."
        />
        <link rel="canonical" href="https://www.oneoffautos.com/about" />
      </Helmet>
      <div className="bg-oneoffautos-blue text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About One Off Autos</h1>
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
                Our <span className="text-oneoffautos-red">Story</span>
              </h2>
              <p className="mb-6">
                One Off Autos was founded by a group of automotive enthusiasts who were frustrated with the
                traditional car buying experience. We noticed that mainstream automotive marketplaces didn't
                cater to the modified vehicle community, often undervaluing the time, effort, and financial
                investment put into customized rides.
              </p>
              <p className="mb-8">
                In 2023, we launched One Off Autos with a simple mission: to create a platform where modified
                vehicle enthusiasts could connect, appreciate each other's builds, and facilitate fair transactions
                that recognize the true value of modified vehicles.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-oneoffautos-blue">
                Our <span className="text-oneoffautos-red">Mission</span>
              </h2>
              <p className="mb-6">
                At One Off Autos, we're dedicated to creating the most trusted marketplace for buying and selling modified vehicles.
                We understand that your ride isn't just transportation—it's a passion project that represents countless hours of
                planning, investment, and personal expression.
              </p>
              <p className="mb-8">
                Our platform is designed to showcase the unique qualities of each build, highlighting modifications
                in a way that helps sellers get fair value and helps buyers find their dream machines.
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-oneoffautos-blue">
                What Sets Us <span className="text-oneoffautos-red">Apart</span>
              </h2>
              <p className="mb-6">
                Unlike general automotive marketplaces, we specialize exclusively in the modified vehicle market.
                Our platform includes detailed filters for engine swaps, suspension setups, body modifications,
                wheel and tire specifications, and more—making it easy to find exactly what you're looking for.
              </p>
              <p className="mb-6">
                Every listing on One Off Autos is manually reviewed by our team of automotive experts to ensure
                quality, accuracy, and safety. We're not just a listing service; we're building a community of
                like-minded enthusiasts who speak the same language and share the same passion.
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
