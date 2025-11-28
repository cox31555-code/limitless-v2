"use client";
import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import LoadingLink from "@/ui/loadingSpinner/LoadingLink";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";

const Header = ({ page }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { showLoading } = useLoading();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getTitle = () => {
    if (page) {
      switch (page) {
        case "claims":
          return "Claims";
        case "policy":
          return "Manage Policy";
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
      return "Claims";
    } else if (pathname.includes("/policy")) {
      return "Manage Policy";
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
    return "dashboard";
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", id: "dashboard" },
    { label: "Manage Policy", href: "/dashboard/policy", id: "policy" },
    { label: "Documents", href: "/dashboard/documents", id: "documents" },
    { label: "Claims", href: "/dashboard/claims", id: "claims" },
  ];

  const activePage = getActivePage();

  const handleLogout = async () => {
    showLoading();
    await user?.logout?.();
    router.push("/login");
    setIsMenuOpen(false);
  };

  const handleNavigate = (path) => {
    showLoading();
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
              <LoadingLink
                key={item.id}
                href={item.href}
                className={`${styles.navItem} ${activePage === item.id ? styles.active : ""}`}
              >
                {item.label}
              </LoadingLink>
            ))}
            <div
              style={{
                display: "block",
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderColor: "rgba(255, 255, 255, 0.8) rgba(255, 255, 255, 0.8) rgba(0, 0, 0, 0)",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "11.5px",
                fontWeight: "500",
                position: "relative",
                textWrap: "nowrap",
                transitionDuration: "0.2s",
                whiteSpace: "nowrap",
                padding: "3px 2px",
              }}
            >
              <p>Log out</p>
            </div>
          </nav>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            title="Logout from your account"
          />
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
