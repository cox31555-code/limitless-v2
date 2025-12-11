"use client";
import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import DashboardHero from "@/ui/dashboard/DashboardHero";
import ClaimFeature from "./_components/claimFeature/ClaimFeature";
import { firstClaim, secondClaim, guidelinesData } from "./data";

// Lazy load heavy sections
const Submitted = dynamic(() => import("./_components/submitted/Submitted"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const ClaimReason = dynamic(() => import("./_components/claimReason/ClaimReason"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const Guidelines = dynamic(() => import("./_components/guidelines/Guidelines"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const Form = dynamic(() => import("./_components/form/Form"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
});

const NeedHelpSection = dynamic(() => import("@/ui/layout/NeedHelpSection"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>,
  ssr: false,
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

    // If optional cover claims selected - show guidelines with full structure
    if (type === "optional-cover") {
      return <Guidelines data={guidelinesData} />;
    }

    // If car insurance claims selected
    if (type === "car-insurance") {
      // Show form if on form step
      if (step === "form") {
        return <Form claimReason={reason} />;
      }

      // Show claim reason selection if on reason step
      if (step === "reason") {
        return <ClaimReason />;
      }
    }

    // Default view - show claim selection with new design
    return (
      <>
        <DashboardHero
          title="Submit a claim"
          subtitle="Let us know what happened and we'll guide you through the claims process"
        />

        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbItem}>Dashboard</span>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span className={styles.breadcrumbItem}>Manage Claims</span>
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

        <Suspense fallback={<div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading...</div>}>
          <NeedHelpSection />
        </Suspense>
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
