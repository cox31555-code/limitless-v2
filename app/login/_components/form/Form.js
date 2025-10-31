"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema } from "@/utils/authSchemas";

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
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Access your insurance dashboard</p>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

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

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Password</label>
              <div
                className={`${styles.inputField} ${errors.password ? styles.fieldError : ""}`}
                onClick={() => passwordInputRef.current?.focus()}
              >
                <svg className={styles.fieldIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C6.48 1 2 5.48 2 11V21C2 22.1046 2.89543 23 4 23H20C21.1046 23 22 22.1046 22 21V11C22 5.48 17.52 1 12 1ZM12 3C16.41 3 20 6.59 20 11H4C4 6.59 7.59 3 12 3ZM12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16Z" fill="currentColor"/>
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
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
                <span className={styles.errorText}>{errors.password.message}</span>
              )}
              <a href="/forget-password" className={styles.forgotLink}>
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <span className={styles.buttonText}>
              {isSubmitting ? "Signing in..." : "Sign In"}
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
            New to Limitless Cover? <a href="/temporary/get-quote" className={styles.signupLink}>Get a quote</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
