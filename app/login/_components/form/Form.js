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
          <a href="/forget-password" className={styles.forgotPasswordLink}>
            Forgot your password?
          </a>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Form;
