'use client';

import { useState } from 'react';
import styles from './loanRequest.module.css';

export default function LoanRequestForm() {
  const [loanAmount, setLoanAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder for API call
    console.log({
      loanAmount,
      duration,
      purpose,
    });

    setMessage('Loan request submitted successfully.');
    setLoanAmount('');
    setDuration('');
    setPurpose('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loan Request Form</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.lbl}>
          Loan Amount (Rs.):
          <input
            className={styles.inps}
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </label>

        <label className={styles.lbl}>
          Duration (Months):
          <input
            className={styles.inps}
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </label>

        <label className={styles.lbl}>
          Purpose:
          <textarea
            className={styles.txtarea}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            rows={3}
          ></textarea>
        </label>

        <button className={styles.btns} type="submit">Submit Request</button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
