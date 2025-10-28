"use client";
import React, { useState, useRef } from "react";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/utils/authSchemas";
import { useAuth } from "@/contexts/AuthContext";

const Form = () => {
  const router = useRouter();
  const {
    forgotPassword,
    isLoading,
    error,
    forgotPasswordSuccess,
    clearError,
    clearSuccessStates,
  } = useAuth();

  const emailInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await forgotPassword(data.email);

    if (!result.success) {
      setError("email", { message: result.message });
    }
  };

  if (forgotPasswordSuccess) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Check Your Email</h1>
        <p className={styles.subtitle}>
          We've sent you a password reset link. Please check your email and follow the instructions to reset your password.
        </p>

        <button
          type="button"
          className={styles.submitButton}
          onClick={() => {
            clearSuccessStates();
            router.push("/login");
          }}
        >
          GO TO LOGIN
        </button>
      </div>
    );
  }

  const handleEmailChange = (e) => {
    if (errors.email) {
      setError("email", { message: undefined });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Password</h1>
      <p className={styles.subtitle}>
        Enter your email address and we'll send you a link to reset your password
      </p>

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

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "SEND RESET LINK"}
        </button>
      </form>

      <button
        className={styles.backToLogin}
        onClick={() => router.push("/login")}
        disabled={isLoading}
      >
        Back to Login
      </button>
    </div>
  );
};

export default Form;
