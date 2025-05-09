import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/images/welImg.png"
          alt="FundFlow logo"
          width={500}
          height={300}
          priority
        />

        <h1 className="mt-4">
          Welcome to <span className="text-primary">FundFlow</span>
        </h1>
        <p className="lead text-muted">
          A microfinance credit scoring and loan management web portal.
        </p>

        <div className="mt-5">
          <Link href="/adminLogin" className={`${styles.loginBtn} ${styles.adminLogin}`}>
            Admin Login
          </Link>

          <Link href="/customerLogin" className={`${styles.loginBtn} ${styles.customerLogin}`}>
            Customer Login
          </Link>
        </div>
      </main>
    </div>
  );
}
