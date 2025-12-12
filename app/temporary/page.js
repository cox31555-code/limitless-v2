import React from "react";
import Header from "@/ui/main-pages/header/Header";
import OurBenifits from "@/ui/main-pages/ourBenifits/OurBenifits";
import ServiceDescription from "@/ui/main-pages/serviceDescription/ServiceDescription";
import {
  features,
  benifits,
  temporaryCoverDetails,
  temporaryEligibility,
} from "./data";
import ServiceCovered from "@/ui/main-pages/serviceCovered/ServiceCovered";
import Eligability from "@/ui/main-pages/eligability/Eligability";
import PaymentOptions from "@/ui/main-pages/paymentsOptions/PaymentOptions";
import styles from "./page.module.css";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { questions } from "./data";
import { Plus_Jakarta_Sans } from "next/font/google";
import TemporaryCover from "./_components/temporaryCover/TemporaryCover";
import Explaining from "./_components/explaining/Explaining";
import Calculator from "./_components/calculator/Calculator";

export const metadata = {
  title: "Temporary Insurance | Get Insured for 1 Hour to 28 Days | Limitless Cover",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const page = () => {
  return (
    <div>
      <Header
        subTitle="specialized for vehicle insurance"
        title="Temporary Insurance"
        description="Temporary insurance is a highly flexible solution designed to meet your short-term coverage needs. Whether you’re borrowing a car, test-driving a vehicle, or need immediate protection for a new purchase, temporary car insurance can provide tailored cover for as little as a single day, extending up to several months. "
        features={features}
        insuranceType="temporary"
      />
      <div className={"centeredContent"}>
        <ServiceDescription
          img={{
            src: "/svg/temporary-vehiclee.svg",
            alt: "temporary vehicle insurance",
            width: 641,
            height: 565,
          }}
          services={[
            "Get flexible cover that's right for you with policies from just 1 hour up to 28 days",
            "Only pay for cover as and when you need it",
            "No impact on your no claims discount plus fully comprehensive cover as standard",
          ]}
          title="Temporary vehicle insurance"
          description="Temporary insurance allows you to drive on the go quickly and conveniently"
          button="Get a Quote"
        />
        <OurBenifits
          benifits={benifits}
          title="Am I eligible for temporary insurance?"
        />
        <Explaining />
        <ServiceCovered
          title="What does temporary vehicle insurance cover?"
          description={temporaryCoverDetails.description}
          covered={temporaryCoverDetails.covered}
          unCovered={temporaryCoverDetails.unCovered}
        />
        <Calculator />
        <TemporaryCover />
        <Eligability data={temporaryEligibility} />
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

export default page;
