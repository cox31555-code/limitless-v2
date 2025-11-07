"use client";

import React, { useState, useEffect } from "react";
import styles from "./footer.module.css";
import { menus } from "./data";
import Link from "next/link";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import NoHiddenFees from "../noHiddenFees/NoHiddenFees";
import GetQuoteFooterBanner from "../getQuoteFooterBanner/GetQuoteFooterBanner";

// List of all valid pages in the app directory
const validPages = [
  "/",
  "/about-us",
  "/annual",
  "/annual/get-quote",
  "/change-password",
  "/coming-soon",
  "/complaints",
  "/contact",
  "/cookies-policy",
  "/courier",
  "/courier-insurance",
  "/dashboard",
  "/delivery",
  "/error-404",
  "/faq",
  "/forget-password",
  "/impound",
  "/impound/get-quote",
  "/login",
  "/payment",
  "/payment-summary",
  "/privacy-policy",
  "/temporary",
  "/temporary/get-quote",
  "/terms-and-conditions",
  "/testing",
];

// Helper function to determine if special styles should be applied
const shouldUseSpecialStyles = (pathname) => {
  // Use special styles for any page that doesn't exist in our valid pages list
  // This covers 404/not-found scenarios
  return !validPages.includes(pathname) && !pathname.startsWith("/dashboard");
};

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render footer on password pages
  if (isMounted && ["/forget-password", "/change-password"].includes(pathname)) {
    return null;
  }

  // Determine which banner to show
  const isGetQuotePage = isMounted && (pathname?.startsWith("/temporary/get-quote") ||
    pathname?.startsWith("/impound/get-quote") ||
    pathname?.startsWith("/annual/get-quote"));
  const isPaymentSummaryPage = isMounted && pathname === "/payment-summary";
  const isPaymentPage = isMounted && pathname?.startsWith("/payment") && !isPaymentSummaryPage;
  const isDashboardPage = isMounted && pathname?.startsWith("/dashboard");

  const isLoginPage = isMounted && pathname === "/login";
  const isRetrieveQuotePage = isMounted && pathname === "/retrieve-quote";
  const isContactPage = isMounted && pathname === "/contact";

  // Only apply special styles if mounted and pathname is available, but NOT for login or retrieve-quote pages
  const shouldApplySpecialStyles = isMounted && pathname && shouldUseSpecialStyles(pathname) && !isLoginPage && !isRetrieveQuotePage;

  return (
    <footer
      className={styles.container}
      style={{
        background: shouldApplySpecialStyles ? "#F2F5FE" : "",
        marginTop: isContactPage ? "-125px" : "0",
      }}
      suppressHydrationWarning
    >
      <div className={`centeredContent ${styles.contentContainer}`} suppressHydrationWarning>
        <div suppressHydrationWarning>
          {isMounted ? (
            <>
              {(isGetQuotePage || isPaymentSummaryPage) && !isDashboardPage && <GetQuoteFooterBanner key="quote-banner" />}
              {!isPaymentPage && !isGetQuotePage && !isPaymentSummaryPage && pathname !== "/login" && !isDashboardPage && !isContactPage && <NoHiddenFees key="hidden-fees" />}
            </>
          ) : (
            <NoHiddenFees key="hidden-fees" />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.menus}>
            {menus.map((menu, index) => (
              <div key={index} className={styles.menu}>
                <h3
                  style={{
                    color: shouldApplySpecialStyles ? "rgba(0, 8, 34, 0.34)" : "",
                  }}
                  className={styles.menuTitle}
                >
                  {menu.title}
                </h3>
                <menu className={styles.menuItems}>
                  {menu.items.map((item, index) => (
                    <li key={index} className={styles.menuItem}>
                      <Link
                        href={item.link}
                        style={{
                          color: shouldApplySpecialStyles ? "#000822" : "",
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </menu>
              </div>
            ))}
          </div>
          <div className={styles.socials}>
            <div className={styles.socialsContainer}>
              <h3
                className={styles.socialsTitle}
                style={{
                  color: shouldApplySpecialStyles ? "rgba(0, 8, 34, 0.34)" : "",
                }}
              >
                Social Media
              </h3>
              <div className={styles.socialsItems}>
                <div
                  className={`${styles.socialsItem} ${
                    shouldApplySpecialStyles ? styles["socials-item-black"] : ""
                  }`}
                >
                  <BiLogoInstagramAlt
                    className={`${styles.socialsIcon} ${
                      shouldApplySpecialStyles ? styles["socials-icon-black"] : ""
                    }`}
                    size={20}
                  />
                </div>
                <div
                  className={`${styles.socialsItem} ${
                    shouldApplySpecialStyles ? styles["socials-item-black"] : ""
                  }`}
                >
                  <BiLogoFacebook
                    className={`${styles.socialsIcon} ${
                      shouldApplySpecialStyles ? styles["socials-icon-black"] : ""
                    }`}
                    size={20}
                  />
                </div>
                <div
                  className={`${styles.socialsItem} ${
                    shouldApplySpecialStyles ? styles["socials-item-black"] : ""
                  }`}
                >
                  <BiLogoTwitter
                    className={`${styles.socialsIcon} ${
                      shouldApplySpecialStyles ? styles["socials-icon-black"] : ""
                    }`}
                    size={20}
                  />
                </div>
              </div>
            </div>
            <div className={styles.stores}>
              <h3
                className={styles.socialsTitle}
                style={{
                  color: shouldApplySpecialStyles ? "rgba(0, 8, 34, 0.34)" : "",
                }}
              >
                Download Our App
              </h3>
              <div className={styles.storesContainer}>
                <Image
                  onClick={() => router.push("/coming-soon")}
                  className={styles.store}
                  src={`${
                    shouldApplySpecialStyles
                      ? "/svg/light-google-store.svg"
                      : "/svg/google-store.svg"
                  }`}
                  alt="logo"
                  width={161}
                  height={54}
                />

                <Image
                  onClick={() => router.push("/coming-soon")}
                  className={styles.store}
                  src={`${
                    shouldApplySpecialStyles
                      ? "/svg/light-apple-store.svg"
                      : "/svg/apple-store.svg"
                  }`}
                  alt="logo"
                  width={161}
                  height={54}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2025 Limitless Cover Services . All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
