import Image from "next/image";
import styles from "./page.module.css";
import Header from "../ui/main-pages/header/Header";
import ChooseService from "../ui/main-pages/chooseService/ChooseService";
import OurBenifits from "../ui/main-pages/ourBenifits/OurBenifits";
import NeedQuestionsAnswered from "../ui/main-pages/needQuestionsAnswered/NeedQuestionsAnswered";
import Reviews from "../ui/main-pages/reviews/Reviews";
import { homeFeatures, homeBenefits } from "./homeData";

export const metadata = {
  title: "Cheapest Impound & Temporary Insurance | Limitless Cover",
};

export default function Home() {
  const features = homeFeatures;
  const benifits = homeBenefits;

  return (
    <div className={styles.page}>
      <Header
        subTitle="Welcome Back! We've Got You Covered."
        title="Quick and affordable vehicle insurance"
        description="Join 1 million+ drivers getting a great deal on short-term and annual car insurance cover. Drive for hours, days, weeks, or all year round with affordable, fully comprehensive policies. It's quick, easy, and all sorted from your phone."
        features={features}
      />
      <div className={"centeredContent"}>
        <ChooseService />
        <OurBenifits
          benifits={benifits}
          title="Why Choose Limitless Cover"
          description="Discover the benefits of Limitless Cover, showcasing quick and flexible options for UK drivers. Whether a young driver, courier, or reclaiming an impounded vehicle, our tailored solutions provide instant coverage suited to your needs, with inclusivity for all."
        />
        <NeedQuestionsAnswered />
        <div className={styles.reviewsContainer}>
          <Reviews />
        </div>
      </div>
    </div>
  );
}
