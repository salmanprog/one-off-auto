
import React from "react";
import Navbar from "../navigation/Navbar";
import Footer from "../common/Footer";
import FAQs from "../faqs/Index";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
