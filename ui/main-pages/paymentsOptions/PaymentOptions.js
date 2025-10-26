import React from "react";
import styles from "./paymentsOptions.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const PaymentOptions = () => {
  const paymentMethods = [
    {
      src: "/svg/visa.svg",
      alt: "Visa",
      width: 207,
      height: 114,
    },
    {
      src: "/svg/mastercard.svg",
      alt: "Mastercard",
      width: 207,
      height: 114,
    },
    {
      src: "/svg/american-express.svg",
      alt: "American Express",
      width: 207,
      height: 114,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={`${styles.title} ${plusJakartaSans.className}`}>
          You can pay for your short term insurance policy in several ways.
        </h4>
      </div>
      <div className={styles.options}>
        {paymentMethods.map((method, index) => (
          <div key={index} className={styles.paymentCard}>
            <Image
              src={method.src}
              alt={method.alt}
              width={method.width}
              height={method.height}
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
