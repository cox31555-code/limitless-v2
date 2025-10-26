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
          <div className={styles.helpSection}>
            <div
              className={styles.helpButton}
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              title="Get Help"
            >
              <HelpIcon />
            </div>
            {isHelpOpen && (
              <div className={styles.helpDropdown}>
                <div className={styles.dropdownHeader}>How can we help?</div>
                <a href="/contact" className={styles.dropdownItem}>
                  <span className={styles.itemIcon}>💬</span>
                  <div className={styles.itemText}>
                    <div className={styles.itemTitle}>Contact Support</div>
                    <div className={styles.itemDesc}>Get in touch with our team</div>
                  </div>
                </a>
                <a href="/FAQ" className={styles.dropdownItem}>
                  <span className={styles.itemIcon}>❓</span>
                  <div className={styles.itemText}>
                    <div className={styles.itemTitle}>FAQ</div>
                    <div className={styles.itemDesc}>Find answers to common questions</div>
                  </div>
                </a>
                <div className={styles.dropdownItem} onClick={() => {
                  if (typeof window !== "undefined" && window.Tawk_API) {
                    window.Tawk_API.maximize();
                    setIsHelpOpen(false);
                  }
                }}>
                  <span className={styles.itemIcon}>💬</span>
                  <div className={styles.itemText}>
                    <div className={styles.itemTitle}>Live Chat</div>
                    <div className={styles.itemDesc}>Chat with us now</div>
                  </div>
                </div>
              </div>
            )}
          </div>


          <div className={styles.profileSection}>
            <button
              className={styles.profileButton}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              title="Account"
            >
              <UserIcon />
              <span className={styles.userName}>{user?.email?.split("@")[0] || "User"}</span>
            </button>
            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <div className={styles.profileInfo}>
                  <div className={styles.profileEmail}>{user?.email || "user@example.com"}</div>
                </div>
                <a href="/dashboard" className={styles.profileItem}>
                  Dashboard
                </a>
                <a href="/dashboard/policy" className={styles.profileItem}>
                  Policies
                </a>
                <a href="/dashboard/documents" className={styles.profileItem}>
                  Documents
                </a>
                <hr className={styles.profileDivider} />
                <button
                  className={styles.logoutButton}
                  onClick={async () => {
                    const { logout } = require("@/contexts/AuthContext").useAuth?.();
                    // Note: This will be handled by parent component's logout
                    router.push("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
