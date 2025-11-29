import React from "react";
import Header from "./_components/header/Header";
import ChatToUs from "./_components/ChatToUs";
import styles from "./page.module.css";

const page = () => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.whiteSection}>
        <ChatToUs />
      </div>
    </div>
  );
};

export default page;
