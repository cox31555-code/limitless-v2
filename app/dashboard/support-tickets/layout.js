import React from "react";
import Header from "@/ui/dashboard/header/Header";
import DashboardFooter from "@/ui/dashboard/footer/DashboardFooter";

const SupportTicketsLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <DashboardFooter />
    </>
  );
};

export default SupportTicketsLayout;
