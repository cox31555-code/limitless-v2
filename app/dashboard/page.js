"use client";

import React from "react";
import dynamic from "next/dynamic";
import styles from "./page.module.css";

const DashboardClient = dynamic(() => import("./_components/DashboardClient"), {
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
      <DashboardClient />
    </div>
  );
};

export default Page;
