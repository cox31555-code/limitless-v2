import React from "react";
import Header from "./_components/header/Header";
import styles from "./page.module.css";
import Card from "./_components/card/Card";
import { features } from "./data";

export const metadata = {
  title: "Coming Soon | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.page}>
      <span className={styles.squareLight}></span>
      <span className={styles.squareLight2}></span>
      <Header />
      <div className={"centeredContent"}>
        <div className={styles.cardsContainer}>
          {features.map((feature, index) => (
            <Card key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
