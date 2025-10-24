
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import Hero from "../components/home/Hero";
import FeaturedListings from "../components/home/FeaturedListings";
import HowItWorks from "../components/home/HowItWorks";
import AboutPreview from "../components/home/AboutPreview";
import ValueProps from "../components/home/ValueProps";
import YourNextBuild from "../components/home/YourNextBuild";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import ButtonExamples from "../components/examples/ButtonExamples";
import { register } from "../config/form_validation_rules";
import { useFetch } from "../hooks/request";
import FAQs from "../components/faqs/";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const faqs = [
    {
      question: "1. Where can I buy second-hand modified cars for sale?",
      answer: "When you are in need of second-hand custom modified cars on sale, you had better go outside of the mainstream car markets. Sellers like One Off Autos deal in modified cars, so every one of its listings is vetted and aimed at performance. These marketplaces know how much modified sports cars for sale upgrades, such as engine swaps to body kits are worth and they will directly refer you to enthusiasts who understand the details count."
    },
    {
      question: "2. What are the most popular modifications in custom sports cars for sale?",
      answer: "Most popular modifications include performance tuning like turbochargers, ECU remaps, exhaust systems, suspension enhancements, custom wheels and brakes, and aerodynamic body kits. Also, car enthusiasts often change car interiors, such as installing racing seats or upgrading to advanced infotainment systems. These mods boost both style and performance."
    },
    {
      question: "3. Where can I find modified sports cars for sale?",
      answer: "Modified sports cars for sale can be found on various online marketplaces, at specialized car dealerships, or on enthusiast forums. Popular websites for buying modified sports cars include One Off Autos, eBay Motors, Craigslist, AutoTrader, and dedicated performance car sites. It’s essential to research the modifications done to the car to ensure they enhance the vehicle's performance without compromising safety."
    },
    {
      question: "4. What are the most popular modifications in custom sports cars for sale?",
      answer: "Most popular modifications include performance tuning like turbochargers, ECU remaps, exhaust systems, suspension enhancements, custom wheels and brakes, and aerodynamic body kits. Also, car enthusiasts often change car interiors, such as installing racing seats or upgrading to advanced infotainment systems. These mods boost both style and performance."
    },
    {
      question: "5. What should I check before buying a custom-modified car?",
      answer: "Before buying a custom-modified car, always request documentation of all modifications, check the build quality, and confirm the car's safety and roadworthiness. At One Off Autos, our cars are verified, inspected, and ensured to comply with local regulations and insurance requirements before even being listed on our platform."
    },

  ];
  return (
    <>
      <MainLayout>
        <Helmet>
          <title>Modified Street Cars | One Off Autos</title>
          <meta
            name="description"
            content="Buy and sell modified street cars easily. Explore custom rides, tuned vehicles, and performance upgrades from passionate car enthusiasts worldwide."
          />
          <meta name="DC.title" content="Modified Street Cars" />
          <meta name="geo.region" content="US" />
          <meta name="geo.position" content="39.78373;-100.445882" />
          <meta name="ICBM" content="39.78373, -100.445882" />
        </Helmet>
        <Hero />
        <FeaturedListings />
        <HowItWorks />
        <AboutPreview />
        <ValueProps />
        <YourNextBuild />
        <Testimonials />
        <CallToAction />
        <FAQs
          faqs={faqs}
        />
      </MainLayout>
    </>
  );
};

export default Index;
