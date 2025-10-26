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

  const IconHome = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const IconPolicy = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );

  const IconDocument = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );

  const IconClaims = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const IconSubmit = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );

  const IconLogout = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const navItems = [
    {
      label: "Dashboard",
      icon: <IconHome />,
      href: "/dashboard",
    },
    {
      label: "Manage Policy",
      icon: <IconPolicy />,
      href: "/dashboard/policy",
    },
    {
      label: "Documents",
      icon: <IconDocument />,
      href: "/dashboard/documents",
    },
    {
      label: "Manage Claims",
      icon: <IconClaims />,
      href: "/dashboard/claims",
    },
    {
      label: "Submit a Claim",
      icon: <IconSubmit />,
      href: "/dashboard/submit-claim",
    },
    {
      label: "Logout",
      icon: <IconLogout />,
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
              // href={item.href}
              key={item.label}
              style={{
                animationDelay: isOpen ? `${(index + 1) * 0.1}s` : "0s",
              }}
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
            >
              {item.icon}
              {item.label}
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
                animationDelay: isOpen ? `${(index + 1) * 0.1}s` : "0s",
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
