import styles from "./page.module.css";
import Image from "next/image";

export const metadata = {
  title: "Login | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.page}>
      <Image
        src="https://api.builder.io/api/v1/image/assets/TEMP/dfd0f7753e82e69710ccf3b45fe1ed91b2e93fa9?width=2732"
        alt="login"
        fill
        priority
        className={styles.image}
      />
    </div>
  );
};

export default page;
