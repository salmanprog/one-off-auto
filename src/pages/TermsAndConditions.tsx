import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => (
  <MainLayout>
     <Helmet>
        <title>TermsAndConditions | One Off Autos</title>
        <meta
          name="description"
          content="List your car for sale online and reach real buyers fast. Showcase your modified or custom ride to enthusiasts looking to buy unique street cars."
        />
        <link rel="canonical" href="https://www.oneoffautos.com/terms-and-conditions" />
      </Helmet>
    <div className="bg-oneoffautos-blue text-white py-16">
      <div className="container-custom mx-auto">
        <h1 className="text-[36px] font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-6 max-w-[500px] ">These Terms and Conditions (\"Terms\") govern your use of the One Off Autos website and services (\"we\", \"us\", or \"our\"). By accessing or using our site, you agree to these Terms. If you do not agree, please do not use our services.</p>
      </div>
    </div>
    <div className="container-custom py-12 mx-auto">
      <h2 className="text-2xl font-semibold mt-8 mb-2">1. User Accounts</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You must provide accurate and complete information when creating an account.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        <li>You are responsible for all activities that occur under your account.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Listings & Transactions</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>All vehicle listings must be accurate and not misleading.</li>
        <li>We are not a party to transactions between buyers and sellers, except where explicitly stated.</li>
        <li>We reserve the right to remove or edit listings at our discretion.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Prohibited Activities</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>No unlawful, fraudulent, or abusive activity is permitted.</li>
        <li>No posting of false, misleading, or inappropriate content.</li>
        <li>No interference with the operation of the website or services.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Intellectual Property</h2>
      <p className="mb-4">All content on this site, including text, images, logos, and software, is the property of One Off Autos or its licensors. You may not use, copy, or distribute content without permission.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Disclaimers & Limitation of Liability</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Our services are provided "as is" without warranties of any kind.</li>
        <li>We are not liable for any damages arising from your use of the site or services.</li>
        <li>We do not guarantee the accuracy or completeness of listings or user content.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Termination</h2>
      <p className="mb-4">We reserve the right to suspend or terminate your account or access to our services at any time, for any reason, without notice.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Governing Law</h2>
      <p className="mb-4">These Terms are governed by the laws of your jurisdiction. Any disputes will be resolved in the courts of your jurisdiction.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact</h2>
      <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@oneoffautos.com" className="text-oneoffautos-blue underline">support@oneoffautos.com</a>.</p>
    </div>
  </MainLayout>
);

export default TermsAndConditions; 