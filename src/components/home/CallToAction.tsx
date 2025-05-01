
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Youtube } from "lucide-react";

const CallToAction = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log("Email submitted:", email);
    setSubmitted(true);
    setEmail("");
  };
  
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Next Build?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Join thousands of enthusiasts buying and selling modified vehicles on the premier marketplace built for gearheads.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/listings" className="btn-primary text-center">
                Browse Listings
              </Link>
              <Link to="/sell-your-ride" className="btn-secondary text-center">
                Sell Your Ride
              </Link>
            </div>
          </div>
          <div>
            <div className="bg-oneoffautos-lightgray p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Stay in the Loop</h3>
              <p className="mb-4">Get notified about new listings that match your interests and exclusive One Off Autos content.</p>
              
              {submitted ? (
                <div className="bg-green-100 text-green-700 p-4 rounded-md">
                  Thanks for subscribing! We'll be in touch soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow"
                  />
                  <Button type="submit" className="bg-oneoffautos-blue hover:bg-blue-800">
                    Subscribe
                  </Button>
                </form>
              )}
              
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to receive marketing emails from One Off Autos. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
