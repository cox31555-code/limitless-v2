"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./form.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  clientSetPasswordSchema,
} from "@/utils/authSchemas";
import { useAuth } from "@/contexts/AuthContext";

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    resetPassword,
    setPassword,
    getUserInfo,
    error,
    resetPasswordSuccess,
    clearError,
    clearSuccessStates,
  } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [pageType, setPageType] = useState("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const userType = searchParams.get("type");

  const getFormConfig = () => {
    if (token) {
      return {
        schema: resetPasswordSchema,
        type: "resetPassword",
        defaultValues: { token, password: "", passwordConfirm: "" },
      };
    } else if (email && userId) {
      return {
        schema: clientSetPasswordSchema,
        type: "setPassword",
        defaultValues: { password: "", confirmPassword: "" },
      };
    }
    return null;
  };

  const formConfig = getFormConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: formConfig ? zodResolver(formConfig.schema) : undefined,
    defaultValues: formConfig?.defaultValues || {},
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (email && userId && !token) {
        const result = await getUserInfo(email, userId);
        if (result.success) {
          setUserInfo(result.data);
          setPageType("setPassword");
        } else {
          setPageType("error");
        }
      } else if (token) {
        setPageType("resetPassword");
      } else {
        setPageType("error");
      }
    };

    fetchUserInfo();
  }, [email, userId, token, getUserInfo]);

  const onSubmit = async (data) => {
    clearError();
    setIsSubmitting(true);

    try {
      let result;

      if (pageType === "setPassword") {
        result = await setPassword(
          email,
          userId,
          data.password,
          data.confirmPassword
        );
      } else if (pageType === "resetPassword") {
        result = await resetPassword(
          token,
          data.password,
          data.passwordConfirm,
          userType || "client"
        );
      }

      if (result?.success) {
        const loginPath =
          result.data?.userType === "admin" || userType === "admin"
            ? "/admin-login"
            : "/login";
        const message =
          pageType === "setPassword"
            ? "Password set successfully. You can now login."
            : "Password reset successfully. You can now login.";

        router.push(`${loginPath}?message=${encodeURIComponent(message)}`);
      } else {
        setError("root", {
          message: result?.message || "Something went wrong. Please try again.",
        });
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  if (pageType === "loading") {
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Loading</h1>
            <p className={styles.subtitle}>Please wait while we verify your request.</p>
          </div>
        </div>
      </div>
    );
  }

  if (pageType === "error") {
    return (
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Invalid Link</h1>
            <p className={styles.subtitle}>This password reset link is invalid or has expired. Please request a new one.</p>
          </div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={() => router.push("/login")}
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

  const getPageTitle = () => {
    if (pageType === "setPassword") {
      return userInfo ? `Welcome ${userInfo.firstName}!` : "Welcome!";
    }
    if (userType === "admin") {
      return "Reset Admin Password";
    }
    return "Create New Password";
  };

  const getPageDescription = () => {
    if (pageType === "setPassword") {
      return "Please create a secure password for your account to complete the setup.";
    }
    if (userType === "admin") {
      return "Please enter your new admin password and confirm it.";
    }
    return "Please enter your new password and confirm it.";
  };

  const getPasswordFieldName = () => {
    return pageType === "resetPassword" ? "passwordConfirm" : "confirmPassword";
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{getPageTitle()}</h1>
          <p className={styles.subtitle}>{getPageDescription()}</p>
          {userInfo && (
            <p className={styles.userEmail}>{userInfo.email}</p>
          )}
        </div>

        {(error || errors.root) && (
          <div className={styles.errorMessage}>
            {error || errors.root?.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>
                {pageType === "setPassword" ? "Create Password" : "New Password"}
              </label>
              <div
                className={`${styles.inputField} ${errors.password ? styles.fieldError : ""}`}
                onClick={() => passwordInputRef.current?.focus()}
              >
                <svg className={styles.fieldIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C6.48 1 2 5.48 2 11V21C2 22.1046 2.89543 23 4 23H20C21.1046 23 22 22.1046 22 21V11C22 5.48 17.52 1 12 1ZM12 3C16.41 3 20 6.59 20 11H4C4 6.59 7.59 3 12 3ZM12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16Z" fill="currentColor"/>
                </svg>
                <input
                  type={showPassword.password ? "text" : "password"}
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
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => togglePasswordVisibility("password")}
                  aria-label={showPassword.password ? "Hide password" : "Show password"}
                >
                  {showPassword.password ? (
                    <svg className={styles.eyeIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M2 5.27L3.28 4M19.73 21L21 19.73M9.88 9.88C9.4 10.14 9 10.6 9 11.17C9 12.63 10.37 14 11.83 14C12.4 14 12.86 13.6 13.12 13.12M6.61 6.61C5.59 7.62 4.74 8.92 4.2 10.4C3 13.41 4.84 17 8 17C9.48 17 10.78 16.41 11.79 15.39M12 3C7.04 3 2.77 6.05 1 10.5C2.77 14.95 7.04 18 12 18C16.96 18 21.23 14.95 23 10.5C21.23 6.05 16.96 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  ) : (
                    <svg className={styles.eyeIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password.message}</span>
              )}
            </div>

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Confirm Password</label>
              <div
                className={`${styles.inputField} ${errors[getPasswordFieldName()] ? styles.fieldError : ""}`}
                onClick={() => confirmPasswordInputRef.current?.focus()}
              >
                <svg className={styles.fieldIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C6.48 1 2 5.48 2 11V21C2 22.1046 2.89543 23 4 23H20C21.1046 23 22 22.1046 22 21V11C22 5.48 17.52 1 12 1ZM12 3C16.41 3 20 6.59 20 11H4C4 6.59 7.59 3 12 3ZM12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16Z" fill="currentColor"/>
                </svg>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={styles.input}
                  {...(() => {
                    const { ref, ...rest } = register(getPasswordFieldName());
                    return {
                      ...rest,
                      ref: (e) => {
                        ref(e);
                        confirmPasswordInputRef.current = e;
                      },
                    };
                  })()}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  aria-label={showPassword.confirmPassword ? "Hide password" : "Show password"}
                >
                  {showPassword.confirmPassword ? (
                    <svg className={styles.eyeIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M2 5.27L3.28 4M19.73 21L21 19.73M9.88 9.88C9.4 10.14 9 10.6 9 11.17C9 12.63 10.37 14 11.83 14C12.4 14 12.86 13.6 13.12 13.12M6.61 6.61C5.59 7.62 4.74 8.92 4.2 10.4C3 13.41 4.84 17 8 17C9.48 17 10.78 16.41 11.79 15.39M12 3C7.04 3 2.77 6.05 1 10.5C2.77 14.95 7.04 18 12 18C16.96 18 21.23 14.95 23 10.5C21.23 6.05 16.96 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  ) : (
                    <svg className={styles.eyeIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors[getPasswordFieldName()] && (
                <span className={styles.errorText}>{errors[getPasswordFieldName()].message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            <span className={styles.buttonText}>
              {isSubmitting
                ? pageType === "setPassword"
                  ? "Setting..."
                  : "Resetting..."
                : pageType === "setPassword"
                ? "Set Password"
                : "Reset Password"}
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
            Remember your password? <a href="/login" className={styles.signupLink}>Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
