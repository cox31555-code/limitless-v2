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

  // Modern icon components
  const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <rect x="2" y="3" width="8" height="8" rx="1" />
      <rect x="14" y="3" width="8" height="8" rx="1" />
      <rect x="2" y="15" width="8" height="6" rx="1" />
      <rect x="14" y="15" width="8" height="6" rx="1" />
    </svg>
  );

  const PolicyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );

  const DocumentIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );

  const ClaimsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2 2 4-4" />
    </svg>
  );

  const SubmitIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const navItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      href: "/dashboard",
      description: "Overview",
    },
    {
      label: "Manage Policy",
      icon: <PolicyIcon />,
      href: "/dashboard/policy",
      description: "Your policies",
    },
    {
      label: "Documents",
      icon: <DocumentIcon />,
      href: "/dashboard/documents",
      description: "Files & docs",
    },
    {
      label: "Manage Claims",
      icon: <ClaimsIcon />,
      href: "/dashboard/claims",
      description: "Claims history",
    },
    {
      label: "Submit a Claim",
      icon: <SubmitIcon />,
      href: "/dashboard/submit-claim",
      description: "New claim",
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      description: "Sign out",
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
                animationDelay: isOpen ? `${(index + 1) * 0.08}s` : "0s",
              }}
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
              title={item.description}
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
                animationDelay: isOpen ? `${(index + 1) * 0.08}s` : "0s",
              }}
              title={item.description}
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
