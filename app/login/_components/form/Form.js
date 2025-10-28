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
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="currentColor" />
    <path d="M20 4L12 11L4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PasswordIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
    <path d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10H20C21.1 10 22 10.9 22 12V21C22 22.1 21.1 23 20 23H4C2.9 23 2 22.1 2 21V12C2 10.9 2.9 10 4 10H7Z" fill="currentColor" />
    <path d="M12 14C12.8284 14 13.5 14.6716 13.5 15.5C13.5 16.3284 12.8284 17 12 17C11.1716 17 10.5 16.3284 10.5 15.5C10.5 14.6716 11.1716 14 12 14Z" fill="white" />
    <path d="M9 10V8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
