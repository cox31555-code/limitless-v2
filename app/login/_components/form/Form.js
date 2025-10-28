"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema } from "@/utils/authSchemas";

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
    <path d="M3 5C2 5 1 6 1 7V17C1 18 2 19 3 19H21C22 19 23 18 23 17V7C23 6 22 5 21 5H3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 7L12 13.5L23 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PasswordIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
    <circle cx="9" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13 12H21C21.55 12 22 12.45 22 13V15C22 15.55 21.55 16 21 16H14V18C14 19.1 13.1 20 12 20H8C6.9 20 6 19.1 6 18V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 15V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, error, isAuthenticated, clearError } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      if (
        message.toLowerCase().includes("login") ||
        message.toLowerCase().includes("error") ||
        message.toLowerCase().includes("authentication")
      ) {
        setSuccessMessage("");
      } else {
        setSuccessMessage(message);
      }
      const newUrl = window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const onSubmit = async (data) => {
    clearError();
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError("root", { message: result.message });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Enter your credentials to access your portal</p>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {(error || errors.root) && (
        <div className={styles.errorMessage}>
          {error || errors.root?.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>EMAIL ADDRESS</label>
          <div
            className={`${styles.inputWrapper} ${errors.email ? styles.inputError : ""}`}
            onClick={() => emailInputRef.current?.focus()}
          >
            <div className={styles.iconContainer}>
              <EmailIcon />
            </div>
            <input
              type="email"
              placeholder="Enter Email Address"
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
            <span className={styles.fieldError}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>PASSWORD</label>
          <div
            className={`${styles.inputWrapper} ${errors.password ? styles.inputError : ""}`}
            onClick={() => passwordInputRef.current?.focus()}
          >
            <div className={styles.iconContainer}>
              <PasswordIcon />
            </div>
            <input
              type="password"
              placeholder="Enter your password..."
              className={styles.input}
              {...(() => {
                const { ref, ...rest } = register("password");
                return {
                  ...rest,
                  ref: (e) => {
                    ref(e);
                    passwordInputRef.current = e;
                  },
                };
              })()}
            />
          </div>
          {errors.password && (
            <span className={styles.fieldError}>{errors.password.message}</span>
          )}
        </div>

        <div className={styles.forgotPasswordWrapper}>
          <a href="/forgot-password" className={styles.forgotPasswordLink}>
            Forgot your password?
          </a>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "LOGIN"}
          <ArrowIcon />
        </button>
      </form>
    </div>
  );
};

export default Form;
