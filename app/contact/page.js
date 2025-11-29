import React from "react";
import ContactPageHeader from "./_components/ContactPageHeader";
import ContactHeroSection from "./_components/ContactHeroSection";
import ContactMethods from "./_components/ContactMethods";
import EmailUsSection from "./_components/EmailUsSection";
import QuickLinksSection from "./_components/QuickLinksSection";
import FAQPreview from "./_components/FAQPreview";

const ContactPage = () => {
  return (
    <div>
      <ContactPageHeader />
      <ContactHeroSection />
      <ContactMethods />
      <EmailUsSection />
      <QuickLinksSection />
      <FAQPreview />
    </div>
  );
};

export default ContactPage;
