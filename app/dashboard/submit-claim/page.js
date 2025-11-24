"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import ClaimFeature from "./_components/claimFeature/ClaimFeature";
import { Plus_Jakarta_Sans } from "next/font/google";
import Submitted from "./_components/submitted/Submitted";
import ClaimReason from "./_components/claimReason/ClaimReason";
import Guidelines from "./_components/guidelines/Guidelines";
import Form from "./_components/form/Form";
import NeedHelpSection from "@/ui/layout/NeedHelpSection";
import { firstClaim, secondClaim, guidelinesData } from "./data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const SubmitClaimContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const step = searchParams.get("step");
  const reason = searchParams.get("reason");

  // Determine current step based on URL parameters
  let currentStep = 0;
  if (step === "submitted") {
    currentStep = 3;
  } else if (step === "form") {
    currentStep = 2;
  } else if (step === "reason") {
    currentStep = 1;
  } else if (type === "optional-cover") {
    currentStep = 0;
  } else if (!type && !step) {
    currentStep = 0; // Default claim selection
  }

  useEffect(() => {
    // Save current step data to sessionStorage
    if (typeof window !== "undefined") {
      const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");

      if (type) claimData.type = type;
      if (reason) claimData.reason = reason;

      sessionStorage.setItem("claimData", JSON.stringify(claimData));
    }
  }, [type, reason]);

  useEffect(() => {
    // Validate step access for car insurance flow only when necessary
    if (type === "car-insurance" && typeof window !== "undefined") {
      const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");

      // Check if user is trying to access step 2 without reason
      if (step === "form" && !reason && !claimData.reason) {
        router.replace(
          "/dashboard/submit-claim?type=car-insurance&step=reason"
        );
        return;
      }

      // Check if user is trying to access step 3 without form data
      if (step === "submitted" && !claimData.formData) {
        router.replace("/dashboard/submit-claim");
        return;
      }
    }
  }, [type, step, reason, router]);

  // Render different components based on search params
  const renderContent = () => {
    // If submitted successfully
    if (step === "submitted") {
      return <Submitted />;
    }

    // If optional cover claims selected - show guidelines only
    if (type === "optional-cover") {
      return <Guidelines data={guidelinesData} />;
    }

    // If car insurance claims selected
    if (type === "car-insurance") {
      // Show form if on form step
      if (step === "form") {
        return (
          <div className={styles.fullWidthContainer}>
            <Form claimReason={reason} />
          </div>
        );
      }

      // Show claim reason selection if on reason step
      if (step === "reason") {
        return (
          <div className={styles.fullWidthContainer}>
            <ClaimReason />
          </div>
        );
      }
    }

    // Default view - show claim selection with new design
    return (
      <>
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
                Submit a claim
              </h1>
              <p className={styles.greetingSubtitle}>
                Let us know what happened and we&apos;ll guide you through the claims process
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbItem}>Dashboard</span>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={`${styles.breadcrumbItem} ${styles.active}`}>Submit a Claim</span>
        </div>

        {/* Content Section */}
        <div className={styles.contentWrapper}>
          <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>Choose your claim type</h2>
            <p className={styles.pageSubtitle}>Select the type of claim you need to submit</p>
          </div>

          <div className={styles.claimsGrid}>
            <ClaimFeature
              img={firstClaim.img}
              title={firstClaim.title}
              description={firstClaim.description}
              features={firstClaim.features}
              btnText="Make a car insurance claim"
              claimType="car-insurance"
            />
            <ClaimFeature
              img={secondClaim.img}
              title={secondClaim.title}
              description={secondClaim.description}
              features={secondClaim.features}
              btnText="Optional cover claim"
              claimType="optional-cover"
            />
          </div>
        </div>

        <NeedHelpSection />
      </>
    );
  };

  return (
    <div className={styles.page}>{renderContent()}</div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className={styles.loadingContainer}>
          Loading...
        </div>
      }
    >
      <SubmitClaimContent />
    </Suspense>
  );
};

export default Page;
