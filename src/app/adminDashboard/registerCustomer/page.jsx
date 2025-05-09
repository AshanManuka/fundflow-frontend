'use client';

import { useState } from 'react';
import styles from './registerCustomer.module.css';

export default function RegisterCustomer() {
  const [form, setForm] = useState({
    name: '',
    nic: '',
    email: '',
    monthlyIncome: '',
    creditScore: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const res = await fetch('http://your-backend-url/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage('Customer registered successfully!');
        setForm({
          name: '',
          nic: '',
          email: '',
          monthlyIncome: '',
          creditScore: '',
        });
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.message || 'Registration failed'}`);
      }
    } catch (err) {
      setMessage('Error: Unable to submit');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register New Customer</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className={styles.inputFl}/>
        <input name="nic" placeholder="NIC Number" value={form.nic} onChange={handleChange} required className={styles.inputFl}/>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className={styles.inputFl}/>
        <input type="number" name="monthlyIncome" placeholder="Monthly Income" value={form.monthlyIncome} onChange={handleChange} required className={styles.inputFl}/>
        <input type="number" name="creditScore" placeholder="Credit Score" value={form.creditScore} onChange={handleChange} required className={styles.inputFl}/>
        <button className={styles.subBtn} type="submit">Register</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
