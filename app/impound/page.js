import React from "react";
import Header from "@/ui/main-pages/header/Header";
import OurBenifits from "@/ui/main-pages/ourBenifits/OurBenifits";
import ServiceDescription from "@/ui/main-pages/serviceDescription/ServiceDescription";
import {
  features,
  benifits,
  impoundCoverDetails,
  impoundEligibility,
} from "./data";
import ServiceCovered from "@/ui/main-pages/serviceCovered/ServiceCovered";
import Eligability from "@/ui/main-pages/eligability/Eligability";
import PaymentOptions from "@/ui/main-pages/paymentsOptions/PaymentOptions";
import styles from "./page.module.css";
import WhenImpound from "./_components/whenImpound/WhenImpound";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { questions } from "./data";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  title: "Impound Insurance | Instantly Release Your Impounded Vehicle | Limitless Cover",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Page = () => {

  return (
    <div>
      <Header
        subTitle="specialized for vehicle insurance"
        title="Impound Insurance"
        description="Impound insurance is a specialized type of vehicle insurance required to release a car from a police impound. Most car insurance policies don’t meet the requirements for impounded vehicles, which is where impound insurance comes in."
        features={features}
        insuranceType="impound"
      />
      <div className={"centeredContent"}>
        <ServiceDescription
          services={[
            "The cover you need to release your car from the impound",
            "30 days cover (legal minimum length required for release)",
            "Immediate cover. Save on impound storage fees",
          ]}
          title="Impound Vehicle Insurance"
          description="Temporary impound insurance allows you to release your car quickly
                  and easily."
          img={{
            src: "/svg/get-quote.svg",
            alt: "impound vehicle insurance",
            width: 610,
            height: 393,
          }}
          button="Get a Quote"
        />
        <OurBenifits
          benifits={benifits}
          title="Why might your vehicle be impounded?"
        />
        <WhenImpound />

        <ServiceCovered
          title="What does impound vehicle insurance cover?"
          description="Limitless Cover collaborates with a panel of insurers to offer comprehensive car insurance coverage. As a result, the full details of your cover may vary based on your chosen insurer. With our impound car insurance policies lasting 30 days, you’ll enjoy the flexibility to decide your car’s next step after recovery - whether selling it, declaring it SORN, or returning it to the road. Please review the policy wording carefully before purchasing."
          covered={impoundCoverDetails.covered}
          unCovered={impoundCoverDetails.unCovered}
        />
        <Eligability data={impoundEligibility} />
        <div className={styles.paymentOptions}>
          <PaymentOptions />
        </div>
        <div className={styles.questions}>
          <h2
            className={`${styles.questionsTitle} ${plusJakartaSans.className}`}
          >
            Frequently asked<span> questions</span>
          </h2>
          <QuestionsGroup questions={questions} />
        </div>
      </div>
    </div>
  );
};

export default Page;
