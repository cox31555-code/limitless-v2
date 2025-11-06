"use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Feature from "@/ui/feature/Feature";
import { features } from "./data";
import { useRouter } from "next/navigation";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});
const Header = () => {
  const router = useRouter();
  const { setIsInsuranceModalOpen } = useInsuranceModal();
  return (
    <div className={styles.headerContainer}>
      <div className="centeredContent">
        <Image
          src="/svg/squares-2.svg"
          alt="squares"
          width={1394}
          height={706}
          className={styles.squares}
        />
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={`${styles.subTitle} ${manrope.className}`}>
              About Us{" "}
            </p>

            <div className={`${styles.title} ${plusJakartaSans.className}`}>
              Limitless
              <div className={styles.titleSpan}>
                Who are we
                <Image
                  src="/svg/curved-border.svg"
                  alt="curved border"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </div>
            </div>
            <button
              className={styles.confirmBtn}
              onClick={() => setIsInsuranceModalOpen(true)}
            >
              Get a Quote
            </button>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/svg/about-1.svg"
              alt="about-us-image"
              width={565}
              height={671}
              className={styles.image1}
            />
          </div>
        </div>
        <div className={styles.features}>
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
