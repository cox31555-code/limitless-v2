"use client";
import React, { useState, useRef } from "react";
import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const retrieveQuoteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  quoteReference: z.string().min(1, "Quote reference is required"),
});

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailInputRef = useRef(null);
  const referenceInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(retrieveQuoteSchema),
    defaultValues: {
      email: "",
      quoteReference: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/retrieve-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          quoteReference: data.quoteReference,
        }),
      });

      if (response.ok) {
        toast.success("Quote retrieved successfully! Redirecting...");
        reset();
        setTimeout(() => {
          window.location.href = "/payment-summary";
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Unable to retrieve quote. Please check your details and try again.");
      }
    } catch (error) {
      console.error("Retrieve quote error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Find Your Quote</h1>
          <p className={styles.subtitle}>Enter your details to retrieve your quote</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Email Address</label>
              <div
                className={`${styles.inputField} ${errors.email ? styles.fieldError : ""}`}
                onClick={() => emailInputRef.current?.focus()}
              >
                <svg className={styles.fieldIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8L10.89 13.26C11.5475 13.7277 12.4525 13.7277 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={styles.input}
                  {...(() => {
                    const { ref, ...rest } = register("email");
                    return {
                      ...rest,
                      ref: (e) => {
                        ref(e);
                        emailInputRef.current = e;
                      },
                    };
                  })()}
                />
              </div>
              {errors.email && (
                <span className={styles.errorText}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Quote Reference</label>
              <div
                className={`${styles.inputField} ${errors.quoteReference ? styles.fieldError : ""}`}
                onClick={() => referenceInputRef.current?.focus()}
              >
                <svg className={styles.fieldIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 12H15M9 16H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="e.g., LC-2024-001234"
                  className={styles.input}
                  {...(() => {
                    const { ref, ...rest } = register("quoteReference");
                    return {
                      ...rest,
                      ref: (e) => {
                        ref(e);
                        referenceInputRef.current = e;
                      },
                    };
                  })()}
                />
              </div>
              {errors.quoteReference && (
                <span className={styles.errorText}>{errors.quoteReference.message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <span className={styles.buttonText}>
              {isSubmitting ? "Retrieving..." : "Retrieve Your Quote"}
            </span>
            {!isSubmitting && (
              <svg className={styles.buttonIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don't have a quote reference? <a href="/temporary/get-quote" className={styles.getQuoteLink}>Get a new quote</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
