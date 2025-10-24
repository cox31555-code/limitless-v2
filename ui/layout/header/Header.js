"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import SideNavbar from "@/ui/dashboard/layout/sideNavbar/SideNavbar";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Function to open Tawk.to chat
  const openLiveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  const carVanItems = [
    { label: "Annual car insurance", href: "/annual" },
    { label: "Hourly car insurance", href: "/temporary" },
    { label: "Weekly car insurance", href: "/temporary" },
    { label: "International driving licenses", href: "/coming-soon" },
  ];

  const motorbakeItems = [
    { label: "Annual bike insurance", href: "/coming-soon" },
    { label: "Hourly bike insurance", href: "/coming-soon" },
    { label: "Weekly bike insurance", href: "/coming-soon" },
    { label: "International driving licenses", href: "/coming-soon" },
  ];

  return pathname === "/login" ||
    pathname === "/forget-password" ||
    pathname === "/change-password" ? null : (
    <div className="centeredContent" suppressHydrationWarning>
      {isScrolled && !isDashboard && (
        <div className={styles.stickyHeader}>
          <div className={styles.stickyContent}>
            <div className={styles.stickyLogoContainer}>
              <Image
                onClick={() => router.push("/")}
                className={styles.stickyLogo}
                src="/svg/logo.svg"
                alt="logo"
                width={50}
                height={50}
              />
            </div>
            <nav className={styles.stickyMenu} suppressHydrationWarning>
              <div
                className={styles.stickyDropdownContainer}
                onMouseEnter={() => setOpenDropdown("carVan")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className={styles.stickyMenuButton}>Car & Van</span>
                {openDropdown === "carVan" && (
                  <div className={styles.stickyDropdown}>
                    {carVanItems.map((item) => (
                      <span key={item.href} className={styles.stickyDropdownItem} onClick={() => router.push(item.href)}>
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={styles.stickyDropdownContainer}
                onMouseEnter={() => setOpenDropdown("motorbike")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className={styles.stickyMenuButton}>Motorbike</span>
                {openDropdown === "motorbike" && (
                  <div className={styles.stickyDropdown}>
                    {motorbakeItems.map((item) => (
                      <span key={item.href} className={styles.stickyDropdownItem} onClick={() => router.push(item.href)}>
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <span className={styles.stickyMenuButton} onClick={() => router.push("/coming-soon")}>Courier</span>
              <span className={styles.stickyMenuButton} onClick={() => router.push("/about-us")}>About us</span>
              <span className={styles.stickyMenuButton} onClick={() => router.push("/contact")}>Contact</span>
            </nav>
            <div className={styles.stickyButtons}>
              <button
                className={styles.stickyLoginBtn}
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className={styles.stickyQuoteBtn}
                onClick={() => router.push("/temporary/get-quote")}
              >
                Get Quote
                <Image
                  src="/svg/arrow-right.svg"
                  alt="arrow-right"
                  width={20}
                  height={10}
                />
              </button>
            </div>
          </div>
        </div>
      )}
      <header className={styles.container}>
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
        {!isDashboard && (
          <menu className={styles.menu} suppressHydrationWarning>
            <li
              className={styles.menuItem}
              onMouseEnter={() => setOpenDropdown("carVan")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span className={styles.menuLink}>Car & Van</span>
              {openDropdown === "carVan" && (
                <div className={styles.dropdown}>
                  {carVanItems.map((item) => (
                    <span
                      key={item.href}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setOpenDropdown(null);
                        router.push(item.href);
                      }}
                    >
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
              <span className={styles.menuLink}>Motorbike</span>
              {openDropdown === "motorbike" && (
                <div className={styles.dropdown}>
                  {motorbakeItems.map((item) => (
                    <span
                      key={item.href}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setOpenDropdown(null);
                        router.push(item.href);
                      }}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              )}
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
                  pathname === "/about-us" ? styles.activeMenuLink : ""
                }`}
                onClick={() => router.push("/about-us")}
              >
                About us
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
        <div
          style={{ gap: isDashboard ? "1.2rem" : "" }}
          className={styles.buttons}
        >
          {isDashboard ? (
            <div
              className={styles.chatIcon}
              onClick={openLiveChat}
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/svg/live-chat.svg"
                alt="chat"
                width={30}
                height={30}
              />
            </div>
          ) : (
            <button
              className={styles.loginBtn}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          )}
          <button
            className={styles.quoteBtn}
            onClick={
              isDashboard
                ? openLiveChat
                : () => router.push("/temporary/get-quote")
            }
          >
            {isDashboard ? "Live chat" : "Get Quote"}
            <Image
              src="/svg/arrow-right.svg"
              alt="arrow-right"
              width={24}
              height={12}
            />
          </button>
        </div>
      </header>
      <header className={styles.mobileContainer}>
        <div className={styles.top}>
          <Image
            onClick={() => router.push("/")}
            className={styles.logoMobile}
            src="/svg/logo.svg"
            alt="logo"
            width={50}
            height={50}
          />
          <button
            onClick={() => {
              if (isDashboard) {
                setIsDashboardSidebarOpen(!isDashboardSidebarOpen);
              } else {
                setIsOpen(!isOpen);
              }
            }}
            className={styles.menuBtn}
          >
            {(isDashboard ? isDashboardSidebarOpen : isOpen) ? (
              <Image src="/svg/close.svg" alt="close" width={13} height={13} />
            ) : (
              <Image src="/svg/menu.svg" alt="menu" width={24} height={24} />
            )}
          </button>
        </div>
        {isDashboard ? (
          <SideNavbar
            isOpen={isDashboardSidebarOpen}
            onToggle={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
            isMobile={true}
          />
        ) : (
          <div
            className={`${styles.mobileMenu} ${
              isOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
            }`}
          >
            <nav className={styles.mobileNav} suppressHydrationWarning>
              <div className={styles.mobileDropdownContainer}>
                <button
                  className={styles.mobileMenuLink}
                  onClick={() =>
                    setOpenDropdown(openDropdown === "carVan" ? null : "carVan")
                  }
                >
                  Car & Van
                  <span
                    className={`${styles.dropdownArrow} ${
                      openDropdown === "carVan" ? styles.dropdownArrowOpen : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {openDropdown === "carVan" && (
                  <div className={styles.mobileDropdown}>
                    {carVanItems.map((item) => (
                      <span
                        key={item.href}
                        className={styles.mobileDropdownItem}
                        onClick={() => {
                          setIsOpen(false);
                          router.push(item.href);
                        }}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.mobileDropdownContainer}>
                <button
                  className={styles.mobileMenuLink}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "motorbike" ? null : "motorbike"
                    )
                  }
                >
                  Motorbike
                  <span
                    className={`${styles.dropdownArrow} ${
                      openDropdown === "motorbike" ? styles.dropdownArrowOpen : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {openDropdown === "motorbike" && (
                  <div className={styles.mobileDropdown}>
                    {motorbakeItems.map((item) => (
                      <span
                        key={item.href}
                        className={styles.mobileDropdownItem}
                        onClick={() => {
                          setIsOpen(false);
                          router.push(item.href);
                        }}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <span
                className={`${styles.mobileMenuLink} ${
                  pathname === "/coming-soon" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/coming-soon");
                }}
              >
                Courier
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  pathname === "/about-us" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/about-us");
                }}
              >
                About us
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  pathname === "/contact" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/contact");
                }}
              >
                Contact
              </span>
            </nav>
            <div className={styles.mobileButtons}>
              <button
                className={styles.loginBtn}
                onClick={() => {
                  router.push("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </button>
              <button
                className={styles.quoteBtn}
                onClick={() => {
                  if (isDashboard) {
                    openLiveChat();
                  } else {
                    router.push("/temporary/get-quote");
                  }
                  setIsOpen(false);
                }}
              >
                {isDashboard ? "Live chat" : "Get Quote"}
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
