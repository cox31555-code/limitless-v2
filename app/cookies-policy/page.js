import React from "react";
import styles from "./page.module.css";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import { content } from "./data";
import LastUpdated from "@/ui/company-pages/lastUpdated/LastUpdated";
import ListItem from "@/ui/company-pages/listItem/listItem";
import DoubleList from "@/ui/company-pages/doubleList/DoubleList";
import NestedListItem from "@/ui/company-pages/nestedLists/NestedLists";
import Link from "next/link";

export const metadata = {
  title: "Cookies Policy | Limitless Cover",
};

const page = () => {
  const menuItems = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookies Policy", href: "/cookies-policy" },
    { label: "Complaints", href: "/complaints" },
  ];

  return (
    <div className={styles.page}>
      <GetQuoteHeaderWithNav title="Cookies Policy" />
      <nav className={styles.policyNav}>
        <div className={styles.policyNavContent}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${styles.policyLink} ${
                typeof window !== "undefined" &&
                window.location.pathname === item.href
                  ? styles.activePolicyLink
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
