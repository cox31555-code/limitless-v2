"use client";
import React from "react";
import styles from "./page.module.css";
import DashboardClient from "./_components/DashboardClient";

const Page = () => {
  return (
    <div className={styles.page}>
      <DashboardClient />
    </div>
  );
};

export default Page;
