"use client";
import { useRouter } from "next/navigation";
import styles from "./needHelpSection.module.css";

const NeedHelpSection = () => {
  const router = useRouter();

  const menuItems = [
    {
      label: "Chat Now",
      description: "Chat with our support team",
      hours: "9 AM - 6 PM, Mon - Fri",
      icon: "chat",
      action: () => {
        if (window.tawk) {
          window.tawk.maximize();
        }
      },
    },
    {
      label: "Call Us",
      description: "Speak directly with our team",
      hours: "9 AM - 6 PM, Mon - Fri",
      icon: "phone",
      action: () => {
        window.location.href = "tel:+1234567890";
      },
    },
    {
      label: "Email Us",
      description: "Get help anytime via email",
      hours: null,
      icon: "email",
      action: () => {
        window.location.href = "mailto:support@limitlesscover.com";
      },
    },
    {
      label: "FAQ",
      description: "Find answers to common questions",
      hours: null,
      icon: "faq",
      action: () => {
        router.push("/faq");
      },
    },
  ];

  const MenuIcon = ({ type }) => {
    const icons = {
      chat: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      ),
      phone: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      email: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      faq: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
        </svg>
      ),
    };
    return icons[type] || icons.chat;
  };

  return (
    <section className={styles.menuSection}>
      <div className={styles.menuSectionInner}>
        <div className={styles.menuRowContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Need help?</h2>
          </div>
          <div className={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={styles.menuItem}
                onClick={item.action}
              >
                <div className={styles.menuItemIconWrapper}>
                  <div className={styles.menuItemIcon}>
                    <MenuIcon type={item.icon} />
                  </div>
                </div>
                <p className={styles.menuItemLabel}>{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeedHelpSection;
