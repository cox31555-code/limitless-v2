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
      <h1 className={styles.title}>LOGIN</h1>
      <p className={styles.subtitle}>How to i get started lorem ipsum dolor at?</p>

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
            <svg className={styles.icon} width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.3858 27.9234H22.8474V25.3849C22.8474 23.2819 21.1427 21.5772 19.0397 21.5772H11.4243C9.32135 21.5772 7.61659 23.2819 7.61659 25.3849V27.9234H5.07812V25.3849C5.07812 21.8801 7.9194 19.0388 11.4243 19.0388H19.0397C22.5445 19.0388 25.3858 21.8801 25.3858 25.3849V27.9234ZM15.232 16.5003C11.0261 16.5003 7.61659 13.0908 7.61659 8.88492C7.61659 4.67905 11.0261 1.26953 15.232 1.26953C19.4378 1.26953 22.8474 4.67905 22.8474 8.88492C22.8474 13.0908 19.4378 16.5003 15.232 16.5003ZM15.232 13.9618C18.0358 13.9618 20.3089 11.6888 20.3089 8.88492C20.3089 6.08101 18.0358 3.80799 15.232 3.80799C12.4281 3.80799 10.155 6.08101 10.155 8.88492C10.155 11.6888 12.4281 13.9618 15.232 13.9618Z" fill="#1C1C1C"/>
            </svg>
            <input
              type="email"
              placeholder="Email"
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
            <svg className={styles.icon} width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.61629 10.1541V8.88492C7.61629 4.67905 11.0258 1.26953 15.2317 1.26953C19.4375 1.26953 22.8471 4.67905 22.8471 8.88492V10.1541H25.3855C26.0865 10.1541 26.6547 10.7224 26.6547 11.4234V26.6541C26.6547 27.3551 26.0865 27.9234 25.3855 27.9234H5.07782C4.37685 27.9234 3.80859 27.3551 3.80859 26.6541V11.4234C3.80859 10.7224 4.37685 10.1541 5.07782 10.1541H7.61629ZM24.1163 12.6926H6.34706V25.3849H24.1163V12.6926ZM13.9624 19.9683C13.2037 19.5294 12.6932 18.7091 12.6932 17.7695C12.6932 16.3675 13.8297 15.2311 15.2317 15.2311C16.6337 15.2311 17.7701 16.3675 17.7701 17.7695C17.7701 18.7091 17.2596 19.5294 16.5009 19.9683V22.8465H13.9624V19.9683ZM10.1547 10.1541H20.3086V8.88492C20.3086 6.08101 18.0355 3.80799 15.2317 3.80799C12.4278 3.80799 10.1547 6.08101 10.1547 8.88492V10.1541Z" fill="#1C1C1C"/>
            </svg>
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
          {isSubmitting ? "Logging in..." : "Login Now"}
        </button>
      </form>
    </div>
  );
};

export default Form;
