
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import ContactForm from "../components/contact/ContactForm";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useParams } from 'react-router-dom';
import { useFetch } from "../hooks/request";

const VerifyUser = () => {
  const { code } = useParams<{ code: string }>();
  const { loading, data, fetchApi } = useFetch("verify_user", "mount", code);
  return (
    <MainLayout>
      <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Congratulations!
          </h2>
          <div className="h-1 w-20 bg-oneoffautos-red mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your email has been successfully verified. You can now log in and enjoy all the features.
          </p>
        </div>
        </div>
        </section>
    </MainLayout>
  );
};

export default VerifyUser;
