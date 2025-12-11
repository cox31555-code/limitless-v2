"use client";
import { createContext, useContext, useState, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const loadingTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    if (isLoading && startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 3000 - elapsed);

      loadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        startTimeRef.current = null;
      }, remaining);
    }
  }, [pathname, isLoading]);

  const showLoading = () => {
    startTimeRef.current = Date.now();
    setIsLoading(true);
  };

  const hideLoading = () => {
    if (startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 3000 - elapsed);

      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }

      loadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        startTimeRef.current = null;
      }, remaining);
    } else {
      setIsLoading(false);
    }
  };

  const value = useMemo(() => ({ isLoading, showLoading, hideLoading }), [isLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
