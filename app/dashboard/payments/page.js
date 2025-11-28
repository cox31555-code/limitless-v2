import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PaymentsClient from "./_components/PaymentsClient";
import styles from "./page.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata = {
  title: "Payments | Limitless Cover",
};

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  if (!token && !devMode) {
    redirect("/login");
  }

  return (
    <div className={styles.page}>
      <PaymentsClient plusJakartaSans={plusJakartaSans} />
    </div>
  );
};

export default page;
