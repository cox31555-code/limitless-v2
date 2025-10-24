"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema } from "@/utils/authSchemas";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, error, isAuthenticated, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Local loading state

  // Refs for input focus
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

  // Check for message from URL params
  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      // Check if it's an error message (e.g., from middleware redirect)
      if (
        message.toLowerCase().includes("login") ||
        message.toLowerCase().includes("error") ||
        message.toLowerCase().includes("authentication")
      ) {
        // Clear any success message and let the error appear naturally on next attempt
        setSuccessMessage("");
      } else {
        setSuccessMessage(message);
      }
      // Clear the message from URL after showing it
      const newUrl = window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Clear error when component mounts or when user starts typing
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    clearError();
    setSuccessMessage("");
    setIsSubmitting(true); // Start loading

    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        setError("root", { message: result.message });
        setIsSubmitting(false); // Stop loading on error
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
      setIsSubmitting(false); // Stop loading on error
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Welcome back
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {(error || errors.root) && (
        <div
          className={styles.errorMessage}
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "1.2rem 1.6rem",
            marginBottom: "1.8rem",
            borderRadius: "12px",
            border: "1px solid #f5c6cb",
            fontSize: "1.1rem",
            fontWeight: "500",
            lineHeight: "140%",
            letterSpacing: "0.2px",
          }}
        >
          {error || errors.root?.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <div
              className={styles.inputContainer}
              onClick={() => emailInputRef.current?.focus()}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={"/svg/email.svg"}
                  alt="email"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="email"
                id="email"
                placeholder="Enter Email Address"
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
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
              <span
                className={styles.errorMessage}
                style={{ color: "#dc3545", fontSize: "0.875rem" }}
              >
                {errors.email.message}
              </span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div
              className={styles.inputContainer}
              onClick={() => passwordInputRef.current?.focus()}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={"/svg/password.svg"}
                  alt="password"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password.."
                className={`${styles.input} ${
                  errors.password ? styles.error : ""
                }`}
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
                className={styles.eyeButton}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline className={styles.eyeIcon} />
                ) : (
                  <IoEyeOutline className={styles.eyeIcon} />
                )}
              </button>
            </div>
            {errors.password && (
              <span
                className={styles.errorMessage}
                style={{ color: "#dc3545", fontSize: "0.875rem" }}
              >
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          className={styles.dontKnow}
          onClick={() => router.push("/forget-password")}
        >
          {`Forgot your password?`}
        </button>

        <ConfirmButton
          style={{ justifyContent: "center", width: "100%" }}
          title={isSubmitting ? "Logging in..." : "Login"}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          // className={styles.button}
        />
      </form>
    </div>
  );
};

export default Form;
