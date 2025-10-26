"use client";
import React from "react";
import styles from "./sideNavbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const SideNavbar = ({ isOpen = false, onToggle, isMobile = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const page = pathname.split("/")[2];

  // Minimalist modern icons
  const GridIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );

  const BookmarkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );

  const FileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );

  const CloudIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
      <path d="M19 14c1.49-1.46 2.5-3.48 2.5-5.75C21.5 5.36 18.86 2.5 15.5 2.5c-2.05 0-3.82 1.08-4.81 2.7C9.88 3.5 8.64 3 7.25 3 4.14 3 1.5 5.64 1.5 8.75c0 2.27 1.01 4.29 2.5 5.75" />
    </svg>
  );

  const UploadIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );

  const PowerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
  );

  const navItems = [
    {
      label: "Dashboard",
      icon: <GridIcon />,
      href: "/dashboard",
    },
    {
      label: "Manage Policy",
      icon: <BookmarkIcon />,
      href: "/dashboard/policy",
    },
    {
      label: "Documents",
      icon: <FileIcon />,
      href: "/dashboard/documents",
    },
    {
      label: "Manage Claims",
      icon: <CheckCircleIcon />,
      href: "/dashboard/claims",
    },
    {
      label: "Submit a Claim",
      icon: <UploadIcon />,
      href: "/dashboard/submit-claim",
    },
    {
      label: "Logout",
      icon: <PowerIcon />,
    },
  ];

  return (
    <div
      className={`${styles.container} ${
        isMobile
          ? isOpen
            ? styles.sidebarOpen
            : styles.sidebarClosed
          : styles.sidebarDesktop
      }`}
    >
      <div className={styles.navItems}>
        {navItems.map((item, index) =>
          item.label === "Logout" ? (
            <button
              className={`${styles.navItem} ${
                item.href && page === item.href.split("/")[2]
                  ? styles.activeNavItem
                  : ""
              }`}
              key={item.label}
              style={{
                animationDelay: isOpen ? `${(index + 1) * 0.06}s` : "0s",
              }}
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ) : (
            <Link
              className={`${styles.navItem} ${
                item.href && page === item.href.split("/")[2]
                  ? styles.activeNavItem
                  : ""
              }`}
              href={item.href}
              key={item.label}
              style={{
                animationDelay: isOpen ? `${(index + 1) * 0.06}s` : "0s",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
