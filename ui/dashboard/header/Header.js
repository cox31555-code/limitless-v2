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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          return "MyInsurance";
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
      return "MyInsurance";
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

  const handleNavigate = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <div className={isMenuOpen ? `${styles.headerContainer} ${styles.menuOpen}` : styles.headerContainer}>
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
          {/* Mobile Menu Button */}
          <div className={styles.mobileMenuWrapper}>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              title={isMenuOpen ? "Close menu" : "Open menu"}
              aria-label="Dashboard menu"
            >
              {isMenuOpen ? (
                <Image src="/svg/close.svg" alt="close" width={20} height={20} />
              ) : (
                <Image src="/svg/menu.svg" alt="menu" width={24} height={24} />
              )}
            </button>

            {/* Mobile Menu Backdrop */}
            {isMenuOpen && (
              <div
                className={styles.menuBackdrop}
                onClick={() => setIsMenuOpen(false)}
              />
            )}

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className={styles.menuDropdown}>
                <button className={styles.menuItem} onClick={() => handleNavigate("/dashboard")}>
                  Dashboard
                </button>
                <button className={styles.menuItem} onClick={() => handleNavigate("/dashboard/policy")}>
                  Manage Policy
                </button>
                <button className={styles.menuItem} onClick={() => handleNavigate("/dashboard/documents")}>
                  Documents
                </button>
                <button className={styles.menuItem} onClick={() => handleNavigate("/dashboard/claims")}>
                  Manage Claims
                </button>
                <button className={styles.menuItem} onClick={() => handleNavigate("/dashboard/submit-claim")}>
                  Submit a Claim
                </button>
                <button className={styles.menuItem} onClick={() => handleNavigate("/login")}>
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
