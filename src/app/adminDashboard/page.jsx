'use client';

import styles from './adminDashboard.module.css';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.titleBar}>FundFlow Admin Dashboard</h1>
 
      <div className={styles.buttonGroup}>
        <button onClick={() => router.push('/adminDashboard/customers')}>
          View All Customers
        </button>
        <button onClick={() => router.push('/adminDashboard/loans')}>
          View All Loan Applications
        </button>
        <button onClick={() => router.push('/adminDashboard/register')}>
          Register Customer
        </button>

      </div>
    </div>
  );
}
