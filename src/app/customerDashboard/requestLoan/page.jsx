'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './loanRequest.module.css';
import Swal from 'sweetalert2'; // Optional if you want SweetAlert

export default function LoanRequestForm() {
  const [loanAmount, setLoanAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    try {
      const response = await axios.post(
        'http://localhost:8080/customer/request-loan',
        {
          amount: Number(loanAmount),
          installment: Number(duration),
          reason: purpose,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {

        await Swal.fire({
                icon: 'success',
                title: 'Your loan request has been submitted successfully.',
                showConfirmButton: false,
                timer: 1500,
              });

        setLoanAmount('');
        setDuration('');
        setPurpose('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: response.data.message || 'Something went wrong.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to submit loan request.',
      });
    }
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
