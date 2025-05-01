
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import Hero from "../components/home/Hero";
import FeaturedListings from "../components/home/FeaturedListings";
import HowItWorks from "../components/home/HowItWorks";
import AboutPreview from "../components/home/AboutPreview";
import ValueProps from "../components/home/ValueProps";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import ButtonExamples from "../components/examples/ButtonExamples";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedListings />
      <HowItWorks />
      <AboutPreview />
      <ButtonExamples />
      <ValueProps />
      <Testimonials />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;
