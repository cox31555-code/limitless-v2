import React from "react";
import styles from "./transparency.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "@/fonts/fonts";
import { useRouter } from "next/navigation";
import { useInsuranceModal } from "@/contexts/InsuranceModalContext";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Transparency = () => {
  const router = useRouter();
  const { setIsInsuranceModalOpen } = useInsuranceModal();
  return (
    <div className={styles.container}>
      <div className={styles.content}></div>
      <div className={styles.left}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          No hidden fees,
          <div className={styles.titleSpan}>
            Limitless Cover
            <Image
              src="/svg/curved-border.svg"
              alt="curved border"
              width={393}
              height={3}
              className={styles.curvedBorder}
            />
          </div>
        </h2>
        <div className={styles.buttons}>
          <button
            onClick={() => setIsInsuranceModalOpen(true)}
            className={styles.getQuoteBtn}
          >
            Get a quote
          </button>
          <button
            // onClick={() => {
            //   router.push("/temporary-insurance");
            // }}
            className={styles.membersPortalBtn}
          >
            Members Portal
          </button>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src="/svg/about-us-car.svg"
          alt="transparency-right"
          width={495}
          height={340}
        />
      </div>
    </div>
  );
};

export default Transparency;
