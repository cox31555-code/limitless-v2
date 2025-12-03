"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import SideNavbar from "@/ui/dashboard/layout/sideNavbar/SideNavbar";
import InsuranceTypeModal from "@/ui/layout/insuranceTypeModal/InsuranceTypeModal";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";
import { useLoading } from "@/contexts/LoadingContext";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { isInsuranceModalOpen, setIsInsuranceModalOpen } = useInsuranceModal();
  const { showLoading } = useLoading();

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openStickyDropdown, setOpenStickyDropdown] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const isDashboard = pathname.startsWith("/dashboard");
  const isGetQuotePage = pathname.includes("/get-quote");
  const isPaymentSummaryPage = pathname === "/payment-summary";
  const isFAQPage = pathname === "/FAQ";

  const navigate = (href) => {
    showLoading();
    router.push(href);
  };

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const handleCloseHelpModal = () => {
    setShowHelpModal(false);
  };

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth <= 900);
  }, []);

  useEffect(() => {
    // Disable scroll listener on mobile to avoid iOS keyboard issues
    const checkMobile = window.innerWidth <= 900;
    if (checkMobile) {
      // On mobile, always keep header hidden (fixed at top)
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset dropdown when menu closes
      setOpenDropdown(null);
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
    { label: "International driving licenses", href: "/annual/get-quote", icon: "globe" },
  ];

  const motorbakeItems = [
    { label: "Annual bike insurance", href: "/annual/get-quote", icon: "calendar" },
    { label: "Hourly bike insurance", href: "/temporary/get-quote", icon: "clock" },
    { label: "Weekly bike insurance", href: "/temporary/get-quote", icon: "calendar" },
    { label: "International driving licenses", href: "/annual/get-quote", icon: "globe" },
  ];

  const isPolicyPage = [
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookies-policy",
    "/complaints",
  ].includes(pathname);

  const isContactPage = mounted && (pathname === "/contact" || pathname === "/contact/email" || pathname === "/contact/contact-numbers");

  // Routes that should always hide the header (checked after mount to avoid hydration issues)
  const shouldHideHeaderAlways = mounted && (
    pathname === "/forget-password" ||
    pathname === "/change-password" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/allianz-dashboard") ||
    (pathname.includes("/get-quote") && !isMobile) // Hide on desktop, show on mobile
  );

  // Routes that should hide header immediately (payment routes need to hide on both server and client)
  // But show on /payment-summary for mobile
  const shouldHidePaymentHeader = mounted && pathname.startsWith("/payment") && pathname !== "/payment-summary";

  // Routes that depend on mobile detection (only check after mount)
  const shouldHideHeaderMobileDependent = mounted && (
    (pathname === "/login" && !isMobile) ||
    (pathname === "/retrieve-quote" && !isMobile) ||
    (isPolicyPage && !isMobile) ||
    ((pathname === "/contact" || pathname === "/contact/email" || pathname === "/contact/contact-numbers") && !isMobile) ||
    (pathname === "/payment-summary" && !isMobile) // Hide on desktop, show on mobile
  );

  // Hide for specific routes (after mount to avoid hydration issues)
  if (shouldHideHeaderAlways || shouldHideHeaderMobileDependent || shouldHidePaymentHeader) {
    return null;
  }

  return (
    <div suppressHydrationWarning={true}>
      <InsuranceTypeModal
        isOpen={isInsuranceModalOpen}
        onClose={() => {
          setIsInsuranceModalOpen(false);
          setIsOpen(false);
        }}
      />
      <div className="centeredContent" suppressHydrationWarning={true}>
      {mounted && isScrolled && !isDashboard && !isPaymentSummaryPage && (
        <div className={styles.stickyHeader}>
          <div className={styles.stickyContent}>
            <div className={styles.stickyLogoContainer}>
              <Image
                onClick={() => navigate("/")}
                className={styles.stickyLogo}
                src="/svg/logo.svg"
                alt="logo"
                width={50}
                height={50}
              />
            </div>
            {mounted && !isGetQuotePage && (
              <>
                <nav className={styles.stickyMenu} suppressHydrationWarning>
                  <div
                    className={styles.stickyDropdownContainer}
                    onMouseEnter={() => setOpenStickyDropdown("carVan")}
                    onMouseLeave={() => setOpenStickyDropdown(null)}
                    suppressHydrationWarning
                  >
                    <span className={`${styles.stickyMenuButton} ${openStickyDropdown === "carVan" ? styles.active : ""} ${carVanItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                      Car & Van
                      <span className={`${styles.chevronIcon} ${openStickyDropdown === "carVan" ? styles.rotated : ""}`}>
                        <IconComponent type="chevron" />
                      </span>
                    </span>
                    {openStickyDropdown === "carVan" && (
                      <div className={styles.stickyDropdown} suppressHydrationWarning>
                        {carVanItems.map((item, index) => (
                          <span key={`sticky-carVan-${index}`} className={styles.stickyDropdownItem} onClick={() => navigate(item.href)}>
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
                    onMouseEnter={() => setOpenStickyDropdown("motorbike")}
                    onMouseLeave={() => setOpenStickyDropdown(null)}
                    suppressHydrationWarning
                  >
                    <span className={`${styles.stickyMenuButton} ${openStickyDropdown === "motorbike" ? styles.active : ""} ${motorbakeItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                      Motorbike
                      <span className={`${styles.chevronIcon} ${openStickyDropdown === "motorbike" ? styles.rotated : ""}`}>
                        <IconComponent type="chevron" />
                      </span>
                    </span>
                    {openStickyDropdown === "motorbike" && (
                      <div className={styles.stickyDropdown} suppressHydrationWarning>
                        {motorbakeItems.map((item, index) => (
                          <span key={`sticky-motorbike-${index}`} className={styles.stickyDropdownItem} onClick={() => navigate(item.href)}>
                            <span className={styles.dropdownIcon}>
                              <IconComponent type={item.icon} />
                            </span>
                            {item.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className={styles.stickyMenuButton} onClick={() => navigate("/impound")}>Impound</span>
                  <span className={styles.stickyMenuButton} onClick={() => navigate("/coming-soon")}>Courier</span>
                  <span className={styles.stickyMenuButton} onClick={() => navigate("/contact")}>Contact</span>
                </nav>
                <div className={styles.stickyButtons}>
                  <button
                    className={styles.stickyLoginBtn}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className={styles.stickyQuoteBtn}
                    onClick={() => setIsInsuranceModalOpen(true)}
                  >
                    Get a Quote
                  </button>
                </div>
              </>
            )}
            {mounted && (isGetQuotePage || pathname === "/login") && (
              <button
                className={styles.stickyHelpBtn}
                title="Get help"
                onClick={handleHelpClick}
                aria-label="Help and support"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill="currentColor"/>
                  <circle cx="12" cy="18" r="1" fill="currentColor"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
      <header suppressHydrationWarning className={`${styles.container} ${isFAQPage && mounted ? styles.hidden : ''}`}>
        <div className={styles.logoContainer}>
          <Image
            onClick={() => {
              setIsOpen(false);
              navigate("/");
            }}
            className={styles.logo}
            src="/svg/logo.svg"
            alt="logo"
            width={66}
            height={66}
          />
        </div>
        {mounted && !isDashboard && !isGetQuotePage && !isPaymentSummaryPage && (
          <menu className={styles.menu} suppressHydrationWarning={true}>
            <li
              className={styles.menuItem}
              onMouseEnter={() => setOpenDropdown("carVan")}
              onMouseLeave={() => setOpenDropdown(null)}
              suppressHydrationWarning
            >
              <span className={`${styles.menuLink} ${openDropdown === "carVan" ? styles.active : ""} ${carVanItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                Car & Van
                <span className={`${styles.chevronIcon} ${openDropdown === "carVan" ? styles.rotated : ""}`}>
                  <IconComponent type="chevron" />
                </span>
              </span>
              {openDropdown === "carVan" && (
                <div className={styles.dropdown} suppressHydrationWarning>
                  {carVanItems.map((item, index) => (
                    <span
                      key={`carVan-${index}`}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setOpenDropdown(null);
                        navigate(item.href);
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
              suppressHydrationWarning
            >
              <span className={`${styles.menuLink} ${openDropdown === "motorbike" ? styles.active : ""} ${motorbakeItems.some(item => pathname === item.href || pathname.startsWith(item.href + "/")) ? styles.activeMenuLink : ""}`}>
                Motorbike
                <span className={`${styles.chevronIcon} ${openDropdown === "motorbike" ? styles.rotated : ""}`}>
                  <IconComponent type="chevron" />
                </span>
              </span>
              {openDropdown === "motorbike" && (
                <div className={styles.dropdown} suppressHydrationWarning>
                  {motorbakeItems.map((item, index) => (
                    <span
                      key={`motorbike-${index}`}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setOpenDropdown(null);
                        navigate(item.href);
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
                onClick={() => navigate("/impound")}
              >
                Impound
              </span>
            </li>

            <li className={styles.menuItem}>
              <span
                className={`${styles.menuLink} ${
                  pathname === "/coming-soon" ? styles.activeMenuLink : ""
                }`}
                onClick={() => navigate("/coming-soon")}
              >
                Courier
              </span>
            </li>

            <li className={styles.menuItem}>
              <span
                className={`${styles.menuLink} ${
                  pathname === "/contact" ? styles.activeMenuLink : ""
                }`}
                onClick={() => navigate("/contact")}
              >
                Contact
              </span>
            </li>
          </menu>
        )}
        {mounted && !isDashboard && !isGetQuotePage && !isPaymentSummaryPage && (
          <div
            style={{ gap: isDashboard ? "1.2rem" : "" }}
            className={styles.buttons}
          >
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className={styles.quoteBtn}
              onClick={() => setIsInsuranceModalOpen(true)}
            >
              Get a Quote
            </button>
          </div>
        )}
        {mounted && (isGetQuotePage || isPaymentSummaryPage) && (
          <button
            className={styles.loginBtn}
            onClick={handleHelpClick}
            style={{ marginLeft: 'auto' }}
          >
            Need help?
          </button>
        )}
      </header>

      <header className={styles.mobileContainer}>
        <div className={styles.top}>
          <Image
            onClick={() => {
              setIsOpen(false);
              navigate("/");
            }}
            className={styles.logoMobile}
            src="/svg/logo.svg"
            alt="logo"
            width={50}
            height={50}
          />
          <div className={styles.mobileHeaderActions}>
            {mounted && isContactPage ? (
              <button
                className={styles.mobileBackBtn}
                onClick={() => navigate("/")}
                aria-label="Back to Limitless"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                <span>Back to Limitless</span>
              </button>
            ) : (
              mounted && !isDashboard && !isGetQuotePage && !isPaymentSummaryPage && pathname !== "/login" && (
                <button
                  className={styles.mobileQuoteBtn}
                  onClick={() => {
                    setIsOpen(false);
                    setIsInsuranceModalOpen(true);
                  }}
                >
                  Get a Quote
                </button>
              )
            )}
            {mounted && !isGetQuotePage && !isPaymentSummaryPage && pathname !== "/login" && (
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
            )}
            {mounted && (isGetQuotePage || isPaymentSummaryPage || pathname === "/login") && (
              <button
                className={styles.mobileHelpBtn}
                title="Get help"
                onClick={handleHelpClick}
                aria-label="Help and support"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z" fill="currentColor"/>
                  <circle cx="12" cy="18" r="1" fill="currentColor"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        {mounted && isDashboard ? (
          <SideNavbar
            isOpen={isDashboardSidebarOpen}
            onToggle={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
            isMobile={true}
          />
        ) : mounted && !isPaymentSummaryPage ? (
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
                          navigate(item.href);
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
                          navigate(item.href);
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
                  mounted && pathname === "/impound" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/impound");
                }}
              >
                Impound
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  mounted && pathname === "/coming-soon" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/coming-soon");
                }}
              >
                Courier
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  mounted && pathname === "/contact" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/contact");
                }}
              >
                Contact
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  mounted && pathname === "/FAQ" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/FAQ");
                }}
              >
                FAQ
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  mounted && pathname === "/login" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </span>

              <span
                className={`${styles.mobileMenuLink} ${
                  mounted && pathname === "/retrieve-quote" ? styles.activeMenuLink : ""
                }`}
                onClick={() => {
                  setIsOpen(false);
                  navigate("/retrieve-quote");
                }}
              >
                Retrieve Your Quote
              </span>
            </nav>
            </div>
          </>
        ) : null}
      </header>

      {/* HELP MODAL POPUP */}
      {showHelpModal && (
        <>
          <div className={styles.helpModalOverlay} onClick={handleCloseHelpModal} />
          <div className={styles.helpModalContainer}>
            <div className={styles.helpModal}>
              <button
                className={styles.helpModalCloseBtn}
                onClick={handleCloseHelpModal}
                aria-label="Close help modal"
              >
                ✕
              </button>
              <h3 className={styles.helpModalTitle}>Need Help?</h3>
              <p className={styles.helpModalMessage}>
                Have questions or need support? Get in touch with our team for assistance.
              </p>
              <div className={styles.helpModalActions}>
                <a href="/contact" className={styles.helpContactLink}>
                  Contact Us
                </a>
                <button
                  className={styles.helpModalCloseAction}
                  onClick={handleCloseHelpModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Header;
