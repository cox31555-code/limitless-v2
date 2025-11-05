import React from "react";
import styles from "./page.module.css";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { data } from "./data";

export const metadata = {
  title: "Frequently Asked Questions | Limitless Cover",
};

const Page = () => {

  return (
    <div className={styles.container}>
      <GetQuoteHeaderWithNav title="Frequently Asked Questions" />

      <div className={"centeredContent"}>
        <div className={styles.wrapper}>
          {data.map((item) => (
            <QuestionsGroup
              key={item.title}
              title={item.title}
              questions={item.questions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
