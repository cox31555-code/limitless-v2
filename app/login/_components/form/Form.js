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

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, error, isAuthenticated, clearError } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
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
    // In dev mode, bypass login and go straight to dashboard
    if (process.env.NEXT_PUBLIC_DEV_MODE === "true") {
      router.push("/dashboard");
      return;
    }

    clearError();
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // For now, just proceed with a default password
      // In production, this would be a two-step process
      const result = await login(data.email, "password");

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

          <a href="/forget-password" className={styles.forgotLink}>
            Forgot your password?
          </a>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <span className={styles.buttonText}>
              {isSubmitting ? "Processing..." : "Continue"}
            </span>
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            New to Limitless Cover?{" "}
            <a href="/temporary/get-quote" className={styles.signupLink}>
              Get a quote
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
