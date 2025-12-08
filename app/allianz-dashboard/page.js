"use client";
import React from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

const AllianzDashboardClient = dynamic(() => import("./_components/AllianzDashboardClient"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
      Loading dashboard...
    </div>
  )
});

const Page = () => {
  return (
    <div className={styles.page}>
      <AllianzDashboardClient />
    </div>
  );
};

export default Page;
