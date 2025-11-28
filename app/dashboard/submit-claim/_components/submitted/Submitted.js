"use client";
import React, { useEffect, useState } from "react";
import styles from "./submitted.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Submitted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderReference, setOrderReference] = useState("");

  // Get order reference from URL params (set during form submission)
  useEffect(() => {
    const urlOrderRef = searchParams.get("orderReference");
    if (urlOrderRef) {
      setOrderReference(urlOrderRef);
      console.log("Order reference found in URL:", urlOrderRef);
    } else {
      console.warn("No orderReference found in URL params");
    }

    // Clean up sessionStorage claim data since we're done
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("claimData");
    }
  }, [searchParams]);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans.className}`}>
              Claim submitted
            </h1>
            <p className={styles.greetingSubtitle}>
              Your claim has been successfully submitted and is being processed
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Submit a Claim</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Submitted</span>
      </div>

      {/* Content Wrapper */}
      <div className={styles.contentWrapper}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <Image
              src="/svg/submitted.svg"
              alt="submitted"
              width={136}
              height={151}
              className={styles.submittedImage}
            />
          </div>

          <div className={`${styles.title} ${plusJakartaSans.className}`}>
            Claim Successfully
            <div className={styles.titleSpan}>
              submitted
              <Image
                src="/svg/curved-border.svg"
                alt="curved border"
                width={393}
                height={3}
                className={styles.curvedBorder}
              />
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <div className={styles.headerItem}>
                <Image
                  src="/svg/insurance-quote.svg"
                  alt="order-summary"
                  width={36}
                  height={36}
                  className={styles.headerItemIcon}
                />
                <p className={styles.headerItemTitle}>Order Reference</p>
              </div>
              <p className={styles.headerItemValue}>
                {orderReference ? `#${orderReference}` : "#Loading..."}
              </p>
            </div>
          </div>

          <p className={styles.description}>
            Your claim has been submitted successfully. You can track its progress in your claims portal.
          </p>

          <div className={styles.actionButtons}>
            <button
              className={styles.claimsPortalBtn}
              onClick={() => router.push("/dashboard/claims")}
            >
              <span>Go to Claims Portal</span>
              <Image
                src="/svg/blue-right.svg"
                alt="arrow-right"
                width={28}
                height={14}
              />
            </button>
            <button
              className={styles.dashboardBtn}
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submitted;
