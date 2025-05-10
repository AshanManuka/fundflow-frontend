'use client';

import { useRouter } from 'next/navigation';
import styles from './customerDashboard.module.css';

export default function CustomerDashboard() {
  const router = useRouter();

  const handleRequestLoan = () => {
    router.push('/loan-request');
  };

  const handleViewHistory = () => {
    router.push('/loan-history');
  };

  const handleLogout = () => {
    console.log('User logged out');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>

      <h1 className={styles.title}>Welcome to FundFlow</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.btns} onClick={() => router.push('/customerDashboard/requestLoan')}>Request a Loan</button>
        <button className={styles.btns} onClick={handleViewHistory}>View Loan History</button>
      </div>
    </div>
  );
}
