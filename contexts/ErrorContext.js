"use client";

import React, { createContext, useState, useContext, useCallback, useMemo } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const addError = useCallback((error) => {
    const id = Date.now();
    const errorObject = {
      id,
      message: typeof error === "string" ? error : error?.message || "An error occurred",
      action: error?.action || null,
      type: error?.type || "error",
      timestamp: new Date(),
    };
    setErrors((prev) => [...prev, errorObject]);
    return id;
  }, []);

  const removeError = useCallback((id) => {
    setErrors((prev) => prev.filter((err) => err.id !== id));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const value = useMemo(
    () => ({
      errors,
      addError,
      removeError,
      clearAllErrors,
    }),
    [errors, addError, removeError, clearAllErrors]
  );

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within ErrorProvider");
  }
  return context;
};
