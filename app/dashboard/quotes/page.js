"use client";
import React from "react";
import styles from "./page.module.css";
import QuotesPageClient from "./_components/QuotesPageClient";

const Page = () => {
  return (
    <div className={styles.page}>
      <QuotesPageClient />
    </div>
  );
};

export default Page;
