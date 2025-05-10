'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './registerCustomer.module.css';
import Swal from 'sweetalert2';

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
  
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
    try {
      const response = await axios.post(
        'http://localhost:8080/admin/register-customer',
        {
          name: form.name,
          nic: form.nic,
          email: form.email,
          monthlyIncome: Number(form.monthlyIncome),
          creditScore: Number(form.creditScore),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
                  icon: 'success',
                  title: 'Customer Register Successfully..!',
                  timer: 1500,
                  showConfirmButton: false,
                });
  
        setForm({
          name: '',
          nic: '',
          email: '',
          monthlyIncome: '',
          creditScore: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Registration failed',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Unable to submit',
      });
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register New Customer</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className={styles.inputFl} />
        <input name="nic" placeholder="NIC Number" value={form.nic} onChange={handleChange} required className={styles.inputFl} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className={styles.inputFl} />
        <input type="number" name="monthlyIncome" placeholder="Monthly Income" value={form.monthlyIncome} onChange={handleChange} required className={styles.inputFl} />
        <input type="number" name="creditScore" placeholder="Credit Score" value={form.creditScore} onChange={handleChange} required className={styles.inputFl} />
        <button className={styles.subBtn} type="submit">Register</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
