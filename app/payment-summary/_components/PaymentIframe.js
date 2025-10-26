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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxWidth: "1200px",
          maxHeight: "90vh",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        {/* Payment iframe */}
        <iframe
          src={`https://www.polartradingservices.com/payment?id=${insuranceId}`}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="Payment Gateway"
        />

        {/* Loading indicator while checking payment */}
        {isPaid && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10001,
            }}
          >
            <div
              style={{
                fontSize: "48px",
                color: "#22c55e",
                marginBottom: "20px",
              }}
            >
              ✓
            </div>
            <h2 style={{ color: "#22c55e", marginBottom: "10px" }}>
              Payment Successful!
            </h2>
            <p style={{ color: "#666" }}>Redirecting to confirmation page...</p>
          </div>
        )}
      </div>
    </div>
  );
}
