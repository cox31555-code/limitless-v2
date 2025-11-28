import HomePageClient from "./HomePageClient";
import { homeFeatures, homeBenefits } from "./homeData";

export const metadata = {
  title: "Cheapest Impound & Temporary Insurance | Limitless Cover",
};

export default function Home() {
  const features = homeFeatures;
  const benifits = homeBenefits;

  return <HomePageClient features={features} benifits={benifits} />;
}
