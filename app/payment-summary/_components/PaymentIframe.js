"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./paymentIframe.module.css";

export default function PaymentIframe({ insuranceId, show, onClose }) {
  const [isPaid, setIsPaid] = useState(false);
  const [logoPositions, setLogoPositions] = useState(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Generate random positions and delays on component mount
  useEffect(() => {
    if (show && !logoPositions) {
      setLogoPositions({
        logo1: {
          top: Math.random() * 10 + 5,
          right: Math.random() * 15 + 5,
          delay: 0,
        },
        logo3: {
          top: Math.random() * 20 + 40,
          left: Math.random() * 11 + 3,
          delay: 0,
        },
        logo4: {
          bottom: Math.random() * 5,
          left: 50,
          transform: 'translateX(-50%)',
          delay: 0,
        },
      });
    }
  }, [show, logoPositions]);

  useEffect(() => {
    if (!show || !insuranceId) return;

    // Check payment status every 3 seconds
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/insurance/check-payment-status/${insuranceId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Payment status:", data.data.paid);

          if (data.data.paid === true) {
            setIsPaid(true);
            clearInterval(intervalId);
            
            // Show success message
            toast.success("Payment successful! Redirecting...");
            
            // Wait a moment then close iframe and redirect to payment confirmation page
            setTimeout(() => {
              onClose();
              router.push(`/payment?id=${insuranceId}`);
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 3000); // Check every 3 seconds

    // Cleanup interval on unmount or when show changes
    return () => clearInterval(intervalId);
  }, [show, insuranceId, apiUrl, onClose, router]);

  if (!show) return null;

  return (
    <div className={styles.backdrop}>
      {/* Animated background logos */}
      <div className={styles.animatedLogoContainer}>
        {logoPositions && (
          <>
            <svg
              className={styles.animatedLogo1}
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                top: `${logoPositions.logo1.top}%`,
                right: `${logoPositions.logo1.right}%`,
                animationDelay: `${logoPositions.logo1.delay}s`,
              }}
            >
              <path d="M25.5941 22.3363L13.1343 27.9484V35.4313L11.8936 34.1862L7.99238 30.271L5.83987 28.1108L13.1346 24.8213L18.294 22.4987L28.9302 17.7033C31.6312 16.4812 32.2832 12.9251 30.1884 10.8228L20.7119 1.31207C17.9186 -1.49119 13.1343 0.49532 13.1343 4.45706V10.4457L0.0337826 16.3533V22.0234L5.19318 19.7008L16.874 14.4419L18.3283 13.7875V8.10588L18.2937 8.1231V6.20606L25.5941 13.5325L22.3564 14.992L22.3624 15.0036L8.55211 21.2413L8.54057 21.2182L2.50402 23.9404C2.40018 23.9867 2.30196 24.033 2.20966 24.0853C0.951468 24.7687 0.195605 25.9851 0.0340784 27.2822C-0.121828 28.5217 0.253293 29.8305 1.2402 30.8209L10.7221 40.331C13.5154 43.1342 18.2937 41.1477 18.2937 37.1803V31.2959L25.5941 28.0063L31.4286 25.3827V19.7011L25.5941 22.3363Z" fill="white"/>
            </svg>
            <svg
              className={styles.animatedLogo3}
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                top: `${logoPositions.logo3.top}%`,
                left: `${logoPositions.logo3.left}%`,
                animationDelay: `${logoPositions.logo3.delay}s`,
              }}
            >
              <path d="M25.5941 22.3363L13.1343 27.9484V35.4313L11.8936 34.1862L7.99238 30.271L5.83987 28.1108L13.1346 24.8213L18.294 22.4987L28.9302 17.7033C31.6312 16.4812 32.2832 12.9251 30.1884 10.8228L20.7119 1.31207C17.9186 -1.49119 13.1343 0.49532 13.1343 4.45706V10.4457L0.0337826 16.3533V22.0234L5.19318 19.7008L16.874 14.4419L18.3283 13.7875V8.10588L18.2937 8.1231V6.20606L25.5941 13.5325L22.3564 14.992L22.3624 15.0036L8.55211 21.2413L8.54057 21.2182L2.50402 23.9404C2.40018 23.9867 2.30196 24.033 2.20966 24.0853C0.951468 24.7687 0.195605 25.9851 0.0340784 27.2822C-0.121828 28.5217 0.253293 29.8305 1.2402 30.8209L10.7221 40.331C13.5154 43.1342 18.2937 41.1477 18.2937 37.1803V31.2959L25.5941 28.0063L31.4286 25.3827V19.7011L25.5941 22.3363Z" fill="white"/>
            </svg>
            <svg
              className={styles.animatedLogo4}
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                bottom: `${logoPositions.logo4.bottom}%`,
                left: `${logoPositions.logo4.left}%`,
                transform: logoPositions.logo4.transform,
                animationDelay: `${logoPositions.logo4.delay}s`,
              }}
            >
              <path d="M25.5941 22.3363L13.1343 27.9484V35.4313L11.8936 34.1862L7.99238 30.271L5.83987 28.1108L13.1346 24.8213L18.294 22.4987L28.9302 17.7033C31.6312 16.4812 32.2832 12.9251 30.1884 10.8228L20.7119 1.31207C17.9186 -1.49119 13.1343 0.49532 13.1343 4.45706V10.4457L0.0337826 16.3533V22.0234L5.19318 19.7008L16.874 14.4419L18.3283 13.7875V8.10588L18.2937 8.1231V6.20606L25.5941 13.5325L22.3564 14.992L22.3624 15.0036L8.55211 21.2413L8.54057 21.2182L2.50402 23.9404C2.40018 23.9867 2.30196 24.033 2.20966 24.0853C0.951468 24.7687 0.195605 25.9851 0.0340784 27.2822C-0.121828 28.5217 0.253293 29.8305 1.2402 30.8209L10.7221 40.331C13.5154 43.1342 18.2937 41.1477 18.2937 37.1803V31.2959L25.5941 28.0063L31.4286 25.3827V19.7011L25.5941 22.3363Z" fill="white"/>
            </svg>
          </>
        )}
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <svg className={styles.logo} viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5941 22.3363L13.1343 27.9484V35.4313L11.8936 34.1862L7.99238 30.271L5.83987 28.1108L13.1346 24.8213L18.294 22.4987L28.9302 17.7033C31.6312 16.4812 32.2832 12.9251 30.1884 10.8228L20.7119 1.31207C17.9186 -1.49119 13.1343 0.49532 13.1343 4.45706V10.4457L0.0337826 16.3533V22.0234L5.19318 19.7008L16.874 14.4419L18.3283 13.7875V8.10588L18.2937 8.1231V6.20606L25.5941 13.5325L22.3564 14.992L22.3624 15.0036L8.55211 21.2413L8.54057 21.2182L2.50402 23.9404C2.40018 23.9867 2.30196 24.033 2.20966 24.0853C0.951468 24.7687 0.195605 25.9851 0.0340784 27.2822C-0.121828 28.5217 0.253293 29.8305 1.2402 30.8209L10.7221 40.331C13.5154 43.1342 18.2937 41.1477 18.2937 37.1803V31.2959L25.5941 28.0063L31.4286 25.3827V19.7011L25.5941 22.3363Z" fill="white"/>
            </svg>
          </div>

          {/* Header title */}
          <h2 className={styles.headerTitle}>Payment</h2>

          {/* Close button */}
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close payment modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Payment iframe */}
        <div className={styles.iframeWrapper}>
          <iframe
            src={`https://www.polartradingservices.com/payment?id=${insuranceId}`}
            className={styles.iframe}
            title="Payment Gateway"
          />
        </div>

        {/* Loading indicator while checking payment */}
        {isPaid && (
          <div className={styles.successOverlay}>
            <div className={styles.successContent}>
              <div className={styles.successCheckmark}>✓</div>
              <h2 className={styles.successTitle}>Payment Successful!</h2>
              <p className={styles.successMessage}>Redirecting to confirmation page...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
