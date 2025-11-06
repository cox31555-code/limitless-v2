"use client";

import React, { createContext, useState, useContext } from "react";

const InsuranceModalContext = createContext();

export const InsuranceModalProvider = ({ children }) => {
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

  return (
    <InsuranceModalContext.Provider
      value={{ isInsuranceModalOpen, setIsInsuranceModalOpen }}
    >
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
