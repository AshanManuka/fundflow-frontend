'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import axios from 'axios';
import styles from './login.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/authenticate', 
        {
        username,
        password,
        });

      const token = response.data;
      localStorage.setItem('token', token);

      await Swal.fire({
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/customerDashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text:
          error.response?.data?.message ||
          'Invalid credentials or server error.',
      });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login as <span>Customer</span></h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="username"><b>Username</b></label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password"><b>Password</b></label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
