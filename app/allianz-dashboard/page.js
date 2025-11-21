"use client";
import React from "react";
import styles from "./page.module.css";
import AllianzDashboardClient from "./_components/AllianzDashboardClient";

const Page = () => {
  return (
    <div className={styles.page}>
      <AllianzDashboardClient />
    </div>
  );
};

export default Page;
