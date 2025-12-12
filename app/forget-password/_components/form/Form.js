"use client";
import React, { useState, useRef } from "react";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/utils/authSchemas";
import { useAuth } from "@/contexts/AuthContext";

const Form = () => {
  const router = useRouter();
  const {
    forgotPassword,
    isLoading,
    error,
    forgotPasswordSuccess,
    clearError,
    clearSuccessStates,
  } = useAuth();

  const emailInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await forgotPassword(data.email);

    if (!result.success) {
      setError("email", { message: result.message });
    }
  };

  if (forgotPasswordSuccess) {
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Check Your Email</h1>
            <p className={styles.subtitle}>
              We've sent you a password reset link. Please check your email and follow the instructions to reset your password.
            </p>
          </div>

          <button
            type="button"
            className={styles.submitButton}
            onClick={() => {
              clearSuccessStates();
              router.push("/login");
            }}
          >
            <span className={styles.buttonText}>Go to Login</span>
            <svg className={styles.buttonIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Enter your email address and we'll send you a link to reset your password</p>
        </div>

        {(error || errors.root) && (
          <div className={styles.errorMessage}>
            {error || errors.root?.message}
          </div>
        )}

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
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            <span className={styles.buttonText}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </span>
            {!isLoading && (
              <svg className={styles.buttonIcon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Remember your password? <a href="/login" className={styles.signupLink}>Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
