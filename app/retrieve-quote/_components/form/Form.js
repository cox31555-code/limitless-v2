"use client";
import React, { useState, useRef } from "react";
import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const retrieveQuoteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  quoteReference: z.string().min(4, "Please enter a valid quote reference").refine((val) => val.startsWith("LC-") && val.length > 3, {
    message: "Quote reference must start with LC- and contain additional characters",
  }),
});

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteRef, setQuoteRef] = useState("LC-");
  const emailInputRef = useRef(null);
  const referenceInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(retrieveQuoteSchema),
    defaultValues: {
      email: "",
      quoteReference: "LC-",
    },
  });

  const handleQuoteRefChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    const fullValue = "LC-" + inputValue;

    setQuoteRef(fullValue);
    setValue("quoteReference", fullValue, { shouldValidate: true });
  };

  const handleQuoteRefKeyDown = (e) => {
    // No special handling needed since prefix is separate
  };

  const handleQuoteRefClick = (e) => {
    // No special handling needed since prefix is separate
  };

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
        setQuoteRef("LC-");
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.fieldWrapper}>
              <div
                className={`${styles.inputField} ${errors.email ? styles.fieldError : ""}`}
                onClick={() => emailInputRef.current?.focus()}
              >
                <input
                  type="email"
                  placeholder="Enter email address"
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
              <div
                className={`${styles.inputField} ${styles.inputFieldWithPrefix} ${errors.quoteReference ? styles.fieldError : ""}`}
                onClick={() => {
                  referenceInputRef.current?.focus();
                  // Move cursor to end after "LC-"
                  setTimeout(() => {
                    if (referenceInputRef.current) {
                      const len = referenceInputRef.current.value.length;
                      referenceInputRef.current.setSelectionRange(len, len);
                    }
                  }, 0);
                }}
              >
                <span className={styles.inputPrefix}>LC-</span>
                <input
                  type="text"
                  placeholder="2024-001234"
                  className={`${styles.input} ${styles.inputWithPrefix}`}
                  value={quoteRef.slice(3)}
                  onChange={handleQuoteRefChange}
                  onKeyDown={handleQuoteRefKeyDown}
                  onClick={handleQuoteRefClick}
                  ref={referenceInputRef}
                  name="quoteReference"
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
