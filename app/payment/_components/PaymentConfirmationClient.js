"use client";

import Header from "./header/Header";
import OrderSummery from "./orderSummery/OrderSummery";
import VehicleDetails from "@/app/payment-summary/_components/vehicleDetails/VehicleDetails";
import CoverDetails from "@/app/payment-summary/_components/coverDetails/CoverDetails";
import PersonalDetails from "@/app/payment-summary/_components/personalDetails/PersonalDetails";
import CoverLevel from "@/app/payment-summary/_components/coverLevel/CoverLevel";
import styles from "../page.module.css";
import paymentSummaryStyles from "@/app/payment-summary/page.module.css";
import { redirect } from "next/navigation";

export default function PaymentConfirmationClient({ insuranceData }) {
  const { quote } = insuranceData;
  console.log("quote", quote);
  console.log(`/payment-summary?id=${insuranceData?._id}`);
  if (quote.paid === false || !quote.sumupData) {
    redirect(`/payment-summary?id=${insuranceData?._id}`);
  }

  return (
    <div>
      <Header title="Thank you for your purchase" />
      <div className={"centeredContent"}>
        <div className={paymentSummaryStyles.orderSummeryContainer}>
          <div className={paymentSummaryStyles.orderSummery}>
            <OrderSummery
              data={insuranceData.quote}
              vehicleDetails={insuranceData.vehicleDetails}
              carUsage={insuranceData.carUsage}
            />
          </div>
          <div className={paymentSummaryStyles.coverLevel}>
            <CoverLevel
              data={insuranceData.quote}
              insuranceType={insuranceData.type}
            />
          </div>
        </div>

        <div className={paymentSummaryStyles.container}>
          <div className={paymentSummaryStyles.first}>
            <VehicleDetails
              data={insuranceData.vehicleDetails}
              carUsage={insuranceData.carUsage}
            />
            <CoverDetails data={insuranceData.coverDetails} />
            <PersonalDetails
              data={insuranceData.userDetails}
              carUsage={insuranceData.carUsage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
