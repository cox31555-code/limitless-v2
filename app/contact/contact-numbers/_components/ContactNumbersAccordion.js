"use client";
import React, { useState } from "react";
import styles from "./contactNumbersAccordion.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const accordionData = [
  {
    id: 1,
    title: "Sales, Renewals, Making Changes and Payments",
    content: (
      <div className={styles.accordionContent}>
        <div className={styles.contactBlock}>
          <p className={styles.label}>Contact Us</p>
          <p className={styles.phone}><strong>0333 043 2085</strong></p>
          <p className={styles.text}>You can also reach us via web chat and one of our team will be happy to assist you.</p>
        </div>
        
        <div className={styles.hoursBlock}>
          <p className={styles.hoursTitle}>Standard Opening Hours</p>
          <div className={styles.hours}>
            <div className={styles.hourRow}>
              <span className={styles.day}>Monday - Friday</span>
              <span className={styles.time}>8am - 8pm</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.day}>Saturday</span>
              <span className={styles.time}>9am - 5pm</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.day}>Sunday</span>
              <span className={styles.time}>10am - 2pm</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.day}>Bank Holidays</span>
              <span className={styles.time}>10am - 4pm</span>
            </div>
          </div>
        </div>

        <div className={styles.hoursBlock}>
          <p className={styles.hoursTitle}>Christmas & New Year Opening Hours</p>
          <div className={styles.hours}>
            <div className={styles.hourRow}>
              <span className={styles.day}>Christmas Eve</span>
              <span className={styles.time}>8am - 4pm</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.day}>Christmas Day</span>
              <span className={styles.timeClosed}>Closed</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.day}>Boxing Day</span>
              <span className={styles.timeClosed}>Closed</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.day}>New Year's Eve</span>
              <span className={styles.time}>8am - 4pm</span>
            </div>
            <div className={styles.hourRow}>
              <span className={styles.day}>New Year's Day</span>
              <span className={styles.timeClosed}>Closed</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "New Claim",
    content: (
      <div className={styles.accordionContent}>
        <div className={styles.claimOption}>
          <p className={styles.claimTitle}>General Claims</p>
          <p className={styles.phone}><strong>0333 043 2011</strong></p>
          <p className={styles.text}>Available <strong>24/7, 365 days a year</strong></p>
          <p className={styles.text}>You can also register your claim online via <strong>Your Account</strong> for faster processing.</p>
        </div>

        <div className={styles.claimOption}>
          <p className={styles.claimTitle}>Windscreen Claims</p>
          <p className={styles.phone}><strong>0333 043 2012</strong></p>
          <p className={styles.text}>Book your windscreen repair or replacement online, or call us to arrange an appointment at a time that suits you.</p>
        </div>

        <div className={styles.claimOption}>
          <p className={styles.claimTitle}>Lost or Stolen Keys</p>
          <p className={styles.phone}><strong>0333 241 3380</strong></p>
          <p className={styles.text}>If your keys have been lost, damaged or stolen, we're here to help <strong>24 hours a day, 7 days a week</strong>.</p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Existing Claims",
    content: (
      <div className={styles.accordionContent}>
        <div className={styles.claimStatusBlock}>
          <p className={styles.statusTitle}>If your car is being repaired by our approved repairers:</p>
          <ul className={styles.list}>
            <li>We'll provide regular updates on repair progress and estimated completion time</li>
            <li>For any questions about your repairs, message us via web chat or call <strong>0333 043 2022</strong></li>
            <li>Available Monday to Friday, 9am - 5pm</li>
          </ul>
        </div>

        <div className={styles.claimStatusBlock}>
          <p className={styles.statusTitle}>If you're expecting a settlement:</p>
          <ul className={styles.list}>
            <li>We'll call you to discuss your settlement and keep you updated via email and text</li>
            <li>If we've already agreed an amount, please allow a few business days for payment processing</li>
            <li>Payments are typically received within 3-5 working days</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "WhatsApp",
    content: (
      <div className={styles.accordionContent}>
        <div className={styles.whatsappBlock}>
          <p className={styles.text}>Message us on WhatsApp for quick assistance. Scan the QR code below with your phone's camera to start chatting with our team.</p>
          <div className={styles.qrCode}>
            <svg width="140" height="140" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" fill="white"/>
              <rect x="8" y="8" width="8" height="8" fill="black"/>
              <rect x="24" y="8" width="8" height="8" fill="black"/>
              <rect x="40" y="8" width="8" height="8" fill="black"/>
              <rect x="56" y="8" width="8" height="8" fill="black"/>
              <rect x="64" y="8" width="8" height="8" fill="black"/>
              <rect x="8" y="16" width="8" height="8" fill="black"/>
              <rect x="40" y="16" width="8" height="8" fill="black"/>
              <rect x="64" y="16" width="8" height="8" fill="black"/>
              <rect x="8" y="24" width="8" height="8" fill="black"/>
              <rect x="24" y="24" width="8" height="8" fill="black"/>
              <rect x="40" y="24" width="8" height="8" fill="black"/>
              <rect x="56" y="24" width="8" height="8" fill="black"/>
              <rect x="64" y="24" width="8" height="8" fill="black"/>
              <rect x="8" y="32" width="8" height="8" fill="black"/>
              <rect x="24" y="32" width="8" height="8" fill="black"/>
              <rect x="40" y="32" width="8" height="8" fill="black"/>
              <rect x="56" y="32" width="8" height="8" fill="black"/>
              <rect x="64" y="32" width="8" height="8" fill="black"/>
              <rect x="8" y="40" width="8" height="8" fill="black"/>
              <rect x="64" y="40" width="8" height="8" fill="black"/>
              <rect x="8" y="48" width="8" height="8" fill="black"/>
              <rect x="16" y="48" width="8" height="8" fill="black"/>
              <rect x="24" y="48" width="8" height="8" fill="black"/>
              <rect x="32" y="48" width="8" height="8" fill="black"/>
              <rect x="40" y="48" width="8" height="8" fill="black"/>
              <rect x="48" y="48" width="8" height="8" fill="black"/>
              <rect x="56" y="48" width="8" height="8" fill="black"/>
              <rect x="64" y="48" width="8" height="8" fill="black"/>
              <rect x="24" y="56" width="8" height="8" fill="black"/>
              <rect x="40" y="56" width="8" height="8" fill="black"/>
              <rect x="48" y="56" width="8" height="8" fill="black"/>
              <rect x="8" y="64" width="8" height="8" fill="black"/>
              <rect x="24" y="64" width="8" height="8" fill="black"/>
              <rect x="40" y="64" width="8" height="8" fill="black"/>
              <rect x="56" y="64" width="8" height="8" fill="black"/>
              <rect x="64" y="64" width="8" height="8" fill="black"/>
            </svg>
            <p className={styles.qrLabel}>Scan to chat on WhatsApp</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: "Complaints",
    content: (
      <div className={styles.accordionContent}>
        <div className={styles.contactBlock}>
          <p className={styles.text}>If you have a complaint, we're committed to resolving it quickly and fairly. Please contact us using the details below:</p>
          
          <div className={styles.complaintsContact}>
            <div className={styles.contactMethod}>
              <p className={styles.methodLabel}>Phone</p>
              <p className={styles.phone}><strong>0333 043 2020</strong></p>
            </div>
            <div className={styles.contactMethod}>
              <p className={styles.methodLabel}>Email</p>
              <p className={styles.email}><strong>complaints@limitlesscover.co.uk</strong></p>
            </div>
          </div>
          
          <p className={styles.infoText}>We aim to respond to all complaints within 5 working days and will keep you informed throughout the process.</p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: "Media Enquiries",
    content: (
      <div className={styles.accordionContent}>
        <div className={styles.contactBlock}>
          <p className={styles.text}>For media enquiries, press releases, or partnership opportunities, please contact our dedicated media team.</p>
          
          <div className={styles.mediaContact}>
            <p className={styles.methodLabel}>Email our Media Team</p>
            <p className={styles.email}><strong>media@limitlesscover.co.uk</strong></p>
          </div>
          
          <p className={styles.infoText}>We typically respond to media enquiries within 24 hours during business days.</p>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: "Accessibility",
    content: (
      <div className={styles.accordionContent}>
        <div className={styles.contactBlock}>
          <p className={styles.text}>We're committed to making our services accessible to everyone. If you need assistance or have specific accessibility requirements, we're here to help.</p>
          
          <div className={styles.accessibilityContact}>
            <div className={styles.contactMethod}>
              <p className={styles.methodLabel}>Phone</p>
              <p className={styles.phone}><strong>0333 043 2085</strong></p>
            </div>
            <div className={styles.contactMethod}>
              <p className={styles.methodLabel}>Email</p>
              <p className={styles.email}><strong>accessibility@limitlesscover.co.uk</strong></p>
            </div>
          </div>
          
          <p className={styles.infoText}>Please let us know how we can better serve you, and we'll work to accommodate your needs.</p>
        </div>
      </div>
    ),
  },
];

const ContactNumbersAccordion = () => {
  const [expandedId, setExpandedId] = useState(1);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openLiveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.accordionWrapper}>
            {accordionData.map((item) => (
              <div key={item.id} className={styles.accordionItem}>
                <button
                  className={`${styles.accordionButton} ${expandedId === item.id ? styles.expanded : ""}`}
                  onClick={() => toggleAccordion(item.id)}
                >
                  <span className={`${styles.accordionTitle} ${plusJakartaSans.className}`}>
                    {item.title}
                  </span>
                  <span className={styles.accordionIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                {expandedId === item.id && (
                  <div className={`${styles.accordionContentWrapper} ${manrope.className}`}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.helpSection}>
        <div className={styles.helpContainer}>
          <div className={styles.helpHeader}>
            <h2 className={`${styles.helpTitle} ${plusJakartaSans.className}`}>
              Can't find the answer you're looking for?
            </h2>
          </div>

          <div className={styles.helpGrid}>
            <div className={styles.helpCard} onClick={openLiveChat} style={{ cursor: 'pointer' }}>
              <div className={styles.popularBadge}>
                <span className={manrope.className}>Popular</span>
              </div>
              <div className={styles.helpCardContent}>
                <h3 className={`${styles.helpCardTitle} ${plusJakartaSans.className}`}>
                  Web chat with us
                </h3>
              </div>
              <div className={styles.helpIconWrapper}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
            </div>

            <div className={styles.helpCard} style={{ cursor: 'pointer' }}>
              <div className={styles.helpCardContent}>
                <h3 className={`${styles.helpCardTitle} ${plusJakartaSans.className}`}>
                  Try WhatsApp
                </h3>
              </div>
              <div className={styles.helpIconWrapper}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <circle cx="9" cy="10" r="1" fill="currentColor"/>
                  <circle cx="12" cy="10" r="1" fill="currentColor"/>
                  <circle cx="15" cy="10" r="1" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactNumbersAccordion;
