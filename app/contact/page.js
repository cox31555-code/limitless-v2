import React from "react";
import ContactHero from "./_components/ContactHero";
import ContactMethods from "./_components/ContactMethods";
import EmailUsSection from "./_components/EmailUsSection";
import QuickLinksSection from "./_components/QuickLinksSection";

const ContactPage = () => {
  return (
    <div>
      <ContactHero />
      <ContactMethods />
      <EmailUsSection />
      <QuickLinksSection />
    </div>
  );
};

export default ContactPage;
