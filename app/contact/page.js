import React from "react";
import ContactPageHeader from "./_components/ContactPageHeader";
import ContactHeroSection from "./_components/ContactHeroSection";
import ContactInformation from "./_components/ContactInformation";
import EmailUsSection from "./_components/EmailUsSection";
import QuickLinksSection from "./_components/QuickLinksSection";
import FAQPreview from "./_components/FAQPreview";

const ContactPage = () => {
  return (
    <div>
      <ContactPageHeader />
      <ContactHeroSection />
      <EmailUsSection />
      <ContactInformation />
      <QuickLinksSection />
      <FAQPreview />
    </div>
  );
};

export default ContactPage;
