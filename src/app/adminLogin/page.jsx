'use client';

import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login as <span>Admin</span></h1>
        <form className={styles.form}>
          <label htmlFor="username"><b>Username</b></label>
          <input id="username" type="text" name="username" placeholder="Enter your username" required className={styles.input} />

          <label htmlFor="password"><b>Password</b></label>
          <input id="password" type="password" name="password" placeholder="Enter your password" required className={styles.input} />

          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
