"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, error, isAuthenticated, clearError } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState("email");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(step === "email" ? emailSchema : passwordSchema),
    defaultValues: {
      email: enteredEmail,
      password: "",
    },
  });

  const emailValue = watch("email");

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

  const handleEmailSubmit = async (data) => {
    clearError();
    setSuccessMessage("");
    setEnteredEmail(data.email);
    setStep("password");
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 100);
  };

  const handlePasswordSubmit = async (data) => {
    // In dev mode, bypass login and go straight to dashboard
    if (process.env.NEXT_PUBLIC_DEV_MODE === "true") {
      router.push("/dashboard");
      return;
    }

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

  const onSubmit = async (data) => {
    if (step === "email") {
      await handleEmailSubmit(data);
    } else {
      await handlePasswordSubmit(data);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setShowPassword(false);
    clearError();
    setSuccessMessage("");
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        {(error || errors.root) && (
          <div className={styles.errorMessage}>
            {error || errors.root?.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {step === "email" ? (
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
            </div>
          ) : (
            <div className={styles.formGroup}>
              <div className={styles.emailDisplay}>
                <div className={styles.emailLabel}>Email</div>
                <div className={styles.emailValue}>{enteredEmail}</div>
              </div>
              <div className={styles.fieldWrapper}>
                <div
                  className={`${styles.inputField} ${errors.password ? styles.fieldError : ""}`}
                  onClick={() => passwordInputRef.current?.focus()}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
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
                  <button
                    type="button"
                    className={styles.togglePasswordButton}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className={styles.errorText}>{errors.password.message}</span>
                )}
              </div>
            </div>
          )}

          <a href="/forget-password" className={styles.forgotLink}>
            Forgot your password?
          </a>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <span className={styles.buttonText}>
              {isSubmitting ? "Processing..." : step === "email" ? "Continue" : "Login"}
            </span>
          </button>

          {step === "password" && (
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBackToEmail}
              disabled={isSubmitting}
            >
              Back
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
