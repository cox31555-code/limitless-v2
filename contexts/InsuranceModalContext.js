"use client";

import React, { createContext, useState, useContext, useMemo } from "react";

const InsuranceModalContext = createContext();

export const InsuranceModalProvider = ({ children }) => {
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

  const value = useMemo(() => ({
    isInsuranceModalOpen,
    setIsInsuranceModalOpen
  }), [isInsuranceModalOpen]);

  return (
    <InsuranceModalContext.Provider value={value}>
      {children}
    </InsuranceModalContext.Provider>
  );
};

export const useInsuranceModal = () => {
  const context = useContext(InsuranceModalContext);
  if (!context) {
    throw new Error(
      "useInsuranceModal must be used within InsuranceModalProvider"
    );
  }
  return context;
};
