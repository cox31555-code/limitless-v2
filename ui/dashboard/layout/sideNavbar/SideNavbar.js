"use client";
import React from "react";
import styles from "./sideNavbar.module.css";
import LoadingLink from "@/ui/loadingSpinner/LoadingLink";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";

const SideNavbar = ({ isOpen = false, onToggle, isMobile = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { showLoading } = useLoading();
  const page = pathname.split("/")[2];

  const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );

  const PolicyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="12" y1="13" x2="12" y2="17"></line>
      <line x1="10" y1="15" x2="14" y2="15"></line>
    </svg>
  );

  const DocumentsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  );

  const ClaimsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M9 12l2 2 4-4m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

  const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
    </svg>
  );

  const navItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      href: "/dashboard",
    },
    {
      label: "Manage Policy",
      icon: <PolicyIcon />,
      href: "/dashboard/policy",
    },
    {
      label: "Documents",
      icon: <DocumentsIcon />,
      href: "/dashboard/documents",
    },
    {
      label: "Claims",
      icon: <ClaimsIcon />,
      href: "/dashboard/claims",
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
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
                showLoading();
                await logout();
                router.push("/login");
              }}
              title="Logout from your account"
            >
              <div className={styles.navItemIconWrapper}>
                {item.icon}
              </div>
              <div className={styles.navItemContent}>
                <span className={styles.navItemLabel}>{item.label}</span>
              </div>
            </button>
          ) : (
            <LoadingLink
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
              title={item.label}
            >
              <div className={styles.navItemIconWrapper}>
                {item.icon}
              </div>
              <div className={styles.navItemContent}>
                <span className={styles.navItemLabel}>{item.label}</span>
              </div>
            </LoadingLink>
          )
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
