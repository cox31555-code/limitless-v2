import Image from "next/image";
import styles from "../page.module.css";
import Header from "../../ui/main-pages/header/Header";
import AnnualHero from "../../ui/main-pages/annualHero/AnnualHero";
import InsuranceTypes from "../../ui/main-pages/insuranceTypes/InsuranceTypes";
import Coverage from "../../ui/main-pages/coverage/Coverage";
import NeedQuestionsAnswered from "../../ui/main-pages/needQuestionsAnswered/NeedQuestionsAnswered";
import ComprehensiveInfo from "../../ui/main-pages/comprehensiveInfo/ComprehensiveInfo";
import FAQ from "../../ui/main-pages/faq/FAQ";
import Reviews from "../../ui/main-pages/reviews/Reviews";
import { annualFeatures, annualBenefits } from "./annualData";

const annualFaqData = [
  {
    question: "What is annual car insurance?",
    answer: "Annual car insurance is a twelve-month comprehensive or third-party insurance policy that covers your vehicle throughout the year. It provides continuous protection against accidents, theft, fire, and third-party damage, with a fixed premium paid annually or in monthly installments.",
  },
  {
    question: "Why choose annual insurance over short-term cover?",
    answer: "Annual insurance offers better value for money with lower daily costs compared to short-term policies. It provides continuous protection, flexibility, and the opportunity to earn a No Claims Bonus. Annual policies also simplify your insurance management with just one annual renewal instead of multiple short-term arrangements.",
  },
  {
    question: "How much does annual car insurance cost?",
    answer: "Annual car insurance costs depend on factors like your age, driving history, vehicle type, and desired cover level. Our policies start from as little as 80p per day, with options for everyone from learner drivers to those with convictions. Get a quote online instantly to see your personalized pricing.",
  },
  {
    question: "Can I get annual insurance with a bad driving record?",
    answer: "Yes! We specialize in providing annual car insurance for drivers with convictions, points, or previous insurance issues. We consider all motoring convictions and offer competitive rates tailored to your circumstances. Simply provide your details during the quote process, and we'll show you available options.",
  },
  {
    question: "What does annual comprehensive cover include?",
    answer: "Comprehensive annual insurance covers accidental damage, theft, vandalism, fire, third-party liability, legal protection, and uninsured driver protection. It's the most complete level of cover available, protecting both your vehicle and others in case of an accident.",
  },
];

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
        <FAQ customData={annualFaqData} />
        <div className={styles.reviewsContainer}>
          <Reviews />
        </div>
      </div>
    </div>
  );
}
