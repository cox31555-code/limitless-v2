import React from "react";
import styles from "./table.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Table = ({ title, columns, data }) => {
  return (
    <>
      <div className={styles.container}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableHeaderRow}>
              {columns.map((column, index) => (
                <th className={styles.tableHeaderCell} key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map((row, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell} data-label="Document">
                  <span className={styles.datacell}>{row.document}</span>
                </td>
                <td className={styles.tableCell} data-label="Date">
                  <span className={styles.datacell}>{row.documentNumber}</span>
                </td>
                <td className={styles.tableCell} data-label="Action">
                  <div className={styles.documentType}>
                    <span className={styles.datacell}>{row.documentType}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mobile}>
        <h1 className={styles.mobileTitle}>Documents</h1>
        {data.map((row, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardContent}>
              <p className={styles.label}>File Name</p>
              <p className={styles.value}>{row.document}</p>
              <p className={styles.date}>{row.documentNumber}</p>
            </div>
            <div className={styles.documentType}>
              {row.documentType}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
