import Image from "next/image";
import styles from "../page.module.css";
import Header from "../../ui/main-pages/header/Header";
import AnnualHero from "../../ui/main-pages/annualHero/AnnualHero";
import InsuranceTypes from "../../ui/main-pages/insuranceTypes/InsuranceTypes";
import Coverage from "../../ui/main-pages/coverage/Coverage";
import NeedQuestionsAnswered from "../../ui/main-pages/needQuestionsAnswered/NeedQuestionsAnswered";
import ComprehensiveInfo from "../../ui/main-pages/comprehensiveInfo/ComprehensiveInfo";
import AnnualFAQ from "../../ui/main-pages/annualFaq/AnnualFAQ";
import Reviews from "../../ui/main-pages/reviews/Reviews";
import { annualFeatures, annualBenefits } from "./annualData";

export const metadata = {
  title: "Annual Car Insurance | Limitless Cover",
};

export default function Annual() {
  const features = annualFeatures;
  const benifits = annualBenefits;

  return (
    <div className={styles.page}>
      <Header
        subTitle="Welcome Back! We've Got You Covered."
        title="Affordable annual car insurance"
        description="Get comprehensive annual car insurance coverage with Limitless Cover. Drive all year with affordable, fully comprehensive policies. It's quick, easy, and all sorted from your phone."
        features={features}
      />
      <div className={"centeredContent"}>
        <AnnualHero />
        <InsuranceTypes />
        <Coverage />
        <NeedQuestionsAnswered />
        <ComprehensiveInfo />
        <AnnualFAQ />
        <div className={styles.reviewsContainer}>
          <Reviews />
        </div>
      </div>
    </div>
  );
}
