import Image from "next/image";
import styles from "../page.module.css";
import Header from "../../ui/main-pages/header/Header";
import ChooseService from "../../ui/main-pages/chooseService/ChooseService";
import OurBenifits from "../../ui/main-pages/ourBenifits/OurBenifits";
import QuestionsAnswered from "../../ui/main-pages/questionsAnswered/QuestionsAnswered";
import Reviews from "../../ui/main-pages/reviews/Reviews";

export const metadata = {
  title: "Annual Car Insurance | Limitless Cover",
};

export default function Annual() {
  const features = [
    {
      img: {
        src: "/svg/insurance-types.svg",
        alt: "insurance types",
        width: 64,
        height: 64,
      },
      title: "Multiple Insurance Types",
      description: "Get covered for comprehensive annual car insurance plans",
    },
    {
      img: {
        src: "/svg/all-ages.svg",
        alt: "age eligibility",
        width: 64,
        height: 64,
      },
      title: "All Ages Welcome",
      description: "Available to drivers aged 18-75 years old",
    },
    {
      img: {
        src: "/svg/vehicle-types.svg",
        alt: "vehicle eligibility",
        width: 64,
        height: 64,
      },
      title: "Any Vehicle Type",
      description: "Cars, vans, scooters, motor-homes and more",
    },
  ];
  const benifits = [
    {
      title: "No hidden fees - what you see is what you get",
      img: {
        src: "/svg/transparent.svg",
        alt: "transparent",
        width: 110,
        height: 105,
      },
    },
    {
      title: "Flexible annual coverage with no surprises.",
      img: {
        src: "/svg/flexible.svg",
        alt: "flexible",
        width: 130,
        height: 105,
      },
    },
    {
      title:
        "No long delays or phone calls to solve a claim - all claims are handled online.",
      img: {
        src: "/svg/fast.svg",
        alt: "transparent",
        width: 110,
        height: 105,
      },
    },
    {
      title:
        "Accessible to all drivers - all valid license holders aged 17+ are eligible for a quote",
      img: {
        src: "/svg/accessible.svg",
        alt: "accessible",
        width: 100,
        height: 105,
      },
    },
    {
      title:
        "Competitive annual rates - get affordable year-round coverage with Limitless Cover.",
      img: {
        src: "/svg/cheapest.svg",
        alt: "cheapest",
        width: 100,
        height: 105,
      },
    },
    {
      title:
        "No risk of driving uninsured as we upload to the Motor Insurance Database every day, 365 days a year.",
      img: {
        src: "/svg/no-risk.svg",
        alt: "no-risk",
        width: 125,
        height: 105,
      },
    },
  ];

  return (
    <div className={styles.page}>
      <Header
        subTitle="Welcome Back! We've Got You Covered."
        title="Affordable annual car insurance"
        description="Get comprehensive annual car insurance coverage with Limitless Cover. Drive all year with affordable, fully comprehensive policies. It's quick, easy, and all sorted from your phone."
        features={features}
      />
      <div className={"centeredContent"}>
        <ChooseService />
        <OurBenifits
          benifits={benifits}
          title="Why Choose Limitless Cover Annual"
          description="Discover the benefits of Limitless Cover's annual insurance plans, providing comprehensive coverage for UK drivers year-round. Get instant coverage tailored to your needs, with inclusivity and affordability for all drivers."
        />
        <QuestionsAnswered />
        <div className={styles.reviewsContainer}>
          <Reviews />
        </div>
      </div>
    </div>
  );
}
