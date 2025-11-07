import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTags = ({ 
  title = "One Off Autos - Premium Modified Cars Marketplace",
  description = "Buy and sell unique modified vehicles. JDM, Euro tuners, American muscle cars and custom builds on the premier marketplace for car enthusiasts.",
  keywords = "modified cars, custom cars, JDM, tuner cars, muscle cars, car marketplace, modified vehicles, custom builds",
  ogTitle,
  ogDescription,
  ogImage = "/logo.png",
  ogType = "website",
  canonical,
  twitterCard = "summary_large_image",
  twitterSite = "@oneoffautos"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="One Off Autos" />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="One Off Autos" />
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
};

export default MetaTags;
