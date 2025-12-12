import React from "react";
import Header from "@/ui/dashboard/header/Header";

const SupportTicketsLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SupportTicketsLayout;
