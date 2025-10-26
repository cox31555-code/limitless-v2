"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./paymentIframe.module.css";

export default function PaymentIframe({ insuranceId, show, onClose }) {
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
      <div className={styles.container}>
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
