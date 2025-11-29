import React from "react";
import ContactPageHeader from "./_components/ContactPageHeader";
import ContactHeroSection from "./_components/ContactHeroSection";
import ContactMethods from "./_components/ContactMethods";
import EmailUsSection from "./_components/EmailUsSection";
import QuickLinksSection from "./_components/QuickLinksSection";

const ContactPage = () => {
  return (
    <div>
      <ContactPageHeader />
      <ContactHeroSection />
      <ContactMethods />
      <EmailUsSection />
      <QuickLinksSection />
    </div>
  );
};

export default ContactPage;
