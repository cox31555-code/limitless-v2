"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import SideNavbar from "@/ui/dashboard/layout/sideNavbar/SideNavbar";
import InsuranceTypeModal from "@/ui/layout/insuranceTypeModal/InsuranceTypeModal";

const IconComponent = ({ type }) => {
  switch (type) {
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
    case "chevron":
      return (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isGetQuotePage = pathname.includes("/get-quote");
  const [isOpen, setIsOpen] = useState(false);
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Disable scroll listener on mobile to avoid iOS keyboard issues
    const isMobile = window.innerWidth <= 900;
    if (isMobile) {
      // On mobile, always keep header hidden (fixed at top)
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Function to open Tawk.to chat
  const openLiveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  const carVanItems = [
    { label: "Annual car insurance", href: "/annual", icon: "calendar" },
    { label: "Hourly car insurance", href: "/temporary", icon: "clock" },
    { label: "Temporary car insurance", href: "/temporary", icon: "calendar" },
    { label: "International driving licenses", href: "/coming-soon", icon: "globe" },
  ];

  const motorbakeItems = [
    { label: "Annual bike insurance", href: "/coming-soon", icon: "calendar" },
    { label: "Hourly bike insurance", href: "/coming-soon", icon: "clock" },
    { label: "Weekly bike insurance", href: "/coming-soon", icon: "calendar" },
    { label: "International driving licenses", href: "/coming-soon", icon: "globe" },
  ];

  const shouldHideHeader = mounted && (
    pathname === "/login" ||
    pathname === "/forget-password" ||
    pathname === "/change-password" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/payment-summary") ||
    pathname.startsWith("/payment")
  );

  if (shouldHideHeader) {
    return null;
  }

  return (
    <>
      <InsuranceTypeModal
        isOpen={isInsuranceModalOpen}
        onClose={() => setIsInsuranceModalOpen(false)}
      />
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
                <span className={`${styles.stickyMenuButton} ${openDropdown === "carVan" ? styles.active : ""} ${carVanItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                  Car & Van
                  <span className={`${styles.chevronIcon} ${openDropdown === "carVan" ? styles.rotated : ""}`}>
                    <IconComponent type="chevron" />
                  </span>
                </span>
                {openDropdown === "carVan" && (
                  <div className={styles.stickyDropdown}>
                    {carVanItems.map((item, index) => (
                      <span key={`sticky-carVan-${index}`} className={styles.stickyDropdownItem} onClick={() => router.push(item.href)}>
                        <span className={styles.dropdownIcon}>
                          <IconComponent type={item.icon} />
                        </span>
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
                <span className={`${styles.stickyMenuButton} ${openDropdown === "motorbike" ? styles.active : ""} ${motorbakeItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                  Motorbike
                  <span className={`${styles.chevronIcon} ${openDropdown === "motorbike" ? styles.rotated : ""}`}>
                    <IconComponent type="chevron" />
                  </span>
                </span>
                {openDropdown === "motorbike" && (
                  <div className={styles.stickyDropdown}>
                    {motorbakeItems.map((item, index) => (
                      <span key={`sticky-motorbike-${index}`} className={styles.stickyDropdownItem} onClick={() => router.push(item.href)}>
                        <span className={styles.dropdownIcon}>
                          <IconComponent type={item.icon} />
                        </span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <span className={styles.stickyMenuButton} onClick={() => router.push("/impound")}>Impound</span>
              <span className={styles.stickyMenuButton} onClick={() => router.push("/coming-soon")}>Courier</span>
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
                onClick={() => router.push("/annual/get-quote")}
              >
                Get a Quote
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
        {!isDashboard && (
          <div
            style={{ gap: isDashboard ? "1.2rem" : "" }}
            className={styles.buttons}
          >
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
          <div className={styles.mobileHeaderActions}>
            {!isDashboard && (
              <button
                className={styles.mobileQuoteBtn}
                onClick={() => setIsInsuranceModalOpen(true)}
              >
                Get a Quote
              </button>
            )}
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
        </div>
        {isDashboard ? (
          <SideNavbar
            isOpen={isDashboardSidebarOpen}
            onToggle={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
            isMobile={true}
          />
        ) : (
          <>
            {isOpen && (
              <div
                className={styles.mobileBackdrop}
                onClick={() => setIsOpen(false)}
              />
            )}
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
                    <IconComponent type="chevron" />
                  </span>
                </button>
                {openDropdown === "carVan" && (
                  <div className={styles.mobileDropdown}>
                    {carVanItems.map((item, index) => (
                      <span
                        key={`mobile-carVan-${index}`}
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
                    <IconComponent type="chevron" />
                  </span>
                </button>
                {openDropdown === "motorbike" && (
                  <div className={styles.mobileDropdown}>
                    {motorbakeItems.map((item, index) => (
                      <span
                        key={`mobile-motorbike-${index}`}
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
                  pathname === "/impound" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/impound");
                }}
              >
                Impound
              </span>

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
                  pathname === "/contact" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/contact");
                }}
              >
                Contact
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  pathname === "/FAQ" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/FAQ");
                }}
              >
                FAQ
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  pathname === "/login" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/login");
                }}
              >
                Login
              </span>
            </nav>
            </div>
          </>
        )}
      </header>
    </div>
    </>
  );
};

export default Header;
