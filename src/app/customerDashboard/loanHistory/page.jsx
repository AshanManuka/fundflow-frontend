'use client';

import styles from './loanHistory.module.css';

export default function LoanHistory() {
  // Sample data — replace with API call later
  const loanHistory = [
    {
      id: 1,
      requestedDate: '2025-04-01',
      amount: 50000,
      installments: 12,
      status: 'Approved',
    },
    {
      id: 2,
      requestedDate: '2025-02-15',
      amount: 30000,
      installments: 10,
      status: 'Pending',
    },
    {
      id: 3,
      requestedDate: '2024-12-10',
      amount: 20000,
      installments: 8,
      status: 'Rejected',
    },
  ];

  return (
    <div className={styles.container}>
      <h1>My Loan History</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Requested Date</th>
            <th>Amount</th>
            <th>Installments</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loanHistory.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.requestedDate}</td>
              <td>Rs. {loan.amount.toLocaleString()}</td>
              <td>{loan.installments}</td>
              <td className={styles[loan.status.toLowerCase()]}>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
