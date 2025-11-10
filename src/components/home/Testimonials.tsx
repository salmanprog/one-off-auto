
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "I sold my custom Evo X in just 3 days. The buyer understood and valued all the mods I had done - something that never happened on general car sites.",
    name: "Alex R.",
    location: "Denver, CO",
    type: "Seller",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "After months of searching for a properly modified S2000 elsewhere, I found exactly what I wanted on One Off Autos in my first week.",
    name: "Michelle T.",
    location: "Miami, FL",
    type: "Buyer",
    avatar: "https://i.pravatar.cc/150?img=25"
  },
  {
    quote: "The detailed mod filters saved me countless hours. I could specifically search for cars with the exact suspension setup I was looking for.",
    name: "James L.",
    location: "Seattle, WA",
    type: "Buyer",
    avatar: "https://i.pravatar.cc/150?img=53"
  },
  {
    quote: "Finally, a marketplace where my build's value is recognized. Sold my custom Tacoma for what it was truly worth.",
    name: "Sarah K.",
    location: "Austin, TX",
    type: "Seller",
    avatar: "https://i.pravatar.cc/150?img=44"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-oneoffautos-blue text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Community Success Stories</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Hear from enthusiasts who've found their perfect rides and sellers who appreciate their builds.
          </p>
        </div>

        <div className="relative">
          {/* Carousel with custom navigation arrows positioned outside */}
          <div className="flex items-center">
            {/* Left Arrow - Positioned outside with spacing */}
            <div className="mr-4">
              <button
                onClick={() => {
                  const prevButton = document.querySelector('[data-carousel-prev]') as HTMLButtonElement;
                  if (prevButton) prevButton.click();
                }}
                className="h-9 w-9 rounded-full bg-oneoffautos-red text-white flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </div>

            {/* Main Carousel */}
            <div className="flex-1 overflow-hidden">
              <Carousel className="w-full">
                <CarouselContent className="py-4">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-4">
                      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col">
                        <div className="flex justify-center mb-4">
                          <Avatar className="h-20 w-20 border-4 border-oneoffautos-blue shadow-md">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} width={150} height={150}  />
                            <AvatarFallback className="bg-oneoffautos-red text-white text-xl">
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <p className="italic mb-6 flex-grow text-center">{testimonial.quote}</p>
                        <div className="text-center">
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.location} • {testimonial.type}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Hidden default navigation buttons that we'll trigger programmatically */}
                <CarouselPrevious className="hidden" data-carousel-prev />
                <CarouselNext className="hidden" data-carousel-next />
              </Carousel>
            </div>

            {/* Right Arrow - Positioned outside with spacing */}
            <div className="ml-4">
              <button
                onClick={() => {
                  const nextButton = document.querySelector('[data-carousel-next]') as HTMLButtonElement;
                  if (nextButton) nextButton.click();
                }}
                className="h-9 w-9 rounded-full bg-oneoffautos-red text-white flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white hover:text-oneoffautos-red transition-colors"
          >
            See community builds on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
