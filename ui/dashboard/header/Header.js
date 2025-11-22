"use client";
import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ page }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    if (!mounted) {
      return "MyInsurance";
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

  const getActivePage = () => {
    if (pathname.includes("/policy")) return "policy";
    if (pathname.includes("/documents")) return "documents";
    if (pathname.includes("/claims")) return "claims";
    if (pathname.includes("/submit-claim")) return "submit-claim";
    return "dashboard";
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", id: "dashboard" },
    { label: "Manage Policy", href: "/dashboard/policy", id: "policy" },
    { label: "Documents", href: "/dashboard/documents", id: "documents" },
    { label: "Manage Claims", href: "/dashboard/claims", id: "claims" },
    { label: "Submit a Claim", href: "/dashboard/submit-claim", id: "submit-claim" },
  ];

  const activePage = getActivePage();

  const handleLogout = async () => {
    await user?.logout?.();
    router.push("/login");
    setIsMenuOpen(false);
  };

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

        <div className={styles.headerLeft} />

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <nav className={styles.navItems}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.navItem} ${activePage === item.id ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ fontSize: "1.15rem", padding: "3px 2px" }}>
              Logout
            </div>
          </nav>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            title="Logout from your account"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
            </svg>
          </button>
        </div>

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
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.menuItem} ${activePage === item.id ? styles.active : ""}`}
                  onClick={() => handleNavigate(item.href)}
                >
                  {item.label}
                </button>
              ))}
              <button className={styles.menuItem} onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
