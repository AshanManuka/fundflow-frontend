'use client';

import { useState } from 'react';
import styles from './customerList.module.css';

const initialCustomers = [
  { id: 1, name: 'Alice Johnson', nic: '123456789V', email: 'alice@example.com', income: 50000, score: 700 },
  { id: 2, name: 'Bob Smith', nic: '987654321V', email: 'bob@example.com', income: 60000, score: 680 },
  { id: 3, name: 'Charlie Lee', nic: '456789123V', email: 'charlie@example.com', income: 55000, score: 720 },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', nic: '', email: '', income: '', score: '' });
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setForm(customer);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setCustomers(customers.map((c) => (c.id === editingId ? { ...form, id: editingId } : c)));
    setEditingId(null);
  };

  const handleSearch = async () => {
    // Simulate backend request (you'll replace this with actual API call)
    console.log('Searching for:', searchKeyword);

    // Example: backend fetch
    // const res = await fetch(`/api/customers?keyword=${searchKeyword}`);
    // const data = await res.json();
    // setCustomers(data);

    // For now, filter the local data (mock)
    const filtered = initialCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        c.nic.includes(searchKeyword) ||
        c.email.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setCustomers(filtered);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customers</h1>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, NIC or email..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className={styles.list}>
        {customers.map((customer) => (
          <li key={customer.id} className={styles.card}>
            {editingId === customer.id ? (
              <form onSubmit={handleUpdate} className={styles.form}>
                <input className={styles.inputFl} name="name" value={form.name} onChange={handleChange} required />
                <input className={styles.inputFl} name="nic" value={form.nic} onChange={handleChange} required />
                <input className={styles.inputFl} name="email" value={form.email} onChange={handleChange} required />
                <input className={styles.inputFl} type="number" name="income" value={form.income} onChange={handleChange} required />
                <input className={styles.inputFl} type="number" name="score" value={form.score} onChange={handleChange} required />
                <button className={styles.svBtn} type="submit">Save</button>
              </form>
            ) : (
              <>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>NIC:</strong> {customer.nic}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Income:</strong> Rs. {customer.income}</p>
                <p><strong>Score:</strong> {customer.score}</p>
                <div className={styles.actions}>
                  <button className={styles.btns} onClick={() => handleEdit(customer)}>Update</button>
                  <button onClick={() => handleDelete(customer.id)} className={styles.delete}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
