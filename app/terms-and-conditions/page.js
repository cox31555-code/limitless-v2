import React from "react";
import styles from "./page.module.css";
import Header from "@/ui/company-pages/header/Header";
import { content } from "./data";
import LastUpdated from "@/ui/company-pages/lastUpdated/LastUpdated";
import ListItem from "@/ui/company-pages/listItem/listItem";
import DoubleList from "@/ui/company-pages/doubleList/DoubleList";
import NestedListItem from "@/ui/company-pages/nestedLists/NestedLists";
import ListWithDescription from "@/ui/company-pages/AnotherList/ListWithDescription";

export const metadata = {
  title: "Terms & Conditions | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.page}>
      <Header title="Terms & Conditions" />
      <div className={"centeredContent"}>
        <div className={"companyPageContainer"}>
          {content.map((item, index) => (
            <div key={index} className={styles.content}>
              {item.type === "lastUpdate" && <LastUpdated data={item.value} />}
              {item.type === "list" && <ListItem data={item.value} />}
              {item.type === "doubleList" && <DoubleList data={item.value} />}
              {item.type === "nestedLists" && (
                <NestedListItem data={item.value} />
              )}
              {item.type === "listWithDescription" && (
                <ListWithDescription data={item.value} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
