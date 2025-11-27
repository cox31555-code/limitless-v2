"use client";
import React, { useState } from "react";
import styles from "./quotesPageClient.module.css";
import QuoteCard from "./quoteCard/QuoteCard";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const QuotesPageClient = () => {
  const [activeTab, setActiveTab] = useState("active");

  const quotes = [
    {
      id: 1,
      cashback: "£49",
      policyType: "PAY PER MILE",
      title: "Pay Per Mile",
      description: "Requires self-installed mileage tracker for mileage tracking. Flat-rate option available.",
      policyholderName: "John Smith",
      vehicleReg: "LN60 AYT",
      vehicleMake: "Ford",
      vehicleModel: "Fiesta",
      createdDate: "15 Jan 2024",
      expiresInDays: 28,
      pricePerMonth: "13.50",
      times: "11x",
      deposit: "121.87",
      total: "283.87",
      excessDetails: {
        voluntary: "250",
        compulsory: "350",
        total: "600",
      },
      optionalExtras: [
        { label: "Legal Cover", included: true },
        { label: "Courtesy Car", included: true },
        { label: "Windscreen Cover", included: false },
        { label: "Breakdown Included", included: true },
        { label: "Personal Injury", included: false },
      ],
      buttonText: "View Quote",
    },
    {
      id: 2,
      cashback: "£35",
      policyType: "ANNUAL",
      title: "Annual Premium",
      description: "Standard annual insurance with fixed premium and comprehensive coverage.",
      policyholderName: "Sarah Johnson",
      vehicleReg: "SM21 UOL",
      vehicleMake: "Volkswagen",
      vehicleModel: "Golf",
      createdDate: "18 Jan 2024",
      expiresInDays: 25,
      pricePerMonth: "28.99",
      times: "11x",
      deposit: "0",
      total: "347.88",
      excessDetails: {
        voluntary: "250",
        compulsory: "350",
        total: "600",
      },
      optionalExtras: [
        { label: "Legal Cover", included: true },
        { label: "Courtesy Car", included: true },
        { label: "Windscreen Cover", included: true },
        { label: "Breakdown Included", included: false },
        { label: "Personal Injury", included: true },
      ],
      buttonText: "View Quote",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea} suppressHydrationWarning>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans?.className || ""}`}>
              Your Quotes
            </h1>
            <p className={styles.greetingSubtitle}>
              Review and compare your insurance quotes
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Quotes</span>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        {/* Header with Description */}
        <div className={styles.contentHeader}>
          <div className={styles.contentHeaderText}>
            <h2 className={styles.contentTitle}>Your Quotes</h2>
            <p className={styles.contentSubtitle}>Review your available insurance quotes and choose the best option for you</p>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className={styles.quotesGrid}>
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </div>

      <NeedHelpSection />
    </div>
  );
};

export default QuotesPageClient;
