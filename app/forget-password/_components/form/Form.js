"use client";
import React, { useState, useRef } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/utils/authSchemas";
import { useAuth } from "@/contexts/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

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
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Check Your Email
        </h2>
        <p className={styles.subtitle}>
          We've sent you a password reset link. Please check your email and follow the instructions to reset your password.
        </p>

        <ConfirmButton
          style={{ justifyContent: "center", width: "100%", marginTop: "2.2rem" }}
          title="Go to Login"
          onClick={() => {
            clearSuccessStates();
            router.push("/login");
          }}
        />
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
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Reset Password
      </h2>
      <p className={styles.subtitle}>
        Enter your email address and we'll send you a link to reset your password
      </p>

      {(error || errors.root) && (
        <div className={styles.errorMessage}>
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
                onChange={handleEmailChange}
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
              <span className={styles.errorMessage} style={{ color: "#dc3545", fontSize: "0.875rem" }}>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <ConfirmButton
          style={{ justifyContent: "center", width: "100%" }}
          title={isLoading ? "Sending..." : "Send Reset Link"}
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </form>

      <button
        className={styles.goBackLogin}
        onClick={() => router.push("/login")}
        disabled={isLoading}
      >
        Back to Login
      </button>
    </div>
  );
};

export default Form;
