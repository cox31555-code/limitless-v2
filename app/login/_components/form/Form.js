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
    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 4L12 11L4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PasswordIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
    <path d="M12 1C6.48 1 2 5.48 2 11V23H22V11C22 5.48 17.52 1 12 1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 11H17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 19H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
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
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>Welcome back. Sign in to your account to continue.</p>

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
          <div
            className={`${styles.inputWrapper} ${errors.email ? styles.inputError : ""}`}
            onClick={() => emailInputRef.current?.focus()}
          >
            <div className={styles.iconContainer}>
              <EmailIcon />
            </div>
            <input
              type="email"
              placeholder="Email address"
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
          <div
            className={`${styles.inputWrapper} ${errors.password ? styles.inputError : ""}`}
            onClick={() => passwordInputRef.current?.focus()}
          >
            <div className={styles.iconContainer}>
              <PasswordIcon />
            </div>
            <input
              type="password"
              placeholder="Password"
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

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Form;
