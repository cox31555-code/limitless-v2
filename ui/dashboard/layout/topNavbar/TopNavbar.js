"use client";
import React, { useState } from "react";
import styles from "./topNavbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const TopNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.navItems}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.navItem} ${activePage === item.id ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className={styles.logoutButton}
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            title="Logout from your account"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
            </svg>
            Logout
          </button>
        </div>

        <button
          className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.open : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuItems}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.mobileMenuItem} ${activePage === item.id ? styles.active : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              className={styles.mobileLogout}
              onClick={async () => {
                await logout();
                router.push("/login");
                setMobileMenuOpen(false);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavbar;
