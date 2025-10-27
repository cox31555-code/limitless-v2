"use client";
import React, { useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ page }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getTitle = () => {
    if (page) {
      switch (page) {
        case "claims":
          return "Manage Claims";
        case "policy":
          return "Manage Policy";
        case "submit-claim":
          return "Submit Claim";
        case "documents":
          return "Policy Documents";
        case "dashboard":
        default:
          return "Dashboard";
      }
    }

    if (pathname.includes("/claims")) {
      return "Manage Claims";
    } else if (pathname.includes("/policy")) {
      return "Manage Policy";
    } else if (pathname.includes("/submit-claim")) {
      return "Submit Claim";
    } else if (pathname.includes("/documents")) {
      return "Policy Documents";
    } else {
      return "Dashboard";
    }
  };

  const HelpIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );

  const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logoWrapper}>
          <Image
            src="/svg/logo.svg"
            alt="Limitless Cover"
            width={50}
            height={50}
            className={styles.logo}
          />
        </div>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>{getTitle()}</h1>
        </div>

        <div className={styles.headerRight} style={{ position: 'relative', zIndex: 20 }}>
          <button
            className={styles.logoutBtn}
            onClick={async () => {
              router.push("/login");
            }}
            title="Logout"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
