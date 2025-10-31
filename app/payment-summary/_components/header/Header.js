"use client";
import React, { useState } from "react";
import styles from "./header.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const IconComponent = ({ type }) => {
  switch (type) {
    case "chevron":
      return (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "calendar":
      return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M5 1V3M11 1V3M2 5H14M13 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "clock":
      return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM8 3.5C10.4853 3.5 12.5 5.51472 12.5 8C12.5 10.4853 10.4853 12.5 8 12.5C5.51472 12.5 3.5 10.4853 3.5 8C3.5 5.51472 5.51472 3.5 8 3.5ZM8 4.5V8H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "globe":
      return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM2.5 8H13.5M8 2C6.33579 4.3431 5.3 6.97087 5.3 8C5.3 9.02913 6.33579 11.6569 8 14C9.66421 11.6569 10.7 9.02913 10.7 8C10.7 6.97087 9.66421 4.3431 8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

const Header = ({ title, currentStep, totalSteps }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const carVanItems = [
    { label: "Annual car insurance", href: "/annual", icon: "calendar" },
    { label: "Hourly car insurance", href: "/temporary", icon: "clock" },
    { label: "Weekly car insurance", href: "/temporary", icon: "calendar" },
    { label: "International driving licenses", href: "/coming-soon", icon: "globe" },
  ];

  const motorbakeItems = [
    { label: "Annual bike insurance", href: "/coming-soon", icon: "calendar" },
    { label: "Hourly bike insurance", href: "/coming-soon", icon: "clock" },
    { label: "Weekly bike insurance", href: "/coming-soon", icon: "calendar" },
    { label: "International driving licenses", href: "/coming-soon", icon: "globe" },
  ];

  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  
  const progressPercentage = totalSteps ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={styles.headerContainer}>
      <header className={styles.headerElement}>
        <div className={styles.headerContent}>
          <div className={styles.navigationBar}>
            <div className={styles.logoContainer}>
              <Image
                onClick={() => router.push("/")}
                className={styles.logo}
                src="/svg/logo.svg"
                alt="logo"
                width={66}
                height={66}
              />
            </div>
            <menu className={styles.menu} suppressHydrationWarning>
              <li
                className={styles.menuItem}
                onMouseEnter={() => setOpenDropdown("carVan")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className={`${styles.menuLink} ${openDropdown === "carVan" ? styles.active : ""} ${carVanItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                  Car & Van
                  <span className={`${styles.chevronIcon} ${openDropdown === "carVan" ? styles.rotated : ""}`}>
                    <IconComponent type="chevron" />
                  </span>
                </span>
                {openDropdown === "carVan" && (
                  <div className={styles.dropdown}>
                    {carVanItems.map((item, index) => (
                      <span
                        key={`carVan-${index}`}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setOpenDropdown(null);
                          router.push(item.href);
                        }}
                      >
                        <span className={styles.dropdownIcon}>
                          <IconComponent type={item.icon} />
                        </span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
              </li>

              <li
                className={styles.menuItem}
                onMouseEnter={() => setOpenDropdown("motorbike")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className={`${styles.menuLink} ${openDropdown === "motorbike" ? styles.active : ""} ${motorbakeItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                  Motorbike
                  <span className={`${styles.chevronIcon} ${openDropdown === "motorbike" ? styles.rotated : ""}`}>
                    <IconComponent type="chevron" />
                  </span>
                </span>
                {openDropdown === "motorbike" && (
                  <div className={styles.dropdown}>
                    {motorbakeItems.map((item, index) => (
                      <span
                        key={`motorbike-${index}`}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setOpenDropdown(null);
                          router.push(item.href);
                        }}
                      >
                        <span className={styles.dropdownIcon}>
                          <IconComponent type={item.icon} />
                        </span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
              </li>

              <li className={styles.menuItem}>
                <span
                  className={`${styles.menuLink} ${
                    pathname === "/impound" ? styles.activeMenuLink : ""
                  }`}
                  onClick={() => router.push("/impound")}
                >
                  Impound
                </span>
              </li>

              <li className={styles.menuItem}>
                <span
                  className={`${styles.menuLink} ${
                    pathname === "/coming-soon" ? styles.activeMenuLink : ""
                  }`}
                  onClick={() => router.push("/coming-soon")}
                >
                  Courier
                </span>
              </li>

              <li className={styles.menuItem}>
                <span
                  className={`${styles.menuLink} ${
                    pathname === "/contact" ? styles.activeMenuLink : ""
                  }`}
                  onClick={() => router.push("/contact")}
                >
                  Contact
                </span>
              </li>
            </menu>
            )}

            {!isPaymentSummaryPage && (
            <div className={styles.buttons}>
              <button
                className={styles.loginBtn}
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className={styles.quoteBtn}
                onClick={() => router.push("/temporary/get-quote")}
              >
                Get a Quote
              </button>
            </div>
            )}
          </div>

          <div className={styles.titleSection}>
            <div className={styles.titleContent}>
              <h1 className={`${styles.title} ${plusJakartaSans.className}`}>
                {withoutLastWord}{" "}
                <span className={styles.titleSpan}>
                  {lastWord}
                </span>
              </h1>
            </div>

            {totalSteps && (
              <div className={styles.progressSection}>
                <p className={`${styles.stepLabel} ${manrope.className}`}>
                  Step {currentStep} of {totalSteps}
                </p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
