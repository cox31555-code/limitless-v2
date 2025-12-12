"use client";

import Link from "next/link";
import styles from "./breadcrumb.module.css";

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb navigation">
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.isActive !== undefined ? item.isActive : isLast;

          return (
            <li key={index} className={styles.breadcrumbListItem}>
              {item.href && !isActive ? (
                <Link href={item.href} className={styles.breadcrumbItem}>
                  {item.label}
                </Link>
              ) : item.onClick && !isActive ? (
                <button 
                  className={styles.breadcrumbItem}
                  onClick={item.onClick}
                  type="button"
                >
                  {item.label}
                </button>
              ) : (
                <span className={`${styles.breadcrumbItem} ${isActive ? styles.active : ''}`}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.breadcrumbSeparator} aria-hidden="true">›</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
