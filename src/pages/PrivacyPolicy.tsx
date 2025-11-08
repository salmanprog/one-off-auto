import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => (
  <MainLayout>
     <Helmet>
        <title>PrivacyPolicy | One Off Autos</title>
        <meta
          name="description"
          content="List your car for sale online and reach real buyers fast. Showcase your modified or custom ride to enthusiasts looking to buy unique street cars."
        />
        <link rel="canonical" href="https://www.oneoffautos.com/privacy-policy" />
      </Helmet>
    <div className="bg-oneoffautos-blue text-white py-16">
      <div className="container-custom mx-auto">
        <h1 className="text-[36px] font-bold mb-6">Privacy Policy</h1>
        <p className="mb-6 max-w-[500px]">This Privacy Policy describes how One Off Autos (\"we\", \"us\", or \"our\") collects, uses, and shares your personal information when you use our website and services.</p>
      </div>
    </div>
    <div className="container-custom py-12 mx-auto">
      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><b>Personal Information:</b> Name, email address, phone number, address, and other information you provide when registering, listing, or contacting us.</li>
        <li><b>Usage Data:</b> IP address, browser type, device information, pages visited, and actions taken on our site.</li>
        <li><b>Cookies & Tracking:</b> We use cookies and similar technologies to enhance your experience and analyze site usage.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To provide, operate, and improve our services</li>
        <li>To communicate with you about your account, listings, or inquiries</li>
        <li>To personalize your experience and show relevant content</li>
        <li>To comply with legal obligations and prevent fraud</li>
        <li>For marketing and promotional purposes (with your consent, where required)</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Cookies and Tracking Technologies</h2>
      <p className="mb-4">We use cookies and similar technologies to remember your preferences, analyze traffic, and improve our services. You can control cookies through your browser settings.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">We may share your information with trusted third-party service providers (such as payment processors, analytics, or marketing partners) as needed to operate our business. We do not sell your personal information.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Data Security</h2>
      <p className="mb-4">We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Your Rights</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You may access, update, or delete your personal information by contacting us.</li>
        <li>You may opt out of marketing communications at any time.</li>
        <li>Depending on your location, you may have additional rights under applicable privacy laws (e.g., GDPR, CCPA).</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Children's Privacy</h2>
      <p className="mb-4">Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us for removal.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Changes to This Policy</h2>
      <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">9. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@oneoffautos.com" className="text-oneoffautos-blue underline">support@oneoffautos.com</a>.</p>
    </div>
  </MainLayout>
);

export default PrivacyPolicy; 