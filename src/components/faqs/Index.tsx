import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = ({ 
  faqs = [],
  className = ""
}) => {
  // Default FAQs if none provided ----
  const defaultFaqs = [
    {
      question: "How do I list my modified vehicle for sale?",
      answer: "To list your modified vehicle, simply click on 'Sell Your Vehicle' in the navigation menu, fill out our detailed listing form with photos, modifications, and vehicle information, and submit for review. Our team will verify the listing before it goes live."
    },
    {
      question: "Are all vehicles on the platform verified?",
      answer: "Yes, we manually verify every vehicle listing and seller to ensure authenticity and quality. Our team reviews modifications, checks seller credentials, and validates vehicle information before approving listings."
    },
    {
      question: "What types of modifications are allowed?",
      answer: "We welcome all types of modifications including engine swaps, suspension upgrades, body kits, interior modifications, and performance enhancements. However, all modifications must be legal and properly documented."
    },
    {
      question: "How do I contact a seller?",
      answer: "Once you find a vehicle you're interested in, you can contact the seller directly through our messaging system. Click on the 'Contact Seller' button on any listing to start a conversation."
    },
    {
      question: "Is there a fee to use the platform?",
      answer: "Listing your vehicle is free for sellers. We only charge a small commission fee when a successful sale is made through our platform. Buyers can browse and contact sellers at no cost."
    },
    {
      question: "How do I know if a modification is legal in my state?",
      answer: "While we verify modifications for quality and authenticity, it's important to check your local and state laws regarding vehicle modifications. We recommend consulting with local authorities or automotive professionals for legal compliance."
    }
  ];

  const faqsToShow = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className={`py-16 bg-oneoffautos-lightgray ${className}`}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently <span className="text-oneoffautos-red">Asked</span> Questions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqsToShow.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-oneoffautos-blue hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
