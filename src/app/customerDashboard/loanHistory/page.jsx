'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './loanHistory.module.css';

export default function LoanHistory() {
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLoanHistory = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        const response = await axios.get('http://localhost:8080/customer/loan-history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setLoanHistory(response.data.body);
        } else {
          setMessage('Failed to load loan history.');
        }
      } catch (error) {
        console.error('Error fetching loan history:', error);
        setMessage('An error occurred while fetching loan history.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoanHistory();
  }, []);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  return (
    <div className={styles.container}>
      <h1>My Loan History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : message ? (
        <p>{message}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Requested Date</th>
              <th>Amount</th>
              <th>Installments</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loanHistory.map((loan) => (
              <tr key={loan.id}>
                <td>{formatDate(loan.requestedDate)}</td>
                <td>Rs. {loan.loanAmount.toLocaleString()}</td>
                <td>{loan.installment}</td>
                <td>{loan.reason}</td>
                <td className={styles[loan.status.replace(/\s/g, '').toLowerCase()]}>{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
